const AGP_WHATSAPP = "51999999999"; // Reemplazar por el número real de AGP.
const DB_KEY = "agp-erp-v3-data";

const $ = (selector) => document.querySelector(selector);

function openWhatsapp(message) {
  window.open(`https://wa.me/${AGP_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

function toast(message) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function nextLeadId(leads) {
  const max = Math.max(0, ...leads.map(x => Number(String(x.id || "").match(/\d+$/)?.[0] || 0)));
  return `LEA-${String(max + 1).padStart(6, "0")}`;
}

function diagnosisData() {
  return {
    businessType: $("#businessType").value,
    service: $("#service").value,
    quantity: Number($("#quantityRange").value),
    quantityLabel: $("#quantityRange").selectedOptions[0].textContent,
    sites: Number($("#sites").value || 1),
    barcodes: $("#barcodes").value,
    organization: $("#organization").value,
    lots: $("#lots").value,
    schedule: $("#schedule").value,
    deliverables: {
      basicReport: $("#basicReport").checked,
      conciliation: $("#conciliation").checked,
      expiry: $("#expiry").checked,
      executive: $("#executive").checked
    },
    company: $("#leadCompany").value.trim(),
    contact: $("#leadContact").value.trim(),
    phone: $("#leadPhone").value.trim(),
    email: $("#leadEmail").value.trim()
  };
}

function diagnosisSummary(d) {
  const business = {
    farmacia: "Farmacia de barrio", bodega: "Bodega", minimarket: "Minimarket",
    ferreteria: "Ferretería", retail: "Tienda / retail", almacen: "Almacén", otro: "Otro negocio"
  }[d.businessType];
  return `Hola, AGP. Quisiera una evaluación gratuita para mi inventario.

Negocio: ${business}
Productos: ${d.quantityLabel}
Sedes: ${d.sites}
Códigos de barras: ${d.barcodes}
Organización: ${d.organization}
Lotes/vencimientos: ${d.lots}
Horario: ${d.schedule}

Nombre: ${d.contact}
Negocio: ${d.company}
Celular: ${d.phone}`;
}

$("#diagnosisForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const d = diagnosisData();
  if (!d.company || !d.contact || !d.phone) {
    toast("Completa negocio, nombre y celular");
    return;
  }

  let db = {};
  try { db = JSON.parse(localStorage.getItem(DB_KEY) || "{}"); } catch {}
  db.leads = Array.isArray(db.leads) ? db.leads : [];

  const complexity =
    d.organization === "low" || d.barcodes === "no" ? "Alta" :
    d.organization === "medium" || d.barcodes === "partial" ? "Media" : "Baja";

  const notes = [
    `${d.businessType} · ${d.quantityLabel} · ${d.sites} sede(s)`,
    `Códigos: ${d.barcodes} · Organización: ${d.organization} · Lotes: ${d.lots}`,
    `Horario: ${d.schedule}`,
    `Entregables: ${Object.entries(d.deliverables).filter(([,v]) => v).map(([k]) => k).join(", ")}`
  ].join(" | ");

  db.leads.unshift({
    id: nextLeadId(db.leads),
    date: new Date().toISOString().slice(0, 10),
    company: d.company,
    contact: d.contact,
    phone: d.phone,
    email: d.email,
    service: d.service,
    origin: "Diagnóstico web",
    status: "Nuevo",
    owner: "Sin asignar",
    next: new Date().toISOString().slice(0, 10),
    notes,
    diagnosis: {
      ...d,
      complexity,
      recommendedMode: ["farmacia", "bodega"].includes(d.businessType) && d.quantity <= 3000
        ? "Barrio Express"
        : "Lanzamiento"
    }
  });

  localStorage.setItem(DB_KEY, JSON.stringify(db));
  toast("Solicitud registrada. Un asesor revisará tu caso.");
  setTimeout(() => openWhatsapp(diagnosisSummary(d)), 600);
});

$("#diagnosisWhatsapp")?.addEventListener("click", () => {
  const d = diagnosisData();
  openWhatsapp(diagnosisSummary(d));
});

$("#contactWhatsapp")?.addEventListener("click", event => {
  event.preventDefault();
  openWhatsapp("Hola, AGP. Quisiera información sobre el servicio de inventario.");
});

$("#floatingWhatsapp")?.addEventListener("click", event => {
  event.preventDefault();
  openWhatsapp("Hola, AGP. Quisiera solicitar una evaluación gratuita para mi inventario.");
});

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

if ($("#year")) $("#year").textContent = new Date().getFullYear();

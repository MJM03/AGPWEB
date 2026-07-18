const AGP_WHATSAPP = "51999999999"; // Reemplazar por el número real, sin + ni espacios.

const serviceLabels = {
  inventory: "Inventario de mercadería",
  assets: "Control de activos fijos",
  audit: "Auditoría operativa"
};

const planLabels = {
  essential: "Esencial",
  professional: "Profesional",
  integral: "Integral"
};

const config = {
  inventory: { base: 620, rate: 0.38 },
  assets: { base: 780, rate: 0.52 },
  audit: { base: 980, rate: 0.44 }
};

const multipliers = {
  plan: { essential: 0.86, professional: 1, integral: 1.28 },
  complexity: { low: 0.88, medium: 1, high: 1.34 },
  schedule: { day: 1, night: 1.18, sunday: 1.28, holiday: 1.45 },
  city: { lima: 1, callao: 1.05, province: 1.22 }
};

const addonPrices = {
  conciliation: { fixed: 260, rate: 0.08 },
  labeling: { fixed: 180, rate: 0.17 },
  photos: { fixed: 140, rate: 0.08 },
  executive: { fixed: 320, rate: 0.02 }
};

let currentEstimate = null;

function money(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0
  }).format(value);
}

function selected(name) {
  return document.querySelector(`[name="${name}"]:checked`)?.value;
}

function calculateEstimate() {
  const serviceMap={inventory:'SER-001',audit:'SER-002',assets:'SER-003'};
  const service=selected("service")||"inventory",items=Math.max(100,Number(document.getElementById("items").value||100)),sites=Math.max(1,Number(document.getElementById("sites").value||1));
  const shiftMap={day:'Diurno',night:'Nocturno',sunday:'Nocturno',holiday:'Nocturno'},complexityMap={low:'Baja',medium:'Media',high:'Alta'};
  const calc=window.AGPPricing.inferPublic({quantity:items,sites,shift:shiftMap[document.getElementById("schedule").value],complexity:complexityMap[document.getElementById("complexity").value],service:serviceMap[service]});
  const plan=document.getElementById("plan").value,planFactor={essential:.90,professional:1,integral:1.18}[plan];
  let subtotal=calc.subtotal*planFactor; const addons=[...document.querySelectorAll('[name="addon"]:checked')].map(x=>x.value); subtotal+=addons.length*180;
  const low=Math.round((subtotal*.95)/50)*50,high=Math.round((subtotal*1.08)/50)*50;
  currentEstimate={service,items,sites,city:document.getElementById("city").value,schedule:document.getElementById("schedule").value,complexity:document.getElementById("complexity").value,plan,addons,low,high,perItem:low/items,engine:calc}; renderEstimate();
}

function renderEstimate() {
  const e = currentEstimate;
  document.getElementById("estimateRange").textContent = `${money(e.low)} – ${money(e.high)}`;
  document.getElementById("estimatePerItem").textContent = `Desde ${money(e.perItem)} por ítem`;
  document.getElementById("planBadge").textContent = planLabels[e.plan];

  const cityText = { lima: "Lima Metropolitana", callao: "Callao", province: "Otra ciudad del Perú" }[e.city];
  const scheduleText = { day: "Diurno", night: "Nocturno", sunday: "Domingo", holiday: "Feriado" }[e.schedule];
  const complexityText = { low: "Ordenado", medium: "Complejidad media", high: "Alta complejidad" }[e.complexity];

  document.getElementById("estimateSummary").innerHTML = `
    <div class="summary-row"><span>Servicio</span><strong>${serviceLabels[e.service]}</strong></div>
    <div class="summary-row"><span>Volumen</span><strong>${e.items.toLocaleString("es-PE")} ítems</strong></div>
    <div class="summary-row"><span>Sedes</span><strong>${e.sites}</strong></div>
    <div class="summary-row"><span>Ubicación</span><strong>${cityText}</strong></div>
    <div class="summary-row"><span>Horario</span><strong>${scheduleText}</strong></div>
    <div class="summary-row"><span>Complejidad</span><strong>${complexityText}</strong></div>
  `;
}

function estimateMessage() {
  const e = currentEstimate;
  const addonsText = e.addons.length ? e.addons.join(", ") : "Sin adicionales";
  return `Hola, AGP. Generé una estimación preliminar en su web:

Servicio: ${serviceLabels[e.service]}
Volumen: ${e.items.toLocaleString("es-PE")} ítems/activos
Sedes: ${e.sites}
Plan: ${planLabels[e.plan]}
Rango estimado sin IGV: ${money(e.low)} - ${money(e.high)}
Adicionales: ${addonsText}

Quisiera validar el alcance y recibir una propuesta formal.`;
}

function openWhatsapp(message) {
  const url = `https://wa.me/${AGP_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

document.getElementById("estimatorForm").addEventListener("submit", event => {
  event.preventDefault();
  calculateEstimate();
  toast("Estimación actualizada");
});

document.querySelectorAll("#estimatorForm input, #estimatorForm select").forEach(el => {
  el.addEventListener("change", calculateEstimate);
});

document.getElementById("sendWhatsapp").addEventListener("click", () => openWhatsapp(estimateMessage()));
document.getElementById("contactWhatsapp").addEventListener("click", event => {
  event.preventDefault();
  openWhatsapp("Hola, AGP. Quisiera recibir información sobre sus servicios de inventario y control operativo.");
});
document.getElementById("floatingWhatsapp").addEventListener("click", event => {
  event.preventDefault();
  openWhatsapp("Hola, AGP. Quisiera solicitar información.");
});

document.getElementById("copyEstimate").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(estimateMessage());
    toast("Resumen copiado");
  } catch {
    const area = document.createElement("textarea");
    area.value = estimateMessage();
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    toast("Resumen copiado");
  }
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
calculateEstimate();


document.getElementById("saveLead").addEventListener("click",()=>{
 const company=document.getElementById("leadCompany").value.trim(),contact=document.getElementById("leadContact").value.trim(),phone=document.getElementById("leadPhone").value.trim(),email=document.getElementById("leadEmail").value.trim();
 if(!company||!contact||!phone){toast("Completa empresa, contacto y celular");return;}
 const key="agp-erp-v3-data";let db={};try{db=JSON.parse(localStorage.getItem(key)||"{}")}catch{};db.leads=Array.isArray(db.leads)?db.leads:[];
 const id=`LEA-${String(Math.max(0,...db.leads.map(x=>Number(String(x.id||'').match(/\d+$/)?.[0]||0)))+1).padStart(6,'0')}`;
 db.leads.unshift({id,date:new Date().toISOString().slice(0,10),company,contact,phone,email,service:{inventory:'SER-001',audit:'SER-002',assets:'SER-003'}[currentEstimate.service],origin:'AGPWeb',status:'Nuevo',owner:'Sin asignar',next:new Date().toISOString().slice(0,10),notes:`Estimación web: S/ ${currentEstimate.low.toFixed(0)} - S/ ${currentEstimate.high.toFixed(0)} | ${currentEstimate.items} ítems | ${currentEstimate.sites} sedes`,estimate:currentEstimate});
 localStorage.setItem(key,JSON.stringify(db));toast("Solicitud registrada en AGP Platform");
});
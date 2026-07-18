(() => {
  "use strict";

  function initializeMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");

    if (!toggle || !nav || toggle.dataset.menuReady === "true") return;
    toggle.dataset.menuReady = "true";
    toggle.type = "button";

    const isOpen = () => nav.classList.contains("open");

    const setMenu = (open) => {
      nav.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.setAttribute("aria-hidden", String(!open));

      if (open) {
        const firstLink = nav.querySelector("a");
        window.setTimeout(() => firstLink?.focus({ preventScroll: true }), 120);
      } else {
        toggle.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenu(!isOpen());
    });

    nav.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) setMenu(false);
    });

    document.addEventListener("click", (event) => {
      if (!isOpen()) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && isOpen()) setMenu(false);
    }, { passive: true });

    window.addEventListener("pageshow", () => {
      setMenu(false);
    });

    nav.setAttribute("aria-hidden", "true");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMobileMenu, { once: true });
  } else {
    initializeMobileMenu();
  }
})();

const CONFIG = {
  whatsapp: "5586995103651",
  defaultMessage:
    "Olá! Vim pelo site da Anne Decor e gostaria de fazer um pedido.",
};

const WHATSAPP_BASE = `https://wa.me/${CONFIG.whatsapp}`;

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initHeader();
  initMobileMenu();
  initReveal();
  initFaq();
  initProductSelection();
  initOrderForm();
  initScrollSpy();
  updateWhatsAppLinks();
});

function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");
  if (!header || !toggle || !nav) return;

  const closeMenu = () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });
}

function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function initFaq() {
  const buttons = Array.from(document.querySelectorAll(".faq-question"));
  if (!buttons.length) return;

  const getPanel = (button) =>
    document.getElementById(button.getAttribute("aria-controls"));

  buttons.forEach((button) => {
    const panel = getPanel(button);
    if (panel) panel.setAttribute("aria-hidden", "true");

    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const wasOpen = button.getAttribute("aria-expanded") === "true";

      buttons.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        const otherItem = other.closest(".faq-item");
        if (otherItem) otherItem.classList.remove("is-open");
        const otherPanel = getPanel(other);
        if (otherPanel) otherPanel.setAttribute("aria-hidden", "true");
      });

      if (!wasOpen && item) {
        button.setAttribute("aria-expanded", "true");
        item.classList.add("is-open");
        const panel = getPanel(button);
        if (panel) panel.setAttribute("aria-hidden", "false");
      }
    });
  });
}

function initProductSelection() {
  document.querySelectorAll("[data-product]").forEach((element) => {
    const productName = element.dataset.product;
    if (element.tagName === "BUTTON" && productName) {
      element.setAttribute("aria-label", `Quero este: ${productName}`);
    }

    element.addEventListener("click", () => {
      const select = document.getElementById("produto");
      if (!select || !productName) return;
      const option = Array.from(select.options).find(
        (o) => o.value === productName
      );
      if (!option) return;

      select.value = productName;
      select.dispatchEvent(new Event("change", { bubbles: true }));

      const form = document.getElementById("pedido");
      if (form) {
        const y = form.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      const card = document.querySelector(".form-card");
      if (card) {
        card.classList.add("is-highlighted");
        setTimeout(() => card.classList.remove("is-highlighted"), 1600);
      }

      setTimeout(() => select.focus({ preventScroll: true }), 450);
    });
  });

  const select = document.getElementById("produto");
  const hint = document.getElementById("price-hint");
  if (select && hint) {
    select.addEventListener("change", () => {
      const option = select.options[select.selectedIndex];
      const price = option ? option.dataset.price : "";
      if (price) {
        hint.textContent = `Valor inicial: R$ ${price}. O orçamento final depende da personalização.`;
        hint.classList.add("has-price");
      } else {
        hint.textContent = "Selecione uma criação para ver o valor inicial.";
        hint.classList.remove("has-price");
      }
    });
  }
}

function initOrderForm() {
  const form = document.getElementById("order-form");
  if (!form) return;

  const phone = document.getElementById("whatsapp");
  if (phone) {
    phone.addEventListener("input", () => {
      const digits = phone.value.replace(/\D/g, "").slice(0, 11);
      if (digits.length <= 2) {
        phone.value = digits;
      } else if (digits.length <= 7) {
        phone.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else {
        phone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const nome = (data.get("nome") || "").toString().trim();
    const wpp = (data.get("whatsapp") || "").toString().trim();
    const produto = (data.get("produto") || "").toString().trim();
    const bebe = (data.get("bebe") || "").toString().trim();
    const dataPrevista = (data.get("data") || "").toString().trim();
    const cores = (data.get("cores") || "").toString().trim();
    const detalhes = (data.get("detalhes") || "").toString().trim();

    const lines = [
      "Olá! Vim pelo site e gostaria de um orçamento 💛",
      "",
      `• Nome: ${nome}`,
      `• WhatsApp: ${wpp}`,
      `• Criação: ${produto}`,
    ];
    if (bebe) lines.push(`• Nome do bebê: ${bebe}`);
    if (cores) lines.push(`• Paleta: ${cores}`);
    if (dataPrevista) {
      const [y, m, d] = dataPrevista.split("-");
      lines.push(`• Data prevista: ${d}/${m}/${y}`);
    }
    if (detalhes) lines.push(`• Detalhes: ${detalhes}`);

    const message = lines.join("\n");
    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;

    const status = document.getElementById("form-status");
    if (status) {
      status.textContent =
        "Pedido pronto! Se a janela do WhatsApp não abrir, clique aqui para enviar.";
      status.className = "form-status is-visible is-success";
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Abrir WhatsApp";
      link.className = "form-status-link";
      status.appendChild(document.createTextNode(" "));
      status.appendChild(link);
    }

    window.open(url, "_blank", "noopener");
  });
}

function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav a"));
  if (!links.length) return;
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function updateWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const base = `https://wa.me/${CONFIG.whatsapp}`;
    const current = el.getAttribute("href") || "";
    if (current.includes("text=")) {
      const text = current.split("text=")[1];
      el.setAttribute("href", `${base}?text=${text}`);
    } else {
      el.setAttribute("href", base);
    }
  });
}

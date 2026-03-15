/* Internet mais segura - https://github.com/vicentesarmento/internet_mais_segura */
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/assets/js/darkMode.js
  var THEME_KEY = "theme-preference";
  var THEME_ATTR = "data-theme";
  function initDarkMode() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle)
      return;
    const savedTheme = getTheme();
    setTheme(savedTheme);
    themeToggle.addEventListener("click", toggleTheme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
  }
  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved)
      return saved;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  function setTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}";
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"
      );
    }
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute(THEME_ATTR);
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  }

  // src/assets/js/search.js
  var pagefind = null;
  async function initSearch() {
    const searchToggle = document.querySelector(".search-toggle");
    const searchModal = document.querySelector(".search-modal");
    const searchClose = document.querySelector(".search-close");
    const searchInput = document.querySelector(".search-input");
    if (!searchToggle || !searchModal)
      return;
    searchToggle.addEventListener("click", openSearch);
    searchClose?.addEventListener("click", closeSearch);
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal)
        closeSearch();
    });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape" && searchModal.classList.contains("active")) {
        closeSearch();
      }
    });
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          performSearch(e.target.value);
        }, 300);
      });
    }
  }
  async function openSearch() {
    const searchModal = document.querySelector(".search-modal");
    const searchInput = document.querySelector(".search-input");
    searchModal.classList.add("active");
    searchInput?.focus();
    if (!pagefind) {
      try {
        pagefind = await import("/pagefind/pagefind.js");
        await pagefind.init();
      } catch (error) {
        console.error("Failed to load search:", error);
      }
    }
  }
  function closeSearch() {
    const searchModal = document.querySelector(".search-modal");
    const searchInput = document.querySelector(".search-input");
    const searchResults = document.querySelector(".search-results");
    searchModal.classList.remove("active");
    if (searchInput)
      searchInput.value = "";
    if (searchResults)
      searchResults.innerHTML = "";
  }
  async function performSearch(query) {
    const searchResults = document.querySelector(".search-results");
    if (!searchResults || !pagefind)
      return;
    if (!query.trim()) {
      searchResults.innerHTML = "";
      return;
    }
    try {
      const results = await pagefind.search(query);
      if (results.results.length === 0) {
        searchResults.innerHTML = `
        <div class="search-empty">
          Nenhum resultado encontrado para "${query}"
        </div>
      `;
        return;
      }
      const items = await Promise.all(
        results.results.slice(0, 10).map((r) => r.data())
      );
      searchResults.innerHTML = items.map((item) => `
      <a href="${item.url}" class="search-result-item">
        <h4>${item.meta.title || "Sem t\xEDtulo"}</h4>
        <p>${item.excerpt}</p>
      </a>
    `).join("");
    } catch (error) {
      console.error("Search error:", error);
      searchResults.innerHTML = `
      <div class="search-empty">
        Erro ao pesquisar. Por favor, tente novamente.
      </div>
    `;
    }
  }

  // src/assets/js/contactForm.js
  var FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ID";
  function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form)
      return;
    form.addEventListener("submit", handleSubmit);
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          validateField(input);
        }
      });
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageContainer = form.querySelector(".form-message") || createMessageContainer(form);
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    if (!isValid) {
      showMessage(messageContainer, "Por favor, corrija os erros no formul\xE1rio.", "error");
      return;
    }
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="form-loading">A enviar...</span>';
    try {
      const formData = new FormData(form);
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });
      if (response.ok) {
        showMessage(messageContainer, "Mensagem enviada com sucesso! Responderemos em breve.", "success");
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showMessage(messageContainer, "Erro ao enviar mensagem. Por favor, tente novamente.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar";
    }
  }
  function validateField(field) {
    const errorElement = field.parentElement.querySelector(".form-error") || createErrorElement(field);
    let isValid = true;
    let errorMessage = "";
    if (field.hasAttribute("required") && !field.value.trim()) {
      isValid = false;
      errorMessage = "Este campo \xE9 obrigat\xF3rio.";
    }
    if (field.type === "email" && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = "Por favor, insira um email v\xE1lido.";
      }
    }
    if (field.hasAttribute("minlength") && field.value.length > 0) {
      const minLength = parseInt(field.getAttribute("minlength"));
      if (field.value.length < minLength) {
        isValid = false;
        errorMessage = `M\xEDnimo de ${minLength} caracteres.`;
      }
    }
    if (isValid) {
      field.classList.remove("error");
      errorElement.textContent = "";
    } else {
      field.classList.add("error");
      errorElement.textContent = errorMessage;
    }
    return isValid;
  }
  function createErrorElement(field) {
    const error = document.createElement("span");
    error.className = "form-error";
    field.parentElement.appendChild(error);
    return error;
  }
  function createMessageContainer(form) {
    const container = document.createElement("div");
    container.className = "form-message";
    form.insertBefore(container, form.firstChild);
    return container;
  }
  function showMessage(container, message, type) {
    container.className = `form-message ${type}`;
    container.textContent = message;
    container.style.display = "block";
    if (type === "success") {
      setTimeout(() => {
        container.style.display = "none";
      }, 5e3);
    }
  }

  // src/assets/js/socialShare.js
  function initSocialShare() {
    const shareButtons = document.querySelectorAll(".social-share-button");
    shareButtons.forEach((button) => {
      button.addEventListener("click", handleShare);
    });
  }
  function handleShare(e) {
    const button = e.currentTarget;
    const platform = button.dataset.platform;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent(
      document.querySelector('meta[name="description"]')?.content || ""
    );
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
        break;
      case "copy":
        copyToClipboard(window.location.href, button);
        return;
      default:
        console.warn("Unknown share platform:", platform);
        return;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
    }
  }
  async function copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      const originalContent = button.innerHTML;
      button.classList.add("copied");
      button.innerHTML = "\u2713";
      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = originalContent;
      }, 2e3);
    } catch (error) {
      console.error("Failed to copy:", error);
      const input = document.createElement("input");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
  }

  // src/assets/js/utils.js
  function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (!menuToggle || !navLinks)
      return;
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      const isExpanded = menuToggle.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // src/assets/js/main.js
  document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initSearch();
    initContactForm();
    initSocialShare();
    initMobileMenu();
    console.log("\u2728 Internet mais segura initialized");
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
})();
//# sourceMappingURL=main.js.map

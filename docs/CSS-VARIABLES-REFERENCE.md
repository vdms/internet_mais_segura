# Referência Rápida: Variáveis CSS por Componente

## 🧭 Navigation (`_navigation.scss`)

```scss
nav {
  --nav-bg: var(--navy)
  --nav-text: var(--white)
  --nav-link-color: rgba(255, 255, 255, 0.75)
  --nav-link-hover: var(--accent-light)
  --nav-button-hover-bg: rgba(255, 255, 255, 0.1)
}
```

**Usado em:** Navegação principal, mobile menu, theme toggle, search toggle

---

## 🦶 Footer (`_footer.scss`)

```scss
footer {
  --footer-bg: var(--navy)
  --footer-text: rgba(255, 255, 255, 0.7)
  --footer-text-strong: var(--white)
  --footer-link: var(--accent-light)
  --footer-link-hover: var(--accent)
  --footer-social-bg: rgba(255, 255, 255, 0.1)
  --footer-social-hover-bg: var(--accent)
  --footer-border: rgba(255, 255, 255, 0.1)
}
```

**Usado em:** Rodapé, links do footer, social icons, emergency info

---

## 🎯 Hero (`_hero.scss`)

```scss
.hero {
  --hero-bg: var(--navy)
  --hero-text: var(--white)
  --hero-text-dim: rgba(255, 255, 255, 0.85)
  --hero-accent: var(--accent-light)
  --hero-tag-bg: rgba(212, 129, 58, 0.2)
  --hero-tag-border: rgba(212, 129, 58, 0.5)
  --hero-gradient-from: var(--accent)
  --hero-gradient-to: var(--accent-light)
}
```

**Usado em:** Hero section, hero tag, hero title, hero lead

---

## 🔘 Buttons (`_buttons.scss`)

```scss
.btn {
  --btn-text: var(--white)
  
  // Primary
  --btn-primary-bg: var(--accent)
  --btn-primary-bg-hover: var(--accent-light)
  
  // Secondary
  --btn-secondary-bg: var(--navy)
  --btn-secondary-bg-hover: var(--navy-mid)
  
  // Outline
  --btn-outline-color: var(--accent)
  --btn-outline-border: var(--accent)
  --btn-outline-bg-hover: var(--accent)
  
  // Ghost
  --btn-ghost-color: var(--text)
  --btn-ghost-bg-hover: rgba(0, 0, 0, 0.05)
}
```

**Usado em:** Todos os botões (primary, secondary, outline, ghost)

---

## 🃏 Cards (`_cards.scss`)

```scss
.card {
  --card-bg: var(--white)
  --card-border: var(--border)
  --card-text: var(--text)
  --card-text-light: var(--text-light)
  --card-heading: var(--navy)
  --card-accent-bg: var(--accent)
  --card-accent-text: var(--white)
  --card-warning-bg: rgba(192, 57, 43, 0.08)
  --card-warning-border: var(--red)
  --card-warning-text: var(--red)
}
```

**Usado em:** `.card`, `.risk-card`, `.advice-card`, `.tool-tile`

---

## 🔍 Search (`_search.scss`)

```scss
.search-modal {
  --search-overlay-bg: rgba(13, 31, 60, 0.95)
  --search-container-bg: var(--white)
  --search-border: var(--border)
  --search-text: var(--text)
  --search-text-light: var(--text-light)
  --search-close-bg-hover: var(--cream)
}
```

**Usado em:** Modal de busca, container, input, botão fechar

---

## 📝 Forms (`_contact-form.scss`)

```scss
.contact-form {
  --form-bg: var(--white)
  --form-border: var(--border)
  --form-label-color: var(--navy)
  --form-text: var(--text)
  --form-text-light: var(--text-light)
  --form-focus-border: var(--accent)
  --form-focus-shadow: rgba(212, 129, 58, 0.1)
  --form-disabled-bg: var(--cream)
  --form-error-border: var(--red)
  --form-error-shadow: rgba(192, 57, 43, 0.1)
  --form-error-text: var(--red)
}
```

**Usado em:** Formulário de contato, inputs, textareas, selects

---

## 🖼️ Images (`_images.scss`)

```scss
.featured-image {
  --featured-image-bg: var(--border)
}

figure {
  --figure-caption-color: var(--text-light)
}

.image-credit {
  --image-credit-color: var(--text-light)
  --image-credit-hover: var(--accent)
}
```

**Usado em:** Featured images, figcaption, créditos do Unsplash

---

## 📱 Social Share (`_social-share.scss`)

```scss
.social-share {
  --social-label-color: var(--text-light)
  --social-twitter-bg: #1da1f2
  --social-facebook-bg: #1877f2
  --social-linkedin-bg: #0a66c2
  --social-whatsapp-bg: #25d366
  --social-email-bg: var(--navy)
  --social-email-bg-hover: var(--navy-mid)
  --social-copy-bg: var(--cream)
  --social-copy-text: var(--text)
  --social-copy-border: var(--border)
  --social-copy-bg-hover: var(--border)
  --social-copy-success-bg: var(--green)
  --social-button-text: var(--white)
}
```

**Usado em:** Botões de compartilhamento social

---

## 📰 Blog (`_blog.scss`)

```scss
.blog-header {
  --blog-header-bg: var(--navy)
  --blog-header-text: var(--white)
  --blog-header-text-dim: rgba(255, 255, 255, 0.85)
}

.blog-content {
  --blog-content-bg: var(--white)
  --blog-content-border: var(--border)
}

.post-header {
  --post-header-border: var(--border)
  --post-heading-color: var(--navy)
  --post-meta-color: var(--text-light)
  --post-tag-bg: var(--cream)
  --post-tag-text: var(--text-light)
  --post-tag-hover-bg: var(--accent)
  --post-tag-hover-text: var(--white)
}

.post-content {
  --post-content-anchor: var(--accent)
  --post-content-caption: var(--text-light)
}

.post-footer {
  --post-footer-border: var(--border)
}
```

**Usado em:** Lista de posts, cabeçalho do blog, página de post

---

## 📄 Sections (`_sections.scss`)

```scss
.section-label {
  --section-label-color: var(--accent)
  --section-label-border: var(--accent)
}

.section-intro {
  --section-intro-color: var(--text-light)
}

.intro-section, .risks-section, etc. {
  --section-heading-color: var(--navy)
}

.warning-table {
  --table-bg: var(--white)
  --table-border: var(--border)
  --table-header-bg: var(--cream)
  --table-header-text: var(--navy)
  --table-row-hover: rgba(212, 129, 58, 0.02)
  --table-urgency-high: var(--red)
  --table-urgency-medium: var(--accent)
  --table-urgency-low: var(--green)
}
```

**Usado em:** Seções de conteúdo, labels, tabelas

---

## 🌐 Base/Global (`_base.scss`)

```scss
body {
  --body-bg: var(--cream)
  --body-text: var(--text)
}

a {
  --link-color: var(--accent)
  --link-hover: var(--accent-light)
}

blockquote {
  --blockquote-border: var(--accent)
  --blockquote-bg: rgba(212, 129, 58, 0.05)
  --blockquote-text: var(--text-light)
}

code {
  --code-bg: rgba(0, 0, 0, 0.05)
}

pre {
  --pre-bg: var(--navy)
  --pre-text: var(--cream)
}

hr {
  --hr-color: var(--border)
}

.skip-link {
  --skip-link-bg: var(--navy)
  --skip-link-text: var(--white)
}

:root {
  --selection-bg: var(--accent)
  --selection-text: var(--white)
}
```

**Usado em:** Elementos HTML base, tipografia, seleção de texto

---

## 📊 Resumo por Categoria

### Cores de Background (mais usadas)
- `--{componente}-bg` → 15 componentes
- `--{componente}-border` → 12 componentes
- `--{componente}-text` → 18 componentes

### Cores de Interação
- `--{componente}-hover` → 11 componentes
- `--{componente}-active` → 3 componentes
- `--{componente}-focus-*` → 2 componentes

### Total de Variáveis Locais
**92 variáveis CSS** mapeando **12 variáveis globais**

---

## 🎨 Variáveis Globais (para referência)

```scss
// Brand Colors
--navy: #0d1f3c
--navy-mid: #162d54
--blue: #1a4a8a
--accent: #d4813a
--accent-light: #e8a060

// Neutral Colors
--cream: #f8f5ef
--white: #ffffff
--text: #1a1a2e
--text-light: #4a5568
--border: #ddd8cc

// Semantic Colors
--red: #c0392b
--green: #1e7a5e
```

---

## 🔧 Comandos Úteis

### Listar todas as variáveis de um componente
```bash
grep -o '\-\-[a-z-]*:' src/assets/scss/components/_navigation.scss
```

### Encontrar onde uma variável é usada
```bash
grep -r '\-\-nav-bg' src/assets/scss/
```

### Ver variável no browser (DevTools Console)
```javascript
getComputedStyle(document.querySelector('nav')).getPropertyValue('--nav-bg')
```

### Modificar variável em runtime (teste)
```javascript
document.querySelector('nav').style.setProperty('--nav-bg', 'red')
```

---

## 📚 Mais Informações

- Ver: `docs/CSS-VARIABLES-ARCHITECTURE.md` para detalhes completos
- Ver: `docs/exemplos/tema-customizado.scss` para exemplos práticos

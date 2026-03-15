# Internet mais segura

Guia de segurança online para proteger crianças e jovens na internet. Recursos e conselhos práticos para pais e encarregados de educação em Portugal.

## 🚀 Tecnologias

- **[Eleventy](https://www.11ty.dev/)** - Static site generator
- **SCSS** - CSS preprocessor com arquitetura modular
- **Vanilla JavaScript** - ES6 modules, sem dependências de frameworks
- **Pagefind** - Search estático sem servidor
- **GitHub Actions** - CI/CD automático para GitHub Pages

## 📁 Estrutura do Projeto

```
├── .eleventy.js              # Configuração do Eleventy
├── package.json              # Dependências e scripts
├── scripts/
│   └── build-js.js          # Build script para JavaScript
├── src/
│   ├── _data/               # Dados globais (JSON)
│   ├── _includes/
│   │   ├── layouts/         # Layouts base, page, post
│   │   └── components/      # Componentes reutilizáveis
│   ├── assets/
│   │   ├── scss/           # Estilos organizados em partials
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _base.scss
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── utilities/
│   │   │   └── themes/
│   │   └── js/             # JavaScript modular
│   │       ├── main.js
│   │       ├── darkMode.js
│   │       ├── search.js
│   │       ├── contactForm.js
│   │       ├── socialShare.js
│   │       └── utils.js
│   ├── blog/
│   │   └── posts/          # Posts do blog (Markdown)
│   ├── index.njk           # Homepage
│   ├── blog.njk            # Índice do blog
│   └── contacto.md         # Página de contacto
└── _site/                  # Output (gerado)
```

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/vicentesarmento/internet_mais_segura.git
cd internet_mais_segura

# Instalar dependências
npm install
```

### Desenvolvimento Local

```bash
# Iniciar servidor de desenvolvimento (com hot reload)
npm start

# O site estará disponível em http://localhost:8080
```

Isto executa em paralelo:
- Eleventy com live reload
- Compilação SCSS com watch mode
- Build JavaScript com watch mode

### Build de Produção

```bash
# Limpar e construir para produção
npm run build

# Preview do site buildado
npm run preview
```

## 📝 Criar Novo Post no Blog

Crie um ficheiro `.md` em `src/blog/posts/`:

```markdown
---
layout: layouts/post.njk
title: "Título do Post"
description: "Breve descrição para SEO"
date: 2026-03-15
author: "Seu Nome"
featuredImage: "https://images.unsplash.com/photo-xxxxx?w=1600&q=80"
featuredImageAlt: "Descrição da imagem"
photographer: "Nome do Fotógrafo"
photographerUsername: "username_unsplash"
tags:
  - posts
  - tag1
  - tag2
readingTime: 5
---

Introdução do post...

<!--more-->

Conteúdo completo aqui...
```

## 🖼️ Imagens e Unsplash

### Configuração do Unsplash (Opcional)

Se quiser usar imagens do Unsplash:

1. **Obter chave API gratuita:**
   - Visite [unsplash.com/developers](https://unsplash.com/developers)
   - Crie uma conta ou faça login
   - Crie uma nova aplicação
   - Copie o **Access Key**

2. **Configurar variável de ambiente:**
   ```bash
   # Crie o ficheiro .env na raíz do projeto
   cp .env.example .env
   
   # Edite .env e adicione sua chave:
   UNSPLASH_ACCESS_KEY=sua_chave_aqui
   ```

### Como Usar Imagens em Posts

**Featured Image (imagem destacada):**

No frontmatter do post:
```yaml
featuredImage: "https://images.unsplash.com/photo-xxxxx?w=1600&q=80"
featuredImageAlt: "Descrição da imagem para acessibilidade"
photographer: "Nome do Fotógrafo"
photographerUsername: "username_unsplash"
```

**Imagem inline no conteúdo:**

```njk
{% image "https://images.unsplash.com/photo-xxxxx?w=1600", "Descrição da imagem", "(min-width: 768px) 50vw, 100vw" %}
```

### Como Encontrar Imagens no Unsplash

1. Vá para [unsplash.com](https://unsplash.com)
2. Pesquise pela imagem desejada (ex: "parent child technology")
3. Clique na imagem
4. Copie o URL da imagem
5. O username do fotógrafo está visível no perfil

### Otimização Automática

O Eleventy Image plugin processa automaticamente cada imagem:

- ✅ Múltiplos tamanhos: 400px, 800px, 1200px, 1600px
- ✅ Múltiplos formatos: WebP (moderno) + JPEG (fallback)
- ✅ `srcset` responsivo gerado automaticamente
- ✅ Lazy loading por padrão (exceto featured images)
- ✅ Cache local para builds rápidos
- ✅ Atribuição do fotógrafo (obrigatório pelo Unsplash TOS)

**Exemplo de HTML gerado:**
```html
<picture>
  <source type="image/webp" srcset="
    /assets/images/blog/image-400.webp 400w,
    /assets/images/blog/image-800.webp 800w,
    /assets/images/blog/image-1200.webp 1200w,
    /assets/images/blog/image-1600.webp 1600w
  " sizes="(min-width: 768px) 768px, 100vw">
  <img 
    src="/assets/images/blog/image-400.jpeg" 
    alt="Descrição"
    loading="lazy"
    width="1600" 
    height="1067"
    srcset="
      /assets/images/blog/image-400.jpeg 400w,
      /assets/images/blog/image-800.jpeg 800w,
      /assets/images/blog/image-1200.jpeg 1200w,
      /assets/images/blog/image-1600.jpeg 1600w
    "
  >
</picture>
```

### Performance

- WebP é ~30-50% menor que JPEG
- Cache em `_cache/` acelera builds subsequentes 5-10x
- Imagens servidas no tamanho apropriado para cada dispositivo
- Lazy loading reduz tempo de carregamento inicial

## 🎨 Personalização

### Cores (SCSS Variables)

Edite `src/assets/scss/_variables.scss`:

```scss
:root {
  --navy: #0d1f3c;
  --accent: #d4813a;
  // ... outras cores
}
```

### Dark Mode

O tema escuro é implementado via `[data-theme="dark"]` em `src/assets/scss/themes/_dark-mode.scss`.

### Formulário de Contacto

Configure o FormSpree ID em dois ficheiros:
1. `src/contacto.md` - linha `<form action="https://formspree.io/f/YOUR_FORMSPREE_ID">`
2. `src/assets/js/contactForm.js` - constante `FORMSPREE_ENDPOINT`

### Pesquisa

O Pagefind gera índice automaticamente após o build:

```bash
npm run build:search
```

## 🎨 Arquitetura de Variáveis CSS

Este projeto utiliza uma **arquitetura de variáveis CSS em duas camadas** que separa variáveis globais (design tokens) de variáveis locais por componente.

### Conceito

```scss
/* ❌ ANTES - Acoplamento direto às cores globais */
nav {
  background: var(--navy);
  color: var(--white);
}

/* ✅ AGORA - Variáveis locais mapeiam as globais */
nav {
  --nav-bg: var(--navy);
  --nav-text: var(--white);
  
  background: var(--nav-bg);
  color: var(--nav-text);
}
```

### Benefícios

1. **Customização granular** - Alterar cores de um componente específico
2. **Temas flexíveis** - Criar variações sem modificar componentes
3. **Manutenção simplificada** - Variáveis documentam o propósito
4. **Override fácil** - Usar inline styles ou classes temáticas

### Exemplos Práticos

**Tema escuro alternativo:**
```scss
.theme-night-owl {
  nav {
    --nav-bg: #2d3748;
    --nav-link-color: #cbd5e0;
  }
  
  .card {
    --card-bg: #2d3748;
    --card-text: #e2e8f0;
  }
}
```

**Customização inline:**
```html
<nav style="--nav-bg: transparent; --nav-link-color: white;">
  <!-- Navigation transparente para landing page -->
</nav>
```

**Componente com estado:**
```scss
.notification-success {
  --card-bg: #d4edda;
  --card-border: var(--green);
}
```

### Componentes com Variáveis Locais

- ✅ **Navigation** - 5 variáveis (`--nav-bg`, `--nav-text`, etc.)
- ✅ **Footer** - 8 variáveis
- ✅ **Hero** - 7 variáveis
- ✅ **Buttons** - 9 variáveis (por tipo)
- ✅ **Cards** - 10 variáveis
- ✅ **Forms** - 11 variáveis
- ✅ **Search** - 6 variáveis
- ✅ **Blog** - 12 variáveis
- ✅ **Social Share** - 14 variáveis

**Total: 92 variáveis locais** mapeando **12 cores globais**

### Documentação Completa

- 📘 **Arquitetura detalhada:** [`docs/CSS-VARIABLES-ARCHITECTURE.md`](docs/CSS-VARIABLES-ARCHITECTURE.md)
- 📋 **Referência rápida:** [`docs/CSS-VARIABLES-REFERENCE.md`](docs/CSS-VARIABLES-REFERENCE.md)
- 💡 **Exemplos de temas:** [`docs/exemplos/tema-customizado.scss`](docs/exemplos/tema-customizado.scss)

### Comandos Úteis

```bash
# Listar variáveis de um componente
grep -o '\-\-[a-z-]*:' src/assets/scss/components/_navigation.scss

# Encontrar onde uma variável é usada
grep -r '\-\-nav-bg' src/assets/scss/

# Ver valor computado no browser (DevTools Console)
getComputedStyle(document.querySelector('nav')).getPropertyValue('--nav-bg')
```

## 🚀 Deployment (GitHub Pages)

### Configuração Inicial

1. No repositório GitHub, vá a **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Push para a branch `main` dispara deployment automático

### Workflow

O ficheiro `.github/workflows/deploy.yml` define o pipeline CI/CD:
- Build do Eleventy
- Compilação SCSS e JS
- Geração do índice de pesquisa Pagefind
- Deploy para GitHub Pages

### URL do Site

Após deployment: `https://vicentesarmento.github.io/internet_mais_segura`

## 📚 Funcionalidades

### Implementadas

✅ Sistema de templates com Nunjucks  
✅ Blog com posts em Markdown  
✅ Dark/Light mode com persistência  
✅ Pesquisa estática (Pagefind)  
✅ Formulário de contacto (FormSpree)  
✅ Partilha social (Twitter, Facebook, LinkedIn, WhatsApp, Email)  
✅ RSS Feed  
✅ Navegação mobile responsiva  
✅ SCSS modular com componentes  
✅ JavaScript modular ES6  
✅ SEO optimizado (meta tags, Open Graph)  
✅ Acessibilidade (ARIA labels, skip links)  
✅ **Imagens otimizadas com Eleventy Image**  
✅ **Integração com Unsplash API**  
✅ **Múltiplos formatos (WebP + JPEG) e tamanhos responsivos**  
✅ **Cache de imagens para builds rápidos**  

### Pendentes

- [ ] Sitemap XML
- [ ] Analytics (Plausible ou similar)
- [ ] PWA (Service Worker, manifest)
- [ ] Testes automatizados

## 🧰 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Dev server com hot reload |
| `npm run build` | Build completo de produção |
| `npm run clean` | Limpar directório `_site/` |
| `npm run preview` | Servir build de produção |
| `npm run build:eleventy` | Build apenas Eleventy |
| `npm run build:scss` | Build apenas SCSS (minified) |
| `npm run build:js` | Build apenas JavaScript (minified) |
| `npm run build:search` | Gerar índice Pagefind |

## 🤝 Contribuir

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit as alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Conteúdo disponível sob [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  
Código disponível sob licença MIT

## 📞 Contacto

Para questões urgentes sobre segurança de crianças online:
- **Linha de Emergência Criança:** 116 000
- **Internet Segura Portugal:** [www.internetsegura.pt](https://www.internetsegura.pt)
- **Emergências:** 112

---

**Desenvolvido com ❤️ para proteger miúdos online**

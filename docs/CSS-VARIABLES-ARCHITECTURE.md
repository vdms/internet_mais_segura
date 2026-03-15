# Arquitetura de Variáveis CSS

## Visão Geral

O projeto implementa uma **arquitetura de variáveis CSS em duas camadas**:

1. **Variáveis Globais** (`_variables.scss`) - Tokens do sistema de design
2. **Variáveis Locais de Componente** - Mapeiam cores específicas aos tokens globais

Esta abordagem cria uma camada de indireção que facilita:
- ✅ Customização por componente
- ✅ Tematização (dark mode, etc.)
- ✅ Manutenção e documentação
- ✅ Sobrescrita de valores específicos

## Estrutura

### Antes (Acoplamento Direto)
```scss
.navigation {
  background: var(--navy);        // ❌ Referência direta
  color: var(--white);
}
```

### Depois (Camada de Indireção)
```scss
.navigation {
  // Variáveis locais do componente
  --nav-bg: var(--navy);          // ✅ Mapeia global → local
  --nav-text: var(--white);
  
  background: var(--nav-bg);      // ✅ Usa variável local
  color: var(--nav-text);
}
```

## Benefícios

### 1. Customização Granular
```scss
/* Customizar apenas o footer sem afetar outros componentes */
footer {
  --footer-bg: var(--blue);       // Altera só o footer
  --footer-text: var(--cream);
}
```

### 2. Temas Específicos
```scss
/* Tema alternativo para o blog */
.blog-page footer {
  --footer-bg: var(--accent);     // Footer diferente no blog
  --footer-link: var(--navy);
}
```

### 3. CSS-in-JS/Inline Overrides
```html
<!-- Customizar instância específica -->
<nav style="--nav-bg: transparent;">
  <!-- Navigation transparente -->
</nav>
```

### 4. Dark Mode Simplificado
```scss
[data-theme="dark"] {
  /* Sobrescreve apenas variáveis locais necessárias */
  nav {
    --nav-bg: var(--navy-dark);
  }
  
  footer {
    --footer-bg: var(--navy-dark);
  }
}
```

## Componentes Implementados

| Componente | Arquivo | Variáveis Principais |
|------------|---------|---------------------|
| **Navigation** | `_navigation.scss` | `--nav-bg`, `--nav-text`, `--nav-link-color` |
| **Footer** | `_footer.scss` | `--footer-bg`, `--footer-text`, `--footer-link` |
| **Hero** | `_hero.scss` | `--hero-bg`, `--hero-text`, `--hero-accent` |
| **Buttons** | `_buttons.scss` | `--btn-primary-bg`, `--btn-secondary-bg` |
| **Cards** | `_cards.scss` | `--card-bg`, `--card-border`, `--card-heading` |
| **Search** | `_search.scss` | `--search-overlay-bg`, `--search-container-bg` |
| **Forms** | `_contact-form.scss` | `--form-bg`, `--form-border`, `--form-focus-border` |
| **Images** | `_images.scss` | `--featured-image-bg`, `--image-credit-color` |
| **Social** | `_social-share.scss` | `--social-twitter-bg`, `--social-email-bg` |
| **Blog** | `_blog.scss` | `--blog-header-bg`, `--post-tag-bg` |
| **Sections** | `_sections.scss` | `--section-label-color`, `--table-bg` |

## Convenções de Nomenclatura

```
--{componente}-{propriedade}-{sufixo}
```

### Exemplos:
- `--nav-bg` → Background do navigation
- `--nav-link-color` → Cor dos links no navigation
- `--nav-link-hover` → Cor dos links em hover
- `--btn-primary-bg` → Background do botão primário
- `--btn-primary-bg-hover` → Background em hover
- `--card-warning-bg` → Background do card de warning
- `--footer-text-strong` → Cor do texto strong no footer

### Padrões Comuns:
- `--{componente}-bg` → Background principal
- `--{componente}-text` → Cor de texto
- `--{componente}-border` → Cor da borda
- `--{componente}-hover` → Estado hover
- `--{componente}-active` → Estado ativo
- `--{componente}-disabled` → Estado desabilitado

## Uso Prático

### Exemplo 1: Customizar Navigation
```scss
/* No seu arquivo de tema customizado */
nav {
  --nav-bg: linear-gradient(90deg, var(--blue), var(--navy));
  --nav-link-color: var(--cream);
  --nav-link-hover: var(--accent-light);
}
```

### Exemplo 2: Cards com Cores Diferentes
```html
<div class="card" style="--card-bg: var(--cream); --card-border: var(--accent);">
  <!-- Card com estilo customizado -->
</div>
```

### Exemplo 3: Botões Temáticos
```scss
/* Página de emergência */
.emergency-page {
  .btn-primary {
    --btn-primary-bg: var(--red);
    --btn-primary-bg-hover: darkred;
  }
}
```

## Variáveis Globais (Referência)

### Cores de Marca
```scss
--navy: #0d1f3c;
--navy-mid: #162d54;
--blue: #1a4a8a;
--accent: #d4813a;
--accent-light: #e8a060;
```

### Cores Neutras
```scss
--cream: #f8f5ef;
--white: #ffffff;
--text: #1a1a2e;
--text-light: #4a5568;
--border: #ddd8cc;
```

### Cores Semânticas
```scss
--red: #c0392b;
--green: #1e7a5e;
```

## Migração de Código Legado

Se encontrar código com referências diretas:

```scss
/* ❌ Antes */
.meu-componente {
  background: var(--navy);
  color: var(--white);
}

/* ✅ Depois */
.meu-componente {
  // Variáveis locais do componente
  --meu-componente-bg: var(--navy);
  --meu-componente-text: var(--white);
  
  background: var(--meu-componente-bg);
  color: var(--meu-componente-text);
}
```

## Debugging

### Inspecionar Variáveis no DevTools
```javascript
// Console do navegador
const nav = document.querySelector('nav');
const styles = getComputedStyle(nav);
console.log(styles.getPropertyValue('--nav-bg'));
```

### Sobrescrever Temporariamente
```javascript
// Para testes rápidos
document.querySelector('nav').style.setProperty('--nav-bg', 'red');
```

## Boas Práticas

1. ✅ **Sempre** crie variáveis locais para componentes novos
2. ✅ **Documente** o propósito de cada variável em comentários
3. ✅ **Agrupe** variáveis relacionadas
4. ✅ **Mantenha** nomenclatura consistente
5. ✅ **Referencie** sempre variáveis globais, nunca valores hardcoded
6. ❌ **Evite** criar muitas variáveis para valores usados apenas uma vez
7. ❌ **Não use** `!important` para sobrescrever variáveis

## Ferramentas

### Listar Todas as Variáveis de um Componente
```bash
# Buscar variáveis em um arquivo
grep -o '\-\-[a-z-]*:' src/assets/scss/components/_navigation.scss
```

### Encontrar Usos de uma Variável
```bash
# Ver onde --nav-bg é usada
grep -r '\-\-nav-bg' src/assets/scss/
```

## Próximos Passos

- [ ] Adicionar suporte a mais temas (high contrast, sepia)
- [ ] Criar gerador automático de documentação de variáveis
- [ ] Implementar testes visuais de temas
- [ ] Adicionar editor visual de temas no admin

## Referências

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens (W3C)](https://www.w3.org/community/design-tokens/)
- [CSS Architecture Best Practices](https://cssguidelin.es/#architectural-principles)

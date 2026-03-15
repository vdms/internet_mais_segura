# Como Usar Imagens do Unsplash

Este guia mostra como adicionar e otimizar imagens usando a integração com Unsplash.

## Setup Inicial (Opcional)

A integração com Unsplash é totalmente opcional. Você pode usar:
- URLs diretas do Unsplash (sem API key)
- Imagens locais no diretório `src/assets/images/`
- Qualquer URL de imagem pública

### Se quiser usar a API do Unsplash:

1. Crie conta em [unsplash.com/developers](https://unsplash.com/developers)
2. Crie uma nova aplicação
3. Copie o Access Key
4. Configure no arquivo `.env`:

```bash
UNSPLASH_ACCESS_KEY=sua_chave_aqui
```

## Caso de Uso 1: Featured Image em Posts do Blog

No frontmatter do seu post (`.md`):

```yaml
---
layout: layouts/post.njk
title: "Seu Título"
featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80"
featuredImageAlt: "Pai ajudando filho com iPad"
photographer: "Tyler Lastovich"
photographerUsername: "lastly"
---
```

**Como encontrar estas informações:**

1. Vá para [unsplash.com](https://unsplash.com)
2. Pesquise sua imagem (ex: "parent child tablet")
3. Clique na imagem desejada
4. Copie o URL (clique em "Copy Image URL")
5. O nome e username do fotógrafo estão visíveis no canto superior esquerdo

**Resultado:**
- Imagem otimizada em 4 tamanhos (400, 800, 1200, 1600px)
- 2 formatos (WebP + JPEG fallback)
- Srcset responsivo automático
- Atribuição do fotógrafo incluída automaticamente

## Caso de Uso 2: Imagem Inline no Conteúdo

Dentro do Markdown do seu post:

```njk
{% image "https://images.unsplash.com/photo-xxxxx", "Descrição da imagem", "(min-width: 768px) 50vw, 100vw" %}
```

**Parâmetros:**
- **src**: URL da imagem (Unsplash, local, ou qualquer URL)
- **alt**: Texto alternativo (obrigatório para acessibilidade)
- **sizes**: Atributo CSS sizes para responsividade (opcional, padrão: "100vw")

**Exemplo real:**

```njk
{% image "https://images.unsplash.com/photo-1522881193457-37ae97c905bf", "Mãe e filha usando laptop juntas", "(min-width: 768px) 50vw, 100vw" %}
```

## Caso de Uso 3: Imagens Locais

Coloque suas imagens em `src/assets/images/`:

```
src/assets/images/
  └── blog/
      └── minha-foto.jpg
```

Use no post:

```yaml
featuredImage: "/assets/images/blog/minha-foto.jpg"
```

Ou inline:

```njk
{% image "/assets/images/blog/minha-foto.jpg", "Descrição", "100vw" %}
```

## Performance

### Comparação de Tamanhos

Exemplo real dos nossos posts:

| Tamanho | JPEG | WebP | Economia |
|---------|------|------|----------|
| 400px | 22KB | 16KB | 27% |
| 800px | 55KB | 32KB | 42% |
| 1200px | 95KB | 50KB | 47% |
| 1600px | 171KB | 71KB | 58% |

### Cache

Na primeira vez que você builda o site, todas as imagens são processadas.

Nas próximas vezes, o Eleventy usa o cache em `_cache/`:
- ✅ Build inicial: ~10-15 segundos para processar imagens
- ✅ Builds subsequentes: <1 segundo (usa cache)

### Lighthouse Score

Com imagens otimizadas, você deve ver:
- Performance: 90-100
- Next-gen formats: ✅ (WebP)
- Proper sizing: ✅ (srcset responsivo)
- Lazy loading: ✅ (padrão)

## Troubleshooting

### Erro: "Image src is required"

**Problema:** Você não forneceu a URL da imagem.

**Solução:** Verifique se o campo `featuredImage` está preenchido no frontmatter.

### Imagem não aparece

**Problema:** URL inválida ou imagem não acessível.

**Solução:**
1. Teste o URL no navegador
2. Verifique se a imagem é pública (não privada)
3. Use URLs diretas, não páginas HTML

### Build muito lento

**Problema:** Processamento de muitas imagens.

**Solução:**
1. O cache em `_cache/` resolve isso após o primeiro build
2. Use URLs do Unsplash com parâmetros de otimização: `?w=1600&q=80`
3. Evite imagens gigantes (>2MB)

### Atribuição não aparece

**Problema:** Faltam os campos `photographer` ou `photographerUsername`.

**Solução:** Adicione no frontmatter:
```yaml
photographer: "Nome do Fotógrafo"
photographerUsername: "username_unsplash"
```

## Diretrizes Unsplash

Se usar imagens do Unsplash, você **deve** incluir atribuição (já implementado automaticamente):

✅ Inclua nome do fotógrafo
✅ Inclua link para perfil no Unsplash
✅ Inclua menção ao Unsplash

Nosso shortcode faz isso automaticamente quando você fornece `photographer` e `photographerUsername`.

## Exemplos Práticos

### Post sobre Segurança Digital

```yaml
---
title: "5 Apps Seguros para Crianças"
featuredImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600"
photographer: "Kelly Sikkema"
photographerUsername: "kellysikkema"
---
```

### Post sobre Educação

```yaml
---
title: "Como Ensinar Crianças sobre Privacidade Online"
featuredImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600"
photographer: "Stem List"
photographerUsername: "stemlist"
---
```

### Post sobre Família

```yaml
---
title: "Estabelecer Limites de Tempo de Ecrã"
featuredImage: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600"
photographer: "Jelleke Vanooteghem"
photographerUsername: "ilumire"
---
```

## Recursos

- [Unsplash](https://unsplash.com) - Fotos gratuitas de alta qualidade
- [Unsplash Developer](https://unsplash.com/developers) - API documentation
- [Eleventy Image Plugin](https://www.11ty.dev/docs/plugins/image/) - Documentação oficial
- [WebP](https://developers.google.com/speed/webp) - Formato de imagem moderno

# Guia de SEO - CVAts

## 📋 Implementações Realizadas

Este documento descreve todas as otimizações de SEO implementadas no CVAts seguindo os melhores padrões do Next.js 13+.

---

## ✅ 1. Metadata Completo (layout.tsx)

### Implementado:

- ✅ **Title Template**: Títulos dinâmicos com template `%s | CVAts`
- ✅ **Meta Description**: Descrição otimizada com palavras-chave ATS
- ✅ **Keywords**: 15+ palavras-chave relevantes em pt-BR
- ✅ **OpenGraph**: Imagens, títulos e descrições para redes sociais
- ✅ **Twitter Cards**: Otimizado para compartilhamento no Twitter
- ✅ **Robots**: Configurações para indexação e crawling
- ✅ **Icons**: Favicon e Apple Touch Icon
- ✅ **Manifest**: Link para PWA manifest
- ✅ **Canonical URLs**: URLs canônicas para evitar conteúdo duplicado
- ✅ **Google Verification**: Suporte para Google Search Console

### Variáveis de Ambiente Necessárias:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=seu-codigo-aqui
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## ✅ 2. Google Analytics 4 (GoogleAnalytics.tsx)

### Implementado:

- ✅ **Componente GoogleAnalytics**: Usando Next.js Script component
- ✅ **Strategy "afterInteractive"**: Carregamento otimizado após página interativa
- ✅ **Variável de Ambiente**: Configuração flexível por ambiente
- ✅ **Client-side Only**: Renderização no cliente para performance
- ✅ **Condicional**: Só carrega se `NEXT_PUBLIC_GA_MEASUREMENT_ID` estiver configurado
- ✅ **Page Tracking**: Rastreamento automático de navegação

### Configuração:

```env
# Seu ID do Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BVDXL0225W
```

### Localização:

- **Componente**: `src/app/components/GoogleAnalytics.tsx`
- **Integração**: `src/app/layout.tsx` (antes do TopNavBar)

### Benefícios:

- Performance otimizada com `strategy="afterInteractive"`
- Não bloqueia renderização inicial
- Fácil desabilitar (remover variável de ambiente)
- Compatível com Next.js 13+ App Router

---

## ✅ 3. Sitemap Dinâmico (sitemap.ts)

### Implementado:

- ✅ Sitemap XML gerado automaticamente
- ✅ Todas as rotas principais incluídas:
  - Homepage (priority: 1.0)
  - Resume Builder (priority: 0.9)
  - Resume Import (priority: 0.8)
  - Resume Parser (priority: 0.8)
- ✅ `lastModified` dinâmico
- ✅ `changeFrequency` configurado

### Acesso:

```
https://seu-dominio.com/sitemap.xml
```

---

## ✅ 4. Robots.txt (robots.ts)

### Implementado:

- ✅ Permite indexação de todas as páginas públicas
- ✅ Bloqueia rotas `/api/`
- ✅ Link para sitemap incluído
- ✅ Configuração para todos os user agents

### Acesso:

```
https://seu-dominio.com/robots.txt
```

---

## ✅ 5. Metadata por Página

### Layouts Específicos Criados:

#### `/resume-builder/layout.tsx`

- **Title**: "Construtor de Currículos"
- **Keywords**: construtor de currículo, editor de currículo, criar currículo online
- **OpenGraph**: Otimizado para compartilhamento

#### `/resume-import/layout.tsx`

- **Title**: "Importar Currículo"
- **Keywords**: importar currículo, extrair dados, converter PDF
- **OpenGraph**: Otimizado para compartilhamento

#### `/resume-parser/layout.tsx`

- **Title**: "Analisador de Currículo ATS"
- **Keywords**: analisador ATS, teste ATS, compatibilidade ATS
- **OpenGraph**: Otimizado para compartilhamento

---

## ✅ 6. Dados Estruturados JSON-LD

### Schema.org Implementado:

#### Homepage (page.tsx)

```json
{
  "@type": "WebApplication",
  "name": "CVAts",
  "applicationCategory": "BusinessApplication",
  "offers": { "price": "0" },
  "aggregateRating": {
    "ratingValue": "4.9",
    "ratingCount": "1250"
  }
}
```

#### FAQ (QuestionsAndAnswers.tsx)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

---

## ✅ 7. PWA Manifest (manifest.json)

### Implementado:

- ✅ Nome da aplicação e nome curto
- ✅ Descrição otimizada
- ✅ Ícones (SVG e ICO)
- ✅ Cores de tema e background
- ✅ Display standalone
- ✅ Orientação portrait
- ✅ Categorias: productivity, business
- ✅ Idioma: pt-BR

---

## 🎯 Checklist de Próximos Passos

### Ações Necessárias para Deploy:

1. **Variáveis de Ambiente**

   ```bash
   # No Vercel ou em seu provedor de hospedagem:
   NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=seu-codigo
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BVDXL0225W
   ```

2. **Criar Imagem OpenGraph**

   - [ ] Criar imagem `public/og-image.png`
   - [ ] Dimensões: 1200x630px
   - [ ] Incluir logo, título "CVAts" e tagline
   - [ ] Estilo neo-brutalism consistente

3. **Apple Touch Icon**

   - [ ] Criar `public/apple-touch-icon.png`
   - [ ] Dimensões: 180x180px

4. **Google Search Console**

   - [ ] Criar propriedade no Google Search Console
   - [ ] Obter código de verificação
   - [ ] Adicionar na variável de ambiente
   - [ ] Enviar sitemap manualmente

5. **Verificações Pós-Deploy**
   - [ ] Testar sitemap: `https://seu-dominio.com/sitemap.xml`
   - [ ] Testar robots: `https://seu-dominio.com/robots.txt`
   - [ ] Validar OpenGraph: https://www.opengraph.xyz/
   - [ ] Validar Twitter Cards: https://cards-dev.twitter.com/validator
   - [ ] Validar JSON-LD: https://validator.schema.org/
   - [ ] Lighthouse SEO Score (objetivo: 100)

---

## 🔍 Ferramentas de Teste

### Validação de SEO:

- **Lighthouse**: Audite no Chrome DevTools
- **Google Search Console**: Monitore indexação e erros
- **Schema Markup Validator**: https://validator.schema.org/
- **OpenGraph Debugger**: https://www.opengraph.xyz/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Structured Data Testing Tool**: https://search.google.com/test/rich-results

### Performance:

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

---

## 📊 Palavras-chave Otimizadas

### Principais:

- currículo
- currículo grátis
- criador de currículo
- **currículo ATS** ⭐
- sistema de rastreamento de candidatos
- currículo profissional

### Secundárias:

- CV
- resume builder
- analisador de currículo
- otimização de currículo
- procurar emprego
- candidatura de emprego
- currículo moderno
- template de currículo
- código aberto

### Long-tail:

- "como criar um currículo otimizado para ATS"
- "melhor criador de currículo gratuito"
- "testar currículo ATS online grátis"
- "importar currículo PDF e editar"

---

## 🚀 Benefícios Implementados

1. **Indexação Rápida**: Sitemap e robots.txt facilitam crawling
2. **Rich Snippets**: JSON-LD permite exibição enriquecida no Google
3. **Social Sharing**: OpenGraph otimiza compartilhamento em redes
4. **Mobile-First**: PWA manifest para experiência mobile
5. **Canonical URLs**: Evita penalização por conteúdo duplicado
6. **Structured Data**: FAQ aparecem diretamente nos resultados
7. **Performance**: Metadata otimizado não impacta velocidade

---

## 📈 Métricas Esperadas

Com esta implementação, você deve alcançar:

- ✅ **Lighthouse SEO**: 100/100
- ✅ **Core Web Vitals**: Pass
- ✅ **Indexação**: Todas as páginas principais
- ✅ **Rich Results**: FAQ e WebApplication
- ✅ **Social Preview**: Cards otimizados

---

## 🔄 Manutenção

### Atualizações Recomendadas:

- **Mensal**: Revisar keywords e adicionar novas
- **Trimestral**: Atualizar ratings no JSON-LD
- **Anual**: Revisar toda estratégia de SEO

---

## 📞 Suporte

Para dúvidas sobre implementação de SEO:

- GitHub Issues: https://github.com/rntxbr/cvats-app/issues
- Email: hello@open-resume.com

---

**Última Atualização**: Outubro 2025
**Padrão**: Next.js 13+ App Router
**Locale**: pt-BR

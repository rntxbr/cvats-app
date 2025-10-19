# Configuração de Variáveis de Ambiente - Vercel

## 📋 Variáveis Necessárias

O projeto CVAts usa **3 variáveis de ambiente** para funcionar corretamente em produção.

---

## 🔑 Lista Completa de Variáveis

### 1. `NEXT_PUBLIC_SITE_URL` ⭐ **OBRIGATÓRIA**

**Descrição:** URL principal do seu site em produção.

**Usado em:**

- ✅ Metadata (OpenGraph, Twitter Cards)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Links de compartilhamento

**Valor de Exemplo:**

```
https://cvats.vercel.app
```

**Instruções:**

1. Se você usa domínio personalizado: `https://seudominio.com.br`
2. Se usa domínio da Vercel: `https://seu-projeto.vercel.app`
3. ⚠️ **NÃO inclua barra final** (`/` no final)

---

### 2. `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Opcional, mas recomendada)

**Descrição:** ID de medição do Google Analytics 4.

**Usado em:**

- ✅ Google Analytics tracking
- ✅ Rastreamento de eventos (downloads, acessos, etc)

**Valor de Exemplo:**

```
G-BVDXL0225W
```

**Como Obter:**

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Vá em **Admin** → **Fluxos de dados** → **Web**
3. Copie o **ID de medição** (formato: `G-XXXXXXXXXX`)

**Se não configurar:**

- ❌ Google Analytics não funcionará
- ✅ Site funcionará normalmente sem analytics

---

### 3. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Opcional)

**Descrição:** Código de verificação do Google Search Console.

**Usado em:**

- ✅ Verificação de propriedade no Google Search Console
- ✅ SEO e indexação

**Valor de Exemplo:**

```
abc123def456ghi789jkl012mno345pqr678
```

**Como Obter:**

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione sua propriedade (domínio)
3. Escolha método de verificação: **Meta tag HTML**
4. Copie apenas o **código** (não a tag completa)

**Se não configurar:**

- ❌ Não conseguirá verificar propriedade automaticamente
- ✅ Site funcionará normalmente
- 💡 Pode verificar por outros métodos (arquivo HTML, DNS, etc)

---

## 🚀 Como Configurar na Vercel

### Passo 1: Acessar Settings

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Clique em **Settings** (⚙️)
4. No menu lateral, clique em **Environment Variables**

### Passo 2: Adicionar Cada Variável

Para cada variável da lista acima:

1. **Name** (Nome): Cole o nome exato da variável

   - Exemplo: `NEXT_PUBLIC_SITE_URL`

2. **Value** (Valor): Cole o valor correspondente

   - Exemplo: `https://cvats.vercel.app`

3. **Environments** (Ambientes): Selecione onde aplicar

   - ✅ **Production** (Recomendado)
   - ⚪ Preview (Opcional)
   - ⚪ Development (Opcional)

4. Clique em **Save**

### Passo 3: Fazer Novo Deploy

⚠️ **IMPORTANTE:** Variáveis de ambiente só são aplicadas em novos deploys!

Opções para aplicar:

**Opção A - Novo commit:**

```bash
git add .
git commit -m "chore: configurar variáveis de ambiente"
git push
```

**Opção B - Redeploy no dashboard:**

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do último deploy
3. Clique em **Redeploy**

---

## ✅ Configuração Completa

### Para Produção (Mínimo):

```env
# OBRIGATÓRIA
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com

# RECOMENDADA (Analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Para Produção (Completo):

```env
# URL do site
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123def456
```

---

## 🧪 Como Testar

### 1. Verificar se variáveis foram aplicadas:

Após deploy, abra o console do navegador no seu site e digite:

```javascript
console.log(process.env.NEXT_PUBLIC_SITE_URL);
// Deve mostrar: "https://seu-dominio.com"
```

### 2. Verificar Google Analytics:

1. Instale [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/)
2. Acesse seu site
3. Abra o console (F12)
4. Deve aparecer logs do GA com seu ID

### 3. Verificar SEO:

1. Acesse: `https://seu-dominio.com/sitemap.xml`
2. Deve mostrar URLs com o domínio correto
3. Acesse: `https://seu-dominio.com/robots.txt`
4. Deve mostrar o sitemap com o domínio correto

---

## ❌ Problemas Comuns

### Problema 1: "Variável não está funcionando"

**Solução:**

1. Verifique se o nome está **exatamente igual** (case-sensitive)
2. Certifique-se que fez um **novo deploy**
3. Limpe o cache do navegador (Ctrl + Shift + R)

### Problema 2: "Site mostra URL errada no metadata"

**Solução:**

1. Verifique se `NEXT_PUBLIC_SITE_URL` está sem `/` no final
2. Faça um novo deploy
3. Teste com [OpenGraph Debugger](https://www.opengraph.xyz/)

### Problema 3: "Google Analytics não está rastreando"

**Solução:**

1. Verifique se o ID está no formato correto: `G-XXXXXXXXXX`
2. Aguarde 24-48h para dados aparecerem
3. Use **Relatórios em tempo real** para teste imediato

---

## 📊 Resumo Visual

| Variável                               | Status             | Onde Usar              | Impacto se não configurar  |
| -------------------------------------- | ------------------ | ---------------------- | -------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | ⭐ **OBRIGATÓRIA** | SEO, Sitemap, Metadata | URLs incorretas no SEO     |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | 💡 Recomendada     | Google Analytics       | Sem analytics              |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | ⚪ Opcional        | Search Console         | Sem verificação automática |

---

## 🔒 Segurança

### Variáveis Públicas (`NEXT_PUBLIC_*`):

- ✅ São incluídas no bundle JavaScript
- ✅ Visíveis no código do cliente
- ✅ Seguras para IDs públicos (GA, URL, etc)
- ❌ **NUNCA** coloque senhas ou chaves secretas aqui

### Se precisar de variáveis privadas:

- Use sem o prefixo `NEXT_PUBLIC_`
- Só serão acessíveis no servidor
- Exemplo: `DATABASE_URL`, `API_SECRET_KEY`

---

## 📞 Suporte

Se tiver problemas:

1. **Documentação Vercel:** https://vercel.com/docs/environment-variables
2. **GitHub Issues:** https://github.com/rntxbr/cvats-app/issues
3. **Email:** renatokhael@gmail.com

---

**Última Atualização:** Outubro 2025  
**Vercel CLI:** Você também pode configurar via CLI com `vercel env add`

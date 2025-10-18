# Google Analytics 4 - Guia de Configuração

## 📊 Implementação

O Google Analytics 4 foi implementado seguindo as melhores práticas do Next.js 13+ App Router.

---

## 🔧 Configuração

### 1. Obter o ID de Medição (Measurement ID)

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade GA4 (se ainda não tiver)
3. Vá em **Admin** → **Fluxos de dados** → **Web**
4. Copie o **ID de medição** (formato: `G-XXXXXXXXXX`)

### 2. Configurar Variável de Ambiente

#### Para desenvolvimento local:

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BVDXL0225W
```

#### Para produção (Vercel):

1. Acesse o dashboard do seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-BVDXL0225W`
   - **Environment**: Production (e opcionalmente Preview/Development)
4. Clique em **Save**
5. Faça um novo deploy para aplicar as mudanças

---

## ✅ Arquivos Implementados

### `/src/app/components/GoogleAnalytics.tsx`

Componente client-side que carrega o gtag.js usando Next.js Script component.

**Características:**

- ✅ Usa `Script` do Next.js para otimização
- ✅ Strategy `afterInteractive` para não bloquear renderização
- ✅ Condicional: só carrega se variável de ambiente estiver definida
- ✅ Rastreamento automático de pageviews
- ✅ TypeScript com tipagem completa

### `/src/app/layout.tsx`

Google Analytics adicionado no layout raiz, antes de todos os componentes.

```tsx
<GoogleAnalytics />
<TopNavBar />
{children}
<Footer />
```

---

## 🎯 Como Funciona

### 1. Carregamento Otimizado

```typescript
strategy = "afterInteractive";
```

- Carrega após a página ser interativa
- Não bloqueia First Paint ou Time to Interactive
- Melhor performance para o usuário

### 2. Condicional

```typescript
if (!GA_MEASUREMENT_ID) {
  return null;
}
```

- Só renderiza se a variável de ambiente estiver configurada
- Permite desenvolvimento sem tracking
- Facilita testes locais

### 3. Configuração Automática

```javascript
gtag("config", "G-XXXXXXXXXX", {
  page_path: window.location.pathname,
});
```

- Rastreia navegação automaticamente
- Configurado com o pathname atual
- Compatível com App Router do Next.js 13+

---

## 📈 Rastreamento de Eventos

Para rastrear eventos personalizados, você pode adicionar em qualquer componente:

```typescript
"use client";

export function MyComponent() {
  const handleClick = () => {
    // Rastrear evento
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "button_click", {
        event_category: "engagement",
        event_label: "CTA Principal",
        value: 1,
      });
    }
  };

  return <button onClick={handleClick}>Clique aqui</button>;
}
```

### ✅ Eventos Já Implementados:

Os seguintes eventos estão automaticamente rastreados na aplicação:

1. **Resume Download** ✅

   - **Onde**: `ResumeControlBar.tsx`
   - **Quando**: Usuário clica no botão "Download Resume"
   - **Categoria**: conversion
   - **Label**: PDF Download

2. **Builder Started** ✅

   - **Onde**: `resume-builder/page.tsx`
   - **Quando**: Usuário acessa a página do construtor
   - **Categoria**: engagement

3. **Resume Import** ✅

   - **Onde**: `resume-import/page.tsx`
   - **Quando**: Usuário faz upload de um PDF para importar
   - **Categoria**: engagement

4. **ATS Parser Used** ✅
   - **Onde**: `resume-parser/page.tsx`
   - **Quando**: Usuário faz upload de um PDF para análise ATS
   - **Categoria**: tool_usage
   - **Label**: "User Upload"

### 📦 Helper Functions Disponíveis:

```typescript
import {
  trackResumeDownload,
  trackBuilderStarted,
  trackATSParserUsed,
  trackResumeImport,
  trackEvent,
} from "lib/gtag";

// Uso simples
trackResumeDownload();
trackBuilderStarted();
trackATSParserUsed("arquivo.pdf");
trackResumeImport("curriculo.pdf");

// Evento customizado
trackEvent("meu_evento", {
  event_category: "categoria",
  event_label: "label",
});
```

---

## 🔍 Verificação

### 1. No Desenvolvimento

1. Inicie o servidor: `npm run dev`
2. Abra o console do navegador (F12)
3. Vá para a aba **Network**
4. Filtre por `gtag`
5. Você deve ver requisições para `google-analytics.com/gtag/js`

### 2. Na Produção

1. Acesse seu site em produção
2. Instale a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/)
3. Ative a extensão e recarregue a página
4. Veja no console se os eventos estão sendo enviados

### 3. No Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Vá em **Relatórios** → **Em tempo real**
3. Navegue pelo seu site
4. Você deve ver os acessos aparecendo em tempo real

---

## 🚫 Desabilitar (Desenvolvimento)

Para desabilitar temporariamente durante desenvolvimento:

1. **Remova a variável** do `.env.local`:

   ```env
   # NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BVDXL0225W
   ```

2. **Ou use valor vazio**:

   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=
   ```

3. Reinicie o servidor

---

## 🔒 Privacidade e LGPD

### Configuração de Cookies

O Google Analytics usa cookies. Considere:

1. **Banner de Cookies**: Implemente um banner informando sobre cookies
2. **Opt-out**: Permita que usuários optem por não serem rastreados
3. **Anonimização de IP**: Já habilitada por padrão no GA4

### Exemplo de Opt-out:

```typescript
// Desabilitar GA
window["ga-disable-G-BVDXL0225W"] = true;
```

---

## 📊 Relatórios Importantes

### 1. Páginas Mais Visitadas

**Relatórios** → **Engajamento** → **Páginas e telas**

### 2. Conversões

Configure eventos de conversão:

- Resume Download
- Builder Completed
- ATS Test Completed

### 3. Funil de Conversão

**Explorar** → Criar novo → Funil de exploração

- Etapa 1: Landing Page
- Etapa 2: Resume Builder
- Etapa 3: Download PDF

### 4. Origem de Tráfego

**Relatórios** → **Aquisição** → **Visão geral**

---

## 🐛 Troubleshooting

### Problema: Analytics não carrega

**Soluções:**

1. Verifique se a variável de ambiente está configurada
2. Confirme que o ID está no formato correto: `G-XXXXXXXXXX`
3. Verifique o console do navegador por erros
4. Desabilite adblockers temporariamente

### Problema: Eventos não aparecem

**Soluções:**

1. Aguarde 24-48h para dados aparecerem em relatórios padrão
2. Use **Relatórios em tempo real** para verificação imediata
3. Verifique se `window.gtag` está definido
4. Confirme que o evento está sendo chamado após o GA carregar

### Problema: Build falha

**Soluções:**

1. Certifique-se que a variável começa com `NEXT_PUBLIC_`
2. Reinicie o servidor de desenvolvimento
3. Limpe o cache: `rm -rf .next && npm run build`

---

## 🔄 Migração de Universal Analytics (GA3)

Se você está migrando do GA3 (UA):

1. **Mantenha ambos** temporariamente
2. **Adicione GA3** (se necessário):
   ```typescript
   // Adicione ao GoogleAnalytics.tsx
   <Script
     strategy="afterInteractive"
     src={`https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX`}
   />
   ```
3. **Compare dados** por 30 dias
4. **Remova GA3** após validação

---

## 📞 Suporte

Para dúvidas:

- GitHub Issues: https://github.com/rntxbr/cvats-app/issues
- Email: hello@open-resume.com
- Documentação Google Analytics: https://support.google.com/analytics

---

**Última Atualização**: Outubro 2025  
**Versão do Next.js**: 13+  
**Versão do GA**: Google Analytics 4

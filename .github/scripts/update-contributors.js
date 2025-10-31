#!/usr/bin/env node

const https = require("node:https");
const { execSync } = require("node:child_process");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
  console.error("GITHUB_TOKEN e GITHUB_REPOSITORY devem estar definidos");
  process.exit(1);
}

function fetchContributors() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: `/repos/${GITHUB_REPOSITORY}/contributors`,
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "GitHub-Actions",
        Accept: "application/vnd.github.v3+json",
      },
    };

    https
      .get(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`API retornou status ${res.statusCode}: ${data}`));
            return;
          }

          try {
            const contributors = JSON.parse(data);
            const logins = contributors
              .map((c) => c.login)
              .filter((login) => login !== "github-actions[bot]" && login !== "dependabot[bot]");
            resolve(logins);
          } catch (e) {
            reject(new Error(`Erro ao processar resposta: ${e.message}`));
          }
        });
      })
      .on("error", (e) => {
        reject(e);
      });
  });
}

async function main() {
  try {
    console.log("Buscando contribuidores do repositório...");
    const contributors = await fetchContributors();

    console.log(`Encontrados ${contributors.length} contribuidores:`, contributors.join(", "));

    // Ler arquivo .all-contributorsrc atual
    const fs = require("node:fs");
    const configPath = ".all-contributorsrc";
    let config = {};

    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }

    const existingContributors = new Set((config.contributors || []).map((c) => c.login));

    // Adicionar novos contribuidores
    let added = 0;
    for (const contributor of contributors) {
      if (!existingContributors.has(contributor)) {
        console.log(`Adicionando contribuidor: ${contributor}`);
        try {
          execSync(`npx all-contributors-cli add "${contributor}" code`, {
            stdio: "inherit",
          });
          added++;
        } catch (e) {
          console.warn(`Erro ao adicionar ${contributor}:`, e.message);
        }
      } else {
        console.log(`Contribuidor ${contributor} já existe, pulando...`);
      }
    }

    if (added > 0) {
      console.log(`\n${added} novo(s) contribuidor(es) adicionado(s).`);
    }

    // Gerar lista no README
    console.log("\nGerando lista de contribuidores no README...");
    execSync("npx all-contributors-cli generate", {
      stdio: "inherit",
    });

    console.log("\n✅ Atualização de contribuidores concluída!");
  } catch (error) {
    console.error("❌ Erro:", error.message);
    process.exit(1);
  }
}

main();

const puppeteer = require("puppeteer");

// Função para extrair texto e links de um site
async function scrapeWebsite(url, depth = 1, visited = new Set()) {
  if (depth <= 0 || visited.has(url)) return null;
  visited.add(url);

  console.log(`🌍 Acessando: ${url}`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Extrair texto visível
    const pageText = await page.evaluate(() => {
      return document.body.innerText;
    });

    // Extrair todos os links da página
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a"))
        .map(link => link.href)
        .filter(href => href.startsWith("http"));
    });

    // Extrair links de imagens
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("img"))
        .map(img => img.src);
    });

    console.log(`✅ Extração concluída: ${url}`);
    
    await browser.close();
    
    return {
      url,
      text: pageText.trim(),
      links,
      images
    };
  } catch (error) {
    console.error(`❌ Erro ao processar ${url}:`, error.message);
    await browser.close();
    return null;
  }
}

module.exports = { scrapeWebsite };
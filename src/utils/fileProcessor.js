const pdfParse = require("pdf-parse");
const { PDFDocument } = require("pdf-lib");
const tesseract = require("tesseract.js");
const fs = require("fs");
const mammoth = require("mammoth");
const csvParser = require("csv-parser");

// Função para limpar texto extraído
function cleanExtractedText(text) {
  return text.replace(/\n\s+/g, " ").replace(/\s+\n/g, " ").trim();
}

// 📌 Extração de texto de PDFs (inclui OCR para PDFs escaneados)
async function extractTextFromPDF(filePath) {
  try {
    console.log(`📂 Extraindo texto do PDF: ${filePath}`);

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    let extractedText = cleanExtractedText(pdfData.text);

    if (!extractedText || extractedText.length < 10) {
      console.log("⚠️ Nenhum texto encontrado, aplicando OCR...");
      const pdfDoc = await PDFDocument.load(dataBuffer);
      const pages = pdfDoc.getPages();
      let ocrText = "";

      for (let i = 0; i < pages.length; i++) {
        console.log(`📖 Aplicando OCR na página ${i + 1}...`);
        const { data: { text } } = await tesseract.recognize(pages[i].doc.context, "eng");
        ocrText += text + "\n\n";
      }

      extractedText = cleanExtractedText(ocrText);
    }

    return extractedText || "⚠️ Nenhum texto legível encontrado.";
  } catch (error) {
    console.error("❌ Erro ao extrair texto do PDF:", error.message);
    return "Erro ao extrair texto do PDF.";
  }
}

// 📌 Extração de texto de arquivos DOCX
async function extractTextFromDOCX(filePath) {
  try {
    console.log(`📂 Extraindo texto do DOCX: ${filePath}`);
    const dataBuffer = fs.readFileSync(filePath);
    const { value } = await mammoth.extractRawText({ buffer: dataBuffer });
    return cleanExtractedText(value) || "⚠️ Nenhum texto extraído.";
  } catch (error) {
    console.error("❌ Erro ao extrair texto do DOCX:", error.message);
    return "Erro ao extrair texto do DOCX.";
  }
}

// 📌 Extração de conteúdo de arquivos CSV
async function extractTextFromCSV(filePath) {
  try {
    console.log(`📂 Extraindo conteúdo do CSV: ${filePath}`);
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(JSON.stringify(results, null, 2)))
        .on("error", (error) => reject(error));
    });
  } catch (error) {
    console.error("❌ Erro ao processar CSV:", error.message);
    return "Erro ao processar CSV.";
  }
}

// 📌 Extração de conteúdo de arquivos JSON
async function extractTextFromJSON(filePath) {
  try {
    console.log(`📂 Extraindo conteúdo do JSON: ${filePath}`);
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.stringify(JSON.parse(jsonData), null, 2);
  } catch (error) {
    console.error("❌ Erro ao processar JSON:", error.message);
    return "Erro ao processar JSON.";
  }
}

module.exports = {
  extractTextFromPDF,
  extractTextFromDOCX,
  extractTextFromCSV,
  extractTextFromJSON,
};
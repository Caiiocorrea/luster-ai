const fetch = require("node-fetch");

class HttpClient {
  static async post(url, headers, body) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Erro ao chamar API: ${error.message}`);
      throw error;
    }
  }
}

module.exports = HttpClient;
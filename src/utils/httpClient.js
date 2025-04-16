const axios = require("axios");

class HttpClient {
  static async post(url, headers, data) {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error("❌ Erro na requisição HTTP:", error.response?.data || error.message);
      throw new Error("Erro ao chamar API externa.");
    }
  }
}

module.exports = HttpClient;
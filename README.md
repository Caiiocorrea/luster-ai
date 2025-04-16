# LusterAI - Plataforma de Agentes de IA

## 📌 Visão Geral
LusterAI é uma plataforma para a criação e gestão de agentes de IA personalizados. Cada usuário pode criar seus próprios agentes, definir regras, fornecer conhecimento base e monitorar interações em tempo real. O sistema conta com um mecanismo de aprendizado contínuo baseado em feedbacks, permitindo aprimoramento progressivo dos agentes.

## 🚀 Funcionalidades

### 🏗️ Criação e Gestão de Agentes
- Criação de agentes com nome, prompt inicial e regras específicas.
- Armazenamento de informações contextuais e variáveis personalizadas.
- Importação de conhecimento através de arquivos e links externos.

### 💬 Interação e Aprendizado
- Histórico de conversas armazenado para análise.
- Busca otimizada de conhecimento interno utilizando PostgreSQL Full-Text Search (FTS).
- Coleta de informações externas para ampliar o contexto das respostas.
- Feedbacks ajustáveis apenas pelo criador do agente para correções de respostas incorretas.

### 🔄 Aprendizado Contínuo
- Feedbacks são avaliados e, quando aprovados, incorporados ao conhecimento do agente.
- Moderação de feedbacks pelo criador do agente, evitando aprendizado incorreto.
- Registro de versões do conhecimento para controle de mudanças.

### 📊 Administração e Monitoramento
- Dashboard para análise de interações e eficiência das respostas.
- Controle de permissões para agentes e usuários.
- Logs de aprendizado para rastreamento de mudanças no conhecimento.

## 🛠️ Estrutura do Projeto

### 📁 Backend (Node.js + Express + PostgreSQL)
- `src/config` → Configuração do banco de dados e variáveis de ambiente.
- `src/models` → Modelos Sequelize das entidades (Agentes, Conversas, Feedbacks, etc).
- `src/services` → Lógica de negócios para busca, aprendizado e feedbacks.
- `src/controllers` → Manipulação das requisições HTTP.
- `src/routes` → Definição das rotas da API.
- `src/database` → Scripts de sincronização e migração do banco.

## 📡 API Endpoints

### 🎙️ Chat com Agentes
`POST /api/chat`
```json
{
  "agent_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Quais são as motos elétricas mais eficientes?"
}
```

### 📝 Feedbacks
**Enviar Feedback**
`POST /api/feedback`
```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "agent_id": "550e8400-e29b-41d4-a716-446655440000",
  "conversation_id": "3f21c456-7890-4abc-a123-123456789abc",
  "suggested_correction": "As motos da Tesla são as mais eficientes do mercado."
}
```

**Listar Feedbacks Pendentes**
`GET /api/feedback/pending/:agent_id`

**Aprovar Feedback**
`PUT /api/feedback/approve/:feedback_id`

**Rejeitar Feedback**
`PUT /api/feedback/reject/:feedback_id`

**Histórico de Correções**
`GET /api/feedback/history/:agent_id`

## 📌 Configuração e Execução

### 🔧 Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-repositorio/lusterai.git
   cd lusterai
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

### 🔥 Configuração do Banco de Dados
1. Configure as variáveis de ambiente no `.env`:
   ```sh
   DATABASE_URL=postgres://usuario:senha@localhost:5432/lusterai_db
   PORT=3000
   ```
2. Sincronize o banco de dados:
   ```sh
   node src/database/sync.js
   ```

### ▶️ Executando a Aplicação
- Ambiente de desenvolvimento:
  ```sh
  npm run dev
  ```
- Ambiente de produção:
  ```sh
  npm start
  ```

## 📌 Próximos Passos
- Implementação de dashboards para análise das interações.
- Melhorias no aprendizado automático baseado em feedbacks.
- Expansão para novos formatos de conhecimento externo.

---

🛠 Desenvolvido com foco em escalabilidade, modularidade e clean code. 🚀

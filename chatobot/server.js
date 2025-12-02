console.log("Iniciando server.js...");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("API KEY carregada? ", process.env.OPENAI_API_KEY ? "SIM" : "NÃO");

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa a API
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log("OpenAI inicializado");

app.post("/api/chat", async (req, res) => {
  const { msg } = req.body;

  if (!msg) {
    return res.status(400).json({ resposta: "Mensagem inválida" });
  }

  try {
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: msg
    });

    // NOVO formato:
    const resposta = completion.output[0].content[0].text;

    return res.json({ resposta });

  } catch (err) {
    console.error("Erro no OpenAI:", err);
    return res.status(500).json({ resposta: "Erro ao gerar resposta" });
  }
});

app.listen(3000, () => console.log("Server rodando na porta 3000"));

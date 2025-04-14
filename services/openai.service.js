import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export const analyzeText = async (text) => {
  const prompt = `
Analiza el siguiente texto de reseñas de productos y devuelve:
1. Un resumen corto.
2. Sentimiento general (positivo, negativo, mixto).
3. Palabras clave destacadas.

Texto:
${text}
  `

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5
  })

  const content = response.data.choices[0].message.content
  const [summary, sentiment, keywords] = content.split('\n').map(l => l.replace(/^\d+\.\s*/, ''))

  return {
    summary,
    sentiment,
    keywords
  }
}

import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const { SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, SHOPIFY_STORE_NAME } = process.env

const baseURL = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_STORE_NAME}/admin/api/2023-10`

export const getProductReviews = async (productId) => {
  // Simulado: Shopify no ofrece reseñas por defecto, pero usamos este endpoint simulado o externo
  // Usa Judge.me, Loox o algún otro si tienes reviews integradas
  const fakeReviews = [
    { body: 'Excelente producto, me encantó su calidad.' },
    { body: 'No me gustó, llegó tarde y defectuoso.' },
    { body: 'Volvería a comprarlo, lo recomiendo totalmente.' }
  ]
  return fakeReviews
}

import { getProductReviews } from '../services/shopify.service.js';
import { analyzeText } from '../services/openai.service.js';
import { sendReviewSummaryEmail } from '../services/mailService.js';

export const analyzeAndSendReviews = async (req, res) => {
  const { productId, userEmail } = req.body;

  try {
    // Obtener las reseñas del producto desde Shopify
    const reviews = await getProductReviews(productId);

    if (!reviews.length) return res.status(404).json({ message: 'No reviews found' });

    // Combinar el texto de todas las reseñas
    const fullText = reviews.map(r => r.body).join('\n');

    // Analizar las reseñas con OpenAI
    const analysis = await analyzeText(fullText);

    // Resumen y análisis
    const summary = analysis.summary;
    const sentiment = analysis.sentiment;
    const keywords = analysis.keywords;

    // Enviar el correo con el resumen de las reseñas
    await sendReviewSummaryEmail(userEmail, productId, summary);

    // Enviar la respuesta al frontend
    res.json({
      total_reviews: reviews.length,
      summary,
      sentiment,
      keywords
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

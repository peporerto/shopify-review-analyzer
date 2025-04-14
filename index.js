import express from 'express';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
app.use(express.json()); // Para poder leer los datos JSON en el cuerpo de las solicitudes

app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

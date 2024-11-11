
import { SEEDusers } from '../src/services/seedUsers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const result = await SEEDusers({ name, email, password });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      res.status(500).json({ error: 'Error al insertar usuario en la base de datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

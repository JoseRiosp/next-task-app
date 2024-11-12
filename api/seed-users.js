// pages/api/seed-users.js
import { SEEDusers } from './seedUsers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      res.status(400).json({error: 'Missing required fields from formik'});
      return;
    }

    try {
      const result = await SEEDusers({ name, email, password });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user in database' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

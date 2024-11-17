// pages/api/seed-users.js
import SEEDtasks  from './seedTasks';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { task_name, description, is_completed, task_level } = req.body;

    if(!task_name || !description){
      res.status(400).json({error: 'Missing required fields from Taskform'});
      return;
    }

    try {
      const result = await SEEDtasks({ task_name, description, is_completed, task_level});
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Error fetching task in database' });
    }
  } else {
    res.status(405).json({ message: 'Method NOT ALLOWED' });
  }
}

// pages/api/seed-users.js
import SEEDusers from './seedUsers.js';
//New instance of schema-prisma user 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email='', password, action } = req.body;

    if(!name || !password || !action ){
      res.status(400).json({error: 'Missing required fields from formik'});
      return;
    }

    if(action==='create'){

    try {
      const result = await SEEDusers({ name, email, password });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user in database' });
    }
  }  
  
  else if (action==='authenticate') { //"TODO:" Choose between username or email 
    const prisma = new PrismaClient(); 
    try {
      const user = await prisma.users.findUnique({ //users is the name of the table
        where: { name: name },
        select: { name: true, password: true }
      }); //get the user name based on the name

        //Authentification of user 

      const isMatch = await bcrypt.compare(password, user.password); //compare encryptated password
      
      if (user.name === name && isMatch){ 
        res.status(200).json({message: 'user authenticated'})
      } else {
        res.status(401).json({error: 'invalid username or password'})
      }
    } catch (error) {
      console.error('Error during authentification:', error);
      res.status(500).json({ error: 'Internal authentification error' });
    }
    
  } else {
    return res.status(400).json({ message: 'Invalid action' });
  }} else {
    return res.status(405).json({message: 'METHOD NOT ALLOWED'})
  }
}

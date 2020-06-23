const express = require('express');
const router = express.Router();
// Services
const userService = require('../services/UserService');

// Multer
const multer = require('multer');
const multerConfig = require('../../modules/multer');


router.post('/authenticate', async (request, response) => {
  const { username, password } = request.body;

  try{
    const user = await userService.findByUsername(username);
    
    if(!user){
      return response.status(400).json({ error: 'Username not found!'});
    }

    if(user.password === password){
      return response.status(200).json({
        user
      });
    }
    return response.status(401).json( { error: "Incorrect Password!" } )
  } catch(err){
    return response.status(401).json({ error: 'Error on login, try again!'});
  }
 
});

router.post('/register', multer(multerConfig).single('file'), async(request, response) =>{
  const { name, username, password, email, telephone, city, uf, typeUser} = request.body;
  const data = { 
    name, 
    username, 
    password, 
    email, 
    telephone, 
    city, 
    uf, 
    imageUser: `${process.env.APP_URL}/files/${request.file.filename}`,
    typeUser,
  };
  try{
    await userService.createUser(data);
    return response.send(201);
  } catch(err){
    return response.status(401).send( { error: 'Choose other username!' } );
  }
  
});

router.post('/change/profile/image', multer(multerConfig).single('file'),  async(request, response) =>{
  const id = request.headers.authorization;
  const imageUser = `${process.env.APP_URL}/files/${request.file.filename}`;
  
  try{
    await userService.updateProfilePhoto(id, imageUser);
    return response.status(200).send();

  } catch(err){
    console.log(err);
    return response.status(401).json({ error: 'Error on change profile photo, try again!'});
  }
  
});


module.exports = app => app.use('/sessions', router);
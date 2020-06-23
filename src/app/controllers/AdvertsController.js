const express = require('express');
const router = express.Router();

// Services
const AdvertsServices = require('../services/AdvertsServices');

// Multer
const multer = require('multer');
const multerConfig = require('../../modules/multer');

router.get('/list', async (request, response) => {
  const advert = await AdvertsServices.listAdverts();
  return response.status(200).send({
    advert
  })
})

router.post('/create', multer(multerConfig).single('file') ,async (request, response) =>{
  const { title, description } = request.body;
  const employee_id = request.headers.authorization;
  const data = {
    title,
    description,
    imageAdvert: `${process.env.APP_URL}/files/${request.file.filename}`,
    employee_id,
  }
  try {
    await AdvertsServices.createAdvert(data);
    return response.status(201).send();

  } catch(err) {
    console.log(err);
    return response.status(401).send( { error: 'error on create advert!' } );
  }
});

router.delete('/remove/:id', async (request, response) => {
  const { id } = request.params;
  const employee_id = request.headers.authorization;

  const advert = await AdvertsServices.findById(id);

  if(!advert){
    return response.status(401).send( { error: 'Error on get advert!' } );
  }
  
  if(advert.employee_id != employee_id){
    return response.status(401).json( { Error: 'Operation not permitted.'} );
  }

  await AdvertsServices.deleteAdvert(id);
  return response.status(204).send();
});


module.exports = app => app.use('/adverts', router);
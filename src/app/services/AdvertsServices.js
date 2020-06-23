const connection = require('../database/connection');

module.exports = {
  createAdvert(data){
    return connection('advert')
      .insert(data);  
  },

  findById(id){
    return connection('advert')
      .where('id', id)
      .select('*')
      .first();
  },

  deleteAdvert(id){
    return connection('advert')
      .where('id', id)
      .delete();
  },

  listAdverts(){
    return connection('advert')
      .select('*');
  },
}
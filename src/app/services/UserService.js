const connection = require('../database/connection');

module.exports = {
  findByUsername(username){
    return connection('users')
      .where('username', username)
      .select('*')
      .first();
  },

  createUser(data){
    return connection('users')
      .insert(data);
  },


  findById(id){
    return connection('users')
      .where('id', id)
      .select('*')
      .first();
  },
  
  updateProfilePhoto(id, imageUser){
    return connection('users')
      .where('id', id)
      .update('imageUser', imageUser);
  },
}
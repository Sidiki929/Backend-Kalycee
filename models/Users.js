const mongoose = require("mongoose");

 const UserSchema = new mongoose.Schema({
   nom: { type: String, required: true },  
   prenom: { type: String, required: true },
   telephone: { type: String, required: true },
  password: { type: String, required: true },
  userType: {
   type: String,
   enum: ["admin", "client"],
   required: true
 },
  date_ajout: {type: Date,required:false}
 });

 const User = mongoose.model('User', UserSchema);
 module.exports = User;



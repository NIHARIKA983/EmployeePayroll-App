import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: /^[a-zA-Z]{3,20}$/
  },
  lastName: {
      type: String,
      required: true,
      validate: /^[a-zA-Z]{3,20}$/
  },
  gender:{
      type:String,
      required:true,
      validate:/^[a-zA-Z]/
  },
  salary:{
      type:String,
      required:true,
      validate: /^[0-9]/
  },
  department:{
      type:String,
      required:true,
      validate: /^[a-zA-Z]{2,20}$/
  },
  emailId: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
      unique: true
  }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);

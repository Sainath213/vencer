const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://tommy:T39m5PREnSPlXUC5@cluster0.ysqhn.mongodb.net/users").then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.error('Failed to connect to MongoDB', err);
});
let mongoose =require('mongoose');
let schema = mongoose.Schema;

let UserSchema = new schema({
    email:{type:String, required:[true,'email required']},
    password:{type:String, required:true},
    adminStatus:{type:Number, default:'1'}
})

module.exports = mongoose.model('User',UserSchema);



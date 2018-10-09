const mongoose =require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new schema({
    email:{type:String, required:[true,'email required']},
    password:{type:String, required:true},
    adminStatus:{type:Number, default:'1'}
})

UserSchema.pre('save', function(next){
    let user = this;
    
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password,10,(err, hash) => {

        if (err) return next(err);
            user.password = hash; 
            next(); 
    })
})

UserSchema.pre('findOneAndUpdate', function(next){
    let user = this._update;

    if (!user.password) {
        return next();
    }

    bcrypt.hash(user.password,10,function(err, hash) {

        if (err) return next(err);
            user.password = hash; 
            next(); 
    })
})

module.exports = mongoose.model('User',UserSchema);



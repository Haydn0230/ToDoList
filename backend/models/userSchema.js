const mongoose =require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new schema({
    email:{type:String, required:[true,'email required']},
    password:{type:String, required:true},
    adminStatus:{type:Number, default:'1'}
})

UserSchema.pre('save', function(next){
    console.log("1");
    let user = this;
    console.dir(user);
    if (!user.isModified('password')) return next();

    console.log('3 ' + user.password);

    bcrypt.hash(user.password,10,(err, hash) => {

        if (err) return next(err);
            user.password = hash; 
            console.log('4 :user pass -- ' + user.password);
            next(); 
    })
})

UserSchema.pre('findOneAndUpdate', function(next){
    console.log("17");
    let user = this._update;
    console.log("1>>>>"+user.password);
    console.dir(user);
    if (!user.password) {
        console.log(">>>>>>>>>>>>>>>>> 6");
        return next();
    }

    console.log('3 ' + user.password);

    bcrypt.hash(user.password,10,function(err, hash) {

        if (err) return next(err);
            user.password = hash; 
            console.log('4 :user pass -- ' + user.password);
            next(); 
    })
})

module.exports = mongoose.model('User',UserSchema);



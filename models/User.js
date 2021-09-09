const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})

userSchema.pre('save',function (next) {

    let user = this;

    if (user.isModified('password')) {  // 비밀번호가 바뀌었을때

        // 솔트 생성, saltRounds가 필요
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)    // save함수로 보내줌(index.js의 user.save())

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)    // save함수로 보내줌(index.js의 user.save())

                // Store hash in your password DB.
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
}) // save() 함수를 실행하기전에 콜백함수를 먼저 실행함

userSchema.methods.comparePassword = function (plainPassword, cb) {

    // plainPassword
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null,isMatch)
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        require: [true, 'First Name is required'],
        minlength: [2, 'First Name must be at least 2 characters long']
    },
    lastName: {
        type: String,
        require: [true, 'Last Name is required'],
        minlength: [2, 'Last Name must be at least 2 characters long']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'Email is required'],
        minlength: [2, 'Email must be at least 2 characters long']
    },
    password : {
        type: String,
        require: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters']
    },
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get(()=>this._confirmPassword)
    .set((value)=>this._confirmPassword = value)

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords must match!')
        // console.log('passwords dont match')
    }
    next() 
})

UserSchema.pre('save', function(next){
    // console.log('in pre save');
    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=>{
            this.password= hashedPassword;
            next()
        })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
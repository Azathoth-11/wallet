const mongoose = require('mongoose');

// connecting to mongoDB
mongoose.connect('mongodb+srv://scamoon:7LwDqwfFzVYbY_8@stackuptest.lxe06jk.mongodb.net/paytm');


// Schema for the database
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String

});

const accountSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
        },
        balance: {
            type: Number,
            required: true
        }
    });


//Creating the model for the DB.
const User = mongoose.model('User', userSchema);

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};


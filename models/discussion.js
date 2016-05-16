var mongoose         = require('mongoose');
var Schema           = mongoose.Schema;
var discussionSchema = new Schema({
    title:   String,
    message: String,
    userId:  {
        type: String,
        ref: 'User'
    },
    questions: [{
        question: String,
        answers: [{
            answer: String
        }]
    }]
});
var Discussion       = mongoose.model('Discussion', discussionSchema);
module.exports       = Discussion;
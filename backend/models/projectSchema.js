const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectSchema = new schema({
    projectTitle: { type: String, required: [true, 'project title needed'] },
    listItem: [{
        listTitle: { type: String },
        listItem: { type: String },
        listOwnership: { type: String, default: 0 },
        listDateCreated: { type: Date, default: Date },
        listDateCompletion: { type: Date },
        listItemCompleted:{type:Boolean, default:false}
    
    }],
    userAccess: [{
        email:{type:String},
        userId:{type:String},
        firstName:{type:String},
        lastName:{type:String}
    }],
    projectOwner:{type:String},
    projectCompletionDate:{type:Date, required:[true, 'project completion date required']}
})


module.exports = mongoose.model('Project', ProjectSchema);



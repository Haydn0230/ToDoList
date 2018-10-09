const mongoose =require('mongoose');
const schema = mongoose.Schema;

const ListSchema = new schema({
    listTitle:{type:String, required:[true,'List Title required']},
    listItem:{type:String, required:[true, 'List Item required']},
    listOwnership:{type:Number, default:0},
    listDateCreated:{type:Date, default:Date},
    listDateCompletion:{type:Date},
    projectID: {type:String, required:[true, 'needs to be part of a project']}
})


module.exports = mongoose.model('List',ListSchema);



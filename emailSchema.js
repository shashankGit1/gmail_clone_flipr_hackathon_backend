import mongoose from 'mongoose'

// defining schema 
const mayadataSchema = mongoose.Schema({
    to: String,
    from: String,
    subject: String,
    text: String,
    endTime: String,

})

export default mongoose.model('emailContent', mayadataSchema)
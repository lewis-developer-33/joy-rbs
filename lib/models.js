import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    role: { type: String, default:"User" },
});

const recordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    nationality: { type: String, required: true },
    grade: { type: String, required: true },
    sports: [{ type: String}],
    clubs: [{ type: String }],
    religion: { type: String, required: true },
    reason: { type: String, required: true },
    results: { type: String, required: true },
});

const modelSchema = new mongoose.Schema({
    name:{type:String,unique:true},
    minage: { type: String, required: true },
    maxage: { type: String, required: true },
    nationality: [{ type: String, required: true }], // or
    grade: [{ type: String, required: true }], // or
    sports: [{ type: String, required: false }], // weights
    clubs: [{ type: String, required: false }], // weights
    religion: [{ type: String, required: true }], // or
    
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);
const Model = mongoose.models.Model || mongoose.model('Model', modelSchema);


export{
    User,
    Record,
    Model
}

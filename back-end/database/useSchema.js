const mongoose = require("mongoose"); 

let clgSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    role: String,
    address: String,
    number: Number,
    password: String,
    token: String,
    userrole: Array,
}, {
    versionKey: false,
});
const collegeSchema = mongoose.model("colleges", clgSchema);

let rSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    access: Array,
    role: String,
}, {
    versionKey: false,
});
const roleSchema = mongoose.model("roles", rSchema);

module.exports = {
    collegeSchema: collegeSchema,
    roleSchema: roleSchema,
};
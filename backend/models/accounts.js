const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountsSchema = new Schema ({
    image: String,
//   first_name: String,
//   middle_name: String,
//   last_name: String,
    email: String,
//   birth_date: String,
    username: { type: String, unique: true},
    password: String,
    created_at: String,
//   updated_at: String
}

// {timestamps: true}

);

module.exports = mongoose.model("Account", accountsSchema);
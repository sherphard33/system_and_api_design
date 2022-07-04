// const mnDb = require("mongoose");

// const userSchema = mnDb.Schema({
//   id: { type: String, required: true },
//   userName: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// module.exports = mnDb.model("User", userSchema);

export interface User {
  id?: number;
  username: string;
  role: string;
  users: [];
}

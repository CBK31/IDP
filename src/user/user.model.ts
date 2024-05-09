const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
});
userSchema.index({ email: 1 });
export default mongoose.model("User", userSchema);

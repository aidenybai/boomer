import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', User);

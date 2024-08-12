
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  employee_id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export const Admin = mongoose.models.admins || mongoose.model('admins', adminSchema);

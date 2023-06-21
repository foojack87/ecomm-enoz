import { Model, models, model } from 'mongoose';
import { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const AdminSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'] },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

// Had the password before saving

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

export const Admin = models.Admin || model('Admin', AdminSchema);

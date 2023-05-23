import mongoose, { model, models, Schema } from 'mongoose';

const CategorySchema = new Schema({
  categoryName: { type: String, require: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
});

export const Category = models?.Category || model('Category', CategorySchema);

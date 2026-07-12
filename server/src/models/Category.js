import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    description: { type: String, default: '' },
    customFields: [
      {
        fieldName:  { type: String },
        fieldType:  { type: String, enum: ['text', 'number', 'date', 'boolean'] },
        required:   { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)
export default Category

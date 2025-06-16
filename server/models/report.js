import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['job', 'user'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reason: { type: String, required: true },
  details: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'dismissed'], default: 'pending' }
},{timestamps: true});

export default mongoose.model('Report', reportSchema);
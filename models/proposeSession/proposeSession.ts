import mongoose, { Schema } from 'mongoose';
const proposeSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },

  timezone: {
    type: String,
    required: true,
  },
  startTime: {
    type: [Date],
    required: true,
  },

});

const createSession = mongoose.model('Propose', proposeSchema);
export default createSession;

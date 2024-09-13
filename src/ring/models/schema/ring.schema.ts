import { Schema } from 'mongoose';

export const RingSchema = new Schema({
  _id: { type: Number },
  name: { type: String, unique: true },
  power: { type: String },
  ringBearer: { type: String },
  forger: { type: String },
  type: { type: String },
  image: { type: String },
});

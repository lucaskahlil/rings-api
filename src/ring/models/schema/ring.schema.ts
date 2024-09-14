import mongoose from 'mongoose';

export const RingSchema = new mongoose.Schema(
  {
    name: { type: String },
    power: { type: String },
    ringBearer: { type: String },
    forger: { type: String },
    type: { type: String },
    image: { type: String },
  },
  { timestamps: true, collection: 'rings' },
);

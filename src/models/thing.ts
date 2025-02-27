import { Schema, model } from 'mongoose';

// interface IThing {
//   title: string;
//   description: string;
//   imageUrl: string;
//   userId: string;
//   price: number;
// }

const thingSchema = new Schema<thing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

export default model<thing>('Thing', thingSchema);
import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema<user>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

export default model<user>('User', userSchema);

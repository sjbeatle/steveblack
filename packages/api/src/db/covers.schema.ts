import { Schema, Model, model } from 'mongoose';
import { ICovers } from '@steveblack/interfaces';

export const CoversSchema: Schema = new Schema({
  artist: {
    type: String,
    required: true,
    unique: true,
  },
  songs: [{
    type: String,
    unique: true,
  }],
});

export const Covers: Model<ICovers> = model<ICovers>('covers', CoversSchema);

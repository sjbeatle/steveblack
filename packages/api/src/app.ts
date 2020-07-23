import express from 'express';
import cors from 'cors'
import mongoose, { Model, model, Schema } from 'mongoose';
import { config } from './db';

export interface ICovers extends Document {
  artist: string;
  songs: string[];
}

export const CoversSchema: Schema = new Schema({
  artist: { type: String },
  songs: { type: Array },
}, { collection: 'covers' });

export const Covers: Model<ICovers> = model<ICovers>('covers', CoversSchema);

const PORT = 4000;
const app = express();
app.use(cors());
const dbConnect = () => {
  mongoose.connect(
    config.DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    // tslint:disable-next-line:no-console
    .then(() => console.log('DB Connected!'))
    // tslint:disable-next-line:no-console
    .catch((er: any) => console.log(`DB Connection Error 😩: ${er.message}`));
};
dbConnect();

app.get('/covers', async (req, res) => {
  try {
    const result = await Covers.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log('Listening on port: ', PORT));

import mongoose from 'mongoose';

export async function DBConnect() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/steveblack`);
    console.log('DB Connected!');
  } catch (er) {
    (er: any) => console.log(`DB Connection Error: ${er.message}`);
  }
}

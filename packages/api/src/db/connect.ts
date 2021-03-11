import mongoose from 'mongoose';

export async function DBConnect() {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
  try {
    // await mongoose.connect(`mongodb://localhost:27017/steveblack`, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB Connected!');
  } catch (er) {
    (er: any) => console.log(`DB Connection Error: ${er.message}`);
  }
}

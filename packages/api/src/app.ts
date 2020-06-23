import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

const add = (a: number, b: number): number => a + b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(add(5, 5));
  res.send('Hello World');
});

app.listen(5000, () => console.log('Server running'));

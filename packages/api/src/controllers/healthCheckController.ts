import { Request, Response } from 'express';

export const healthCheckController = async (req: Request, res: Response) => {
  res.send('OK');
};

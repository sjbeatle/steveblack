import { Request, Response } from 'express';
import { Covers } from '../db';

export async function CoversGetAllController(req: Request, res: Response) {
  try {
    const covers = await Covers.find().exec();
    res.send(covers || []);
  } catch (error) {
    res.status(500).send(error);
  }
}

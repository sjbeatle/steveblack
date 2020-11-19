import { Request, Response } from 'express';
import { Covers } from '../db';

export async function CoversGetSongController(req: Request, res: Response) {
  try {
    const covers = await Covers.findById(req.params.id).exec();
    res.send(covers?.songs || []);
  } catch (error) {
    res.status(500).send(error);
  }
}

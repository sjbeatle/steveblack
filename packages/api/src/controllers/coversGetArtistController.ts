import { Request, Response } from 'express';
import { Covers } from '../db';

export async function CoversGetArtistController(req: Request, res: Response) {
  try {
    const covers = await Covers.findById(req.params.id).exec();
    res.send(covers || {});
  } catch (error) {
    res.status(500).send(error);
  }
}

import { Request, Response } from 'express';
import { Covers } from '../db';

export async function CoversPutArtistController(req: Request, res: Response) {
  try {
    const covers = await Covers.findById(req.params.id).exec();
    if (covers) {
      const { artist } = req.body;
      covers.artist = artist;
      const result = await covers.save();
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}


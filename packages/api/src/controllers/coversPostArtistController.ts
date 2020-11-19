import { Request, Response } from 'express';
import { Covers } from '../db';

export async function CoversPostArtistController(req: Request, res: Response) {
  try {
    const { artist } = req.body;
    const covers = new Covers({
      artist,
      songs: [],
    });
    const result = await covers.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * EXAMPLE
 */
// fetch('http://localhost:5000/covers/5ef3ba42688aad4a8ac9d0fc', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({artist: 'legend'}),
// });

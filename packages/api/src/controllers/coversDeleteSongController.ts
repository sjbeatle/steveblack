import { Request, Response } from 'express';
import { Covers } from '../db';

export async function CoversDeleteSongController(req: Request, res: Response) {
  try {
    const covers = await Covers.findById(req.params.id).exec();
    if (covers) {
      const { song } = req.body;
      covers.songs = covers.songs.filter((s) => s !== song);
      const result = await covers.save();
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * EXAMPLE
 */
// fetch('http://localhost:5000/covers/5ef3ba42688aad4a8ac9d0fc', {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({song: 'legend'}),
// });

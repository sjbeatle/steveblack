import { Express } from 'express';

import {
  healthCheckController,
  CoversGetAllController,
  CoversGetArtistController,
  CoversPutArtistController,
  CoversPostArtistController,
  CoversDeleteArtistController,
  CoversGetSongController,
  CoversPutSongController,
  CoversDeleteSongController,
} from '../controllers';

export const initRoutes = (server: Express): Express => {
  server.get('/health/ping', healthCheckController);
  server.get('/covers', CoversGetAllController);
  server.get('/covers/:id', CoversGetArtistController);
  server.put('/covers/:id', CoversPutArtistController);
  server.post('/covers', CoversPostArtistController);
  server.delete('/covers/:id', CoversDeleteArtistController);
  server.get('/covers/:id/song', CoversGetSongController);
  server.put('/covers/:id/song', CoversPutSongController);
  server.delete('/covers/:id/song', CoversDeleteSongController);

  return server;
};

import { Artist } from "./artist";

export class Album {
  _id: string = '';
  name: string = '';
  artist: Artist = new Artist();
  songs: number[] | string[] = [];
  year: number | string = 0;
  imageUrl?: string = '';
}

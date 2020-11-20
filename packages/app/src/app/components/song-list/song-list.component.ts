import { ICovers } from '@steveblack/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  @Input() covers: ICovers[] = [];
  @Input() showCount: boolean;
  @Input() interactive: boolean;
  @Output() artist = new EventEmitter<string>();
  @Output() song = new EventEmitter<{id: string, song: string}>();
  faTimes = faTimes;

  get songCount(): number {
    let count = 0;
    this.covers.forEach(a => {
      if (a.songs && a.songs.length) {
        count += a.songs.length;
      }
    });

    return count;
  }

  constructor() { }

  ngOnInit(): void {
  }

  deleteArtist(id: string) {
    this.artist.emit(id);
  }

  deleteSong(id: string, song: string) {
    this.song.emit({ id, song });
  }

}

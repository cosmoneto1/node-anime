import { Component, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();
  list: any = [];
  animeAtual: any;
  preloaderStatus = true;

  @ViewChild('video') video: ElementRef;
  @ViewChild('sourceVideo') source: ElementRef;

  constructor(private hs: HomeService) { }

  ngOnInit() {
    this.hs.getAnimakai()
      .subscribe((data) => {
        console.log(data);
        this.list = data || [];
        this.preloaderStatus = false;
      }, (err) => {
        this.list = [];
        this.preloaderStatus = false;
        console.log(err.status);
      });
  }




  openModal(anime) {
    this.animeAtual = anime;
    console.log(this.animeAtual);
    if (this.animeAtual.link !== undefined && this.animeAtual.link !== '') {
      this.source.nativeElement.src = this.animeAtual.link || '';
      this.video.nativeElement.load();
      this.modalActions.emit({ action: 'modal', params: ['open'] });
    }
  }

  closeModal() {
    this.video.nativeElement.pause();
    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this.source.nativeElement.src = '';
    this.video.nativeElement.load();
  }

  newtab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

}

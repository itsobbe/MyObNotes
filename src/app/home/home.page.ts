import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public notes;
  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    console.log("init home");
  }

  ionViewWillEnter() {
    this.loadNotes();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async getNotes() {
    return await this.data.getRows("note");
  }

  async search(searchValue){
    await this.loadNotes();
    if (searchValue) {
      this.notes = this.notes.filter((item)=>{
        return (item.title.includes(searchValue) || item.message.includes(searchValue));
      });
    }
  }

  async loadNotes(){
    await this.getNotes().then(res => this.notes = res);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  public object: any;

  constructor(private data: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.object = {};
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.data.getObject("note", id).then(res => this.object = res);
  }

  async saveDetailForm() {
    if (this.object.title && this.object.message) {
      await this.data.saveObject("note", this.object);
      this.router.navigate(['']);
    } else {
      this.presentAlert('Campos requeridos no informados');
    }
  }

  async deleteObject() {
    if (this.object && this.object.id) {
      this.data.deleteObject("note", this.object.id).then(res => this.router.navigate(['']));
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  getBackButtonText() {
    return "";
  }

}

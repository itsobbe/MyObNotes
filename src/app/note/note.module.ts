import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NoteComponent],
  exports: [NoteComponent],
  imports: [
    CommonModule,RouterModule
  ]
})
export class NoteModule { }

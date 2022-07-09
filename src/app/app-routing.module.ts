import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'note/:id',
    loadChildren: () => import('./note/note-detail/note-detail.module').then( m => m.NoteDetailPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./note/note-detail/note-detail.module').then( m => m.NoteDetailPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'note-detail',
    loadChildren: () => import('./note/note-detail/note-detail.module').then( m => m.NoteDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

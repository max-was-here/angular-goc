import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableComponent } from './layout/observable/observable.component';

const routes: Routes = [
  {
    path: 'observable',
    component: ObservableComponent
  },
  {
    path: '**',
    redirectTo: '/observable'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

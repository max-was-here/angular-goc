import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableComponent } from './layout/observable/observable.component';
import { ReactiveComponent } from './layout/reactive/reactive.component';
import { SimpleComponent } from './layout/simple/simple.component';

const routes: Routes = [
  {
    path: 'observable',
    component: ObservableComponent
  },
  {
    path: 'simple',
    component: SimpleComponent
  },
  {
    path: 'reactive',
    component: ReactiveComponent
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

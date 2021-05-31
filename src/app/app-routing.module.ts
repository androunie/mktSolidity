import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FactoryComponent} from './factory/factory.component';
import {MetaSenderComponent} from './meta/meta-sender/meta-sender.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  { path: 'factory', component: FactoryComponent},
  { path: 'about', component: AboutComponent },
  { path: 'meta', component: MetaSenderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

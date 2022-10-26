import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConceptTreeComponent} from './concept-tree/concept-tree.component';

const routes: Routes = [
  { path: '', component: ConceptTreeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
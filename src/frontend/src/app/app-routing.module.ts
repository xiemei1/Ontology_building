import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleComponent } from './components/rule/rule.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { OthersComponent} from './components/others/others.component';
import {SenmanticComponent} from './components/senmantic/senmantic.component';
import { FastapiService} from './services/fastapi.service';
import { RelationsComponent } from './components/relations/relations.component';
import { VusualizationComponent } from './components/vusualization/vusualization.component';


const routes: Routes = [{
  path:'others',
  component: OthersComponent

},
{
  path:'rule',
  component: RuleComponent

},
{
  path:'statistic',
  component: StatisticComponent

},
{
  path:'senmantic',
  component: SenmanticComponent

},
{
  path:'relations',
  component: RelationsComponent 
  

},
{
  path:'visualization',
  component: VusualizationComponent

},
{
  path:'',
  redirectTo:'/others',
  pathMatch:'full',

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

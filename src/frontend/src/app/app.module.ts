import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SearchFilterPipe } from './components/grd-filter.pipe';
//import { Select } from 'antd';


import { RuleComponent } from './components/rule/rule.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { SenmanticComponent } from './components/senmantic/senmantic.component';
import { OthersComponent } from './components/others/others.component';
import { SelectorContext } from '@angular/compiler';
import { FastapiService} from './services/fastapi.service';
import { RelationsComponent } from './components/relations/relations.component';
import { VusualizationComponent } from './components/vusualization/vusualization.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { SimilarityMatrixComponent } from './components/similarity-matrix/similarity-matrix.component';
import { GraphComponent } from '../app/components/vusualization/graph/graph.component';
import { DetailsComponent } from './components/vusualization/details/details.component';
import { SearchComponent } from './components/vusualization/search/search.component';
import { ConceptTreeComponent } from './components/vusualization/concept-tree/concept-tree.component';
import { Visualisation1Component } from './components/visualisation1/visualisation1.component';
import { TopicVisComponent } from './components/visualisation1/topic-vis/topic-vis.component';
import { TopicBarComponent } from './visualisation1/topic-bar/topic-bar.component';
import { TopicVisBarComponent } from './components/visualisation1/topic-vis-bar/topic-vis-bar.component';
import { RelationGraphComponent } from './components/visualisation1/relation-graph/relation-graph.component';





registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RuleComponent,
    StatisticComponent,
    SenmanticComponent,
    OthersComponent,
    RelationsComponent,
    VusualizationComponent,
    BarChartComponent,
    SimilarityMatrixComponent,
    GraphComponent,
    DetailsComponent,
    SearchComponent,
    ConceptTreeComponent,
    SearchFilterPipe,
    Visualisation1Component,
    TopicVisComponent,
    TopicBarComponent,
    TopicVisBarComponent,
    RelationGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzDropDownModule,
    NzButtonModule,
    NzSelectModule,
    NzDividerModule
    //Select
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },FastapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

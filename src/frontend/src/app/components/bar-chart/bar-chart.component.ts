import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ViewEncapsulation, SimpleChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { StatsBarChart } from '../data';


@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
 

  private width!: number;
  private height!: number;
  private margin = {top:50 , right: 10, bottom: 60, left: 50};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() { }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
   }

 
  
  private initSvg() {
    this.svg = d3.select('#barchart');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(StatsBarChart.map((d: { name: any; }) => d.name));
    this.y.domain([0, d3Array.max(StatsBarChart, (d) => d.s)]);
}

private drawAxis() {
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x))
        .selectAll('text')
        .style('text-anchor','end')
        .attr('dx','-0.4em')
        .attr('dy','.15em')
        .attr('transform','rotate(-25)');
    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y).ticks(20))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');
    this.g.append("text")
    .attr("class", "title")
    .attr("x", this.width/2)
    .attr("y", 0 - (this.margin.top/6))
    .attr("text-anchor", "middle")
    .text("Angular Concept Statistics Anlayse")
    .style("font-size", "25px")
}

private drawBars() {
    this.g.selectAll('.bar')
        .data(StatsBarChart)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d: { name: any; }) => this.x(d.name) )
        .attr('y', (d: { s: any; }) => this.y(d.s) )
        .attr('width', this.x.bandwidth())
        .attr('height', (d: { s: any; }) => this.height - this.y(d.s) );
}

}

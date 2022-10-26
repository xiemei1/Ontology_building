import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as d3 from 'd3';
import {relations} from '../data1';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  title = 'D3 graph';

  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  radius:any;
  color: any;
  svg: any;
  simulation:any;
  link: any;
  node: any;
  graph:any;
  lables :any;
  

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.initSvg();
    
  }
  

  initSvg() {
    // use different svgs
    this.svg = d3.select('#graph');

    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    
    this.simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d: any) => d.id))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(this.width / 2.5, this.height / 1.5));
    this.render(relations);
  }
  ticked() {
    this.link
        .attr("x1", function(d: { source: { x: any; }; }) { return d.source.x; })
        .attr("y1", function(d: { source: { y: any; }; }) { return d.source.y; })
        .attr("x2", function(d: { target: { x: any; }; }) { return d.target.x; })
        .attr('y2', function(d: { target: { y: any; }; }) { return d.target.y; });

    this.node
        .attr("transform", function(d: { x: string; y: string; }) {
          return "translate(" + d.x + "," + d.y + ")";
        })

    this.lables
        .attr("x", function(d: { x: any; }) { return d.x; })
        .attr("y", function(d: { y: any; }) { return d.y; });
  }

  render(graph: { nodes: any; links: any;}){
    this.link = this.svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
      .style("stroke", "#ccc")
      .attr('stroke-width', function(d: { value: number; }) { return Math.sqrt(d.value); });
      

    const oldthis = this;
    this.node = this.svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle')
      .attr('r', 5)
      .attr('fill', (d: { group: any; })=> { return this.color(d.group); })
      .call(d3.drag()
      .on('start', function(event: any, d: any) {oldthis.dragstarted(event , d);})
      //.on("start", this.dragstarted)
      .on("drag", this.dragged))
      //.on("drag",function(event: any, d: any){oldthis.dragged(event , d);})
      //.on("drag",function(event: any, d: any){oldthis.dragended(event , d);}));
      .on("end", this.dragended);

    // this.lables = this.svg.append("g")
    //   .attr("class", "labels")
    //   .selectAll("text")
    //   .data(graph.nodes)
    //   .enter().append("text")
    //   .attr("dx", 12)
    //   .attr("dy", ".35em")
    //   .text(function(d: { id: any; }) { return d.id });
    
    this.lables = this.node.append("text")
      .data(graph.nodes)
      .enter().append('text')
      .attr('class','label')
      .attr('fill','red')
      .text(function(d: { id: any; }) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3)
       
    this.node.append('title')
       .text(function(d: { id: any; }) { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on('tick', ()=>{return this.ticked()});

    this.simulation.force('link')
      .links(graph.links);  
  }
  
  dragged(event: any,d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  dragended(event: any,d: any) {
    if (!event.active)
    this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  dragstarted(event: any,d: any) {
    if (!event.active) 
    this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
    
}

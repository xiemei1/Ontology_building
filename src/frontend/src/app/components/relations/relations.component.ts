import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as d3 from 'd3';
import { color} from 'd3';
import { relations } from '../data1';


@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {

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
 




  constructor(private httpclient: HttpClient) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    // this.httpclient.get("assets/relation.json").subscribe((data: any) =>{
    //   console.log(data);
    //   this.m = data;
    // })
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
    .force("charge", d3.forceManyBody().strength(-0.3))
    .force("center", d3.forceCenter(this.width/1.6, this.height/1.5));
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
         .attr('stroke-width', (d: { [x: string]: number; }) => Math.sqrt(d['value']))
        // .attr("stroke", (d: any)=> { return "#f50a0a"; })
         .style("stroke", function(d: any) {if (d.type == 'Verb'){return "#f50a16"}else{return '#1ef50a'} });
        

    const oldthis = this;
    this.node = this.svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle')
      .attr('r', 4.5)
      .attr('fill', (d: { group: any; })=> { return this.color(d.group); })
      .call(d3.drag()
         .on('start', function(event: any, d: any) {oldthis.dragstarted(event , d);})
         .on("drag", this.dragged)
         .on("end", this.dragended));
      
    //display label on the node
      //  .attr("fill",function(d: any,i: string){return color(i);})
      //     .attr("stroke-linecap", "round")
      //     .attr("stroke-linejoin", "round")
      //   .selectAll("g")
      //   .data(graph.nodes)
      //   .join("g")
      //     .call(d3.drag())
      //     .on('start',this.dragstarted)
      //     .on('drag',this.dragged)
      //     .on('end',this.dragended)

    // this.node.append("circle")
    //   .attr("stroke", "white")
    //   .attr("stroke-width", 1)
    //   .attr("r", 2);

   this.node.append("text")
      .attr("x", 16)
      .attr("y", "0.88em")
      .text((d: { id: any; }) => d.id)
    .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 12);
   
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
    this.simulation.alphaTarget(0.031).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
    
}

  
  
  
  
   


  

  



import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from "d3";
import *  as  dataJson from '..//..//person1.json';

@Component({
  selector: 'app-concept-tree',
  templateUrl: './concept-tree.component.html',
  styleUrls: ['./concept-tree.component.css']
})
export class ConceptTreeComponent implements OnInit {
  @ViewChild('chart', { static: true })
  private chartContainer!: ElementRef;
  data: any = (dataJson as any).default;
  
  title = 'd3tree';
  root: any;
  tree: any;
  treeLayout: any;
  svg: any;

  treeData: any;

  height: number | undefined;
  width: number | undefined;
  margin: any = { top: 2, bottom: 3, left:4, right: 4 };
  duration: number = 750;
  nodeWidth: number = 3;
  nodeHeight: number = 2;
  nodeRadius: number = 2;
  horizontalSeparationBetweenNodes: number = 2;
  verticalSeparationBetweenNodes: number = 2;
  nodeTextDistanceY: string = "-5px";
  nodeTextDistanceX: number = 5;

  dragStarted!: boolean;
  draggingNode: any;
  nodes!: any[];
  selectedNodeByDrag: any;

  selectedNodeByClick: any;
  previousClickedDomNode: any;
  links: any;

  graph:any;

  constructor() {

   }

  ngOnInit(): void {
    this.renderTreeChart();
  }

    renderTreeChart() {
    let element: any = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append("g")
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
      // declares a tree layout and assigns the size

      this.tree = d3.tree()
        .size([this.height, this.width])
        .nodeSize([this.nodeWidth + this.horizontalSeparationBetweenNodes, this.nodeHeight + this.verticalSeparationBetweenNodes])
        .separation((a, b) => { return a.parent == b.parent ? 2: 4 });
  
      // Assigns parent, children, height, depth
      this.root = d3.hierarchy(this.data, (d) => { return d.chilren; });
      this.root.x0 = this.height / 2;
      this.root.y0 = 2;
  
      // Collapse after the second level
      //this.root.children.forEach(collapse);
  
      this.updateChart(this.root);
  
      // function collapse(d) {
      //   if (d.children) {
      //       d._children = d.children;
      //       d._children.forEach(collapse);
      //       d.children = null;
      //   }
      // }
  
    }
  
    click = (d: { chilren: null; _chilren: null; }) => {
      console.log('click');
      if (d.chilren) {
        d._chilren = d.chilren;
        d.chilren = null;
      } else {
        d.chilren = d._chilren;
        d._chilren = null;
      }
      this.updateChart(d);
    }
  
    updateChart(source: { chilren?: null; _chilren?: null; y0?: any; x0?: any; y?: any; x?: any; }) {
      let i = 0;
      console.log(source);
      this.treeData = this.tree(this.root);
      this.nodes = this.treeData.descendants();
      this.links = this.treeData.descendants().slice(1);
      this.nodes.forEach((d) => { d.y = d.depth * 300 });
  
      let node = this.svg.selectAll('g.node')
        .data(this.nodes, (d: { id: number; }) => { return d.id || (d.id = ++i); });
  
      let nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => {
          return 'translate(' + source.y0 + ',' + source.x0 + ')';
        })
        .on('click', this.click);
  
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', (d: { _chilren: any; }) => {
          return d._chilren ? 'lightsteelblue' : '#fff';
        });
  
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', (d: { chilren: any; _chilren: any; }) => {
          return d.chilren || d._chilren ? -13 : 13;
        })
        .attr('text-anchor', (d: { chilren: any; _chilren: any; }) => {
          return d.chilren || d._chilren ? 'end' : 'start';
        })
        .style('font', '12px sans-serif')
        .text((d: { data: { name: any; }; }) => { return d.data.name; });
  
      let nodeUpdate = nodeEnter.merge(node);
  
      nodeUpdate.transition()
        .duration(this.duration)
        .attr('transform', (d: { y: string; x: string; }) => {
          return 'translate(' + d.y + ',' + d.x + ')';
        });
  
      nodeUpdate.select('circle.node')
        .attr('r', 1)
        .style('stroke-width', '3px')
        .style('stroke', 'steelblue')
        .style('fill', (d: { _chilren: any; }) => {
          return d._chilren ? 'lightsteelblue' : '#fff';
        })
        .attr('cursor', 'pointer');
  
      let nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr('transform', (d: any) => {
          return 'translate(' + source.y + ',' + source.x + ')';
        })
        .remove();
  
      nodeExit.select('circle')
        .attr('r', 1e-6);
  
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);
  
      let link = this.svg.selectAll('path.link')
        .data(this.links, (d: { id: any; }) => { return d.id; });
  
      let linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', '2px')
        .attr('d', function (d: any) {
          let o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });
  
      let linkUpdate = linkEnter.merge(link);
  
      linkUpdate.transition()
        .duration(this.duration)
        .attr('d', (d: { parent: any; }) => { return diagonal(d, d.parent); });
  
      let linkExit = link.exit().transition()
        .duration(this.duration)
        .attr('d', function (d: any) {
          let o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();
  
      this.nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
  
      function diagonal(s: { x?: any; y?: any; parent?: any; }, d: { x: any; y: any; }) {
        let path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`;
        return path;
      }
    }


  }


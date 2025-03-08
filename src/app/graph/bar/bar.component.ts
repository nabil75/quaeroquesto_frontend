import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})

export class BarComponent implements OnInit {

  @Input() result: any =[];
  
  constructor(
  ) {}

  // private data =[];
  private data: any=[];
  private svg: any;
  private marginBottom = 80;
  private marginLeft = 50;
  private width = 750 - (this.marginLeft * 2);
  private height = 500 - (this.marginBottom *2);

  ngOnInit(): void {
    this.getData();
    this.createSvg();
    this.drawBars(this.data);
  }

  private getData(){
    for(let i=0; i<this.result.labels.length; i++){
      this.data.push({"label":this.result.labels[i], "value": this.result.values[i]})
    }
  }

  private getMaxValue(){
    let maxValue = 0;
    for(let i=0; i<this.result.values.length; i++){
      if(this.result.values[i]>maxValue){
        maxValue = this.result.values[i]
      }
    }
    return maxValue;
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.marginLeft * 2))
      .attr("height", this.height + (this.marginBottom * 2))
      .call(this.responsivefy)
      .append("g")
      .attr("transform", "translate(" + this.marginLeft + "," + this.marginBottom + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(d3.sort(data, d => -d.frequency).map(d => d.label))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-20)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, this.getMaxValue()])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.label))
      .attr("y", (d: any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.value))
      .attr("fill", this.randColor());
  }

  randColor = () => {
    // return "#" + Math.floor(Math.random()*9777215).toString(16).padStart(6, '0').toUpperCase();
    return "hsl(" + 360 * Math.random() + ',' +
      (15 + 70 * Math.random()) + '%,' +
      (75 + 10 * Math.random()) + '%)'
  }

  responsivefy(svg:any) {
    // container will be the DOM element
    // that the svg is appended to
    // we then measure the container
    // and find its aspect ratio
    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;
   
    // set viewBox attribute to the initial size
    // control scaling with preserveAspectRatio
    // resize svg on inital page load
    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);
   
    // add a listener so the chart will be resized
    // when the window resizes
    // multiple listeners for the same event type
    // requires a namespace, i.e., 'click.foo'
    // api docs: https://goo.gl/F3ZCFr
    d3.select(window).on(
        'resize.' + container.attr('id'), 
        resize
    );
   
    // this is the code that resizes the chart
    // it will be called on load
    // and in response to window resizes
    // gets the width of the container
    // and resizes the svg to fill it
    // while maintaining a consistent aspect ratio
    function resize() {
        const w = parseInt(container.style('width'));
        svg.attr('width', w);
        svg.attr('height', Math.round(w / aspect));
    }
  }

}

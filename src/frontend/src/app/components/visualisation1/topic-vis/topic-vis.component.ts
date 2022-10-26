import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-topic-vis',
  templateUrl: './topic-vis.component.html',
  styleUrls: ['./topic-vis.component.css']
})
export class TopicVisComponent implements OnInit {
  
 
  chart: any;
  k :any; // number of topics
  R:any;// number of terms to display in bar chart
  mdsData:any; // (x,y) locations and topic proportions
  mdsData3: any; // topic proportions for all terms in the viz
  lamData: any; // all terms that are among the top-R most relevant for all topics, lambda values
  lambda = {
      old: 1,
      current: 1
  };
  color1 = "#1f77b4"; // baseline color for default topic circles and overall term frequencies
  color2 = "#d62728"; // 'highlight' color for selected topics and term-topic frequencies

// Set the duration of each half of the transition:
 duration=750;
 // Set global margins used for everything
  margin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 30
};
  
  mdswidth = (this.width-100)/2; //was: 530,
  mdsheight = 530;
  barwidth = (this.width-100)/2; //was: 530,
  barheight = 530;
  termwidth = 90;// width to add between two panels to display terms
  mdsarea = mdsheight * mdswidth;
// controls how big the maximum circle can be
// doesn't depend on data, only on mds width and height:
  rMax = 60*this.width/530; // was: 60;

// proportion of area of MDS plot to which the sum of default topic circle areas is set
 circle_prop = 0.25;
 word_prop = 0.25;

// opacity of topic circles:
  base_opacity = 0.2;
  highlight_opacity = 0.6;

// topic/lambda selection names are specific to *this* vis
 topic_select = to_select + "-topic";
 lambda_select = to_select + "-lambda";

// get rid of the # in the to_select (useful) for setting ID values
 visID = to_select.replace("#", "");
 topicID = visID + "-topic";
 lambdaID = visID + "-lambda";
 termID = visID + "-term";
 topicDown = topicID + "-down";
 topicUp = topicID + "-up";
 topicClear = topicID + "-clear";

 leftPanelID = visID + "-leftpanel";
 barFreqsID = visID + "-bar-freqs";
 topID = visID + "-top";
 lambdaInputID = visID + "-lambdaInput";
 lambdaZeroID = visID + "-lambdaZero";
 sliderDivID = visID + "-sliderdiv";
 lambdaLabelID = visID + "-lamlabel";

  constructor() { }

  ngOnInit(): void {
  }

  // sort array according to a specified object key name
    // Note that default is decreasing sort, set decreasing = -1 for increasing
    // adpated from http://stackoverflow.com/questions/16648076/sort-array-on-key-value
     fancysort(key_name: string | number, decreasing: number) {
      decreasing = (typeof decreasing === "undefined") ? 1 : decreasing;
      return function(a: { [x: string]: number; }, b: { [x: string]: number; }) {
          if (a[key_name] < b[key_name])
              return 1 * decreasing;
          if (a[key_name] > b[key_name])
              return -1 * decreasing;
          return 0;
      };
  }

  // sort array according to a specified object key name
    // Note that default is decreasing sort, set decreasing = -1 for increasing
    // adpated from http://stackoverflow.com/questions/16648076/sort-array-on-key-value
    visualize(data: { [x: string]: { [x: string]: any[]; }; }) {

      // set the number of topics to global variable K:
      const K = data['mdsDat'].x.length;

      // R is the number of top relevant (or salient) words whose bars we display
      this.R = Math.min(data['R'], 30);

      // a (K x 5) matrix with columns x, y, topics, Freq, cluster (where x and y are locations for left panel)
      this.mdsData = [];
      for (var i = 0; i < K; i++) {
          var obj = {};
          for (var key in data['mdsDat']) {
              obj[key] = data['mdsDat'][key][i];
          }
          this.mdsData.push(obj);
      }
  }

}

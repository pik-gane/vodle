import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-pollstats',
  templateUrl: './pollstats.page.html',
  styleUrls: ['./pollstats.page.scss'],
})
export class PollstatsPage implements OnInit {

  @ViewChild('chartCanvas') chartCanvas;
  chart: any;

  constructor(public g: GlobalService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.makeChart();    
  }
  makeChart() {
    let p = this.g.openpoll,
        hall = [],
        participation = [],
        maxsupport = [],
        consensus = [],
        minsupport = [],
        minx = 1e100,
        maxx = -1e100;
    for (let h of p.histories) {
      hall = hall.concat(h);
    }
    GlobalService.log("history:" + JSON.stringify(hall));
    hall.sort((d, e) => d[0] - e[0]);
    for (let d of hall) {
      let x = d[0];
      if (x<minx) minx=x;
      if (x>maxx) maxx=x;
      participation.push({'x':x,'y':d[2]});
      maxsupport.push({'x':x,'y':d[3]});
      consensus.push({'x':x,'y':d[4]});
      minsupport.push({'x':x,'y':d[5]});
    }
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
          datasets: [
            {
              label: 'participation',
              fill: false,
              borderColor: 'black',
              data: participation,
            },
            {
              label: 'max. support',
              fill: false,
              borderColor: 'grey',
              data: maxsupport,
            },
            {
              label: 'consensus',
              borderColor: 'green',
              fill: false,
              data: consensus,
            },
            {
              label: 'min. support',
              fill: false,
              borderColor: 'grey',
              data: minsupport,
            }
          ]
      },
      options: {
        elements: {
          line: {
              tension: 0
          }
        },
          animation: {
            duration: 0, // general animation time
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom',
              gridLines: {
                display: false
              },
              ticks: {
                min:minx,
                max:maxx,
                display:false
              }
            }],
            yAxes: [{
                ticks: {
                  min:0,
                  max:1,
                  stepSize:1
                }
            }]
        }
      }
    });
  }

}

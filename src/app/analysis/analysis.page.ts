/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import * as venn from 'venn.js'
import * as d3 from 'd3'

import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  

const svgcolors = {
  "vodlered": "#d33939",
  "vodleblue": "#3465a4",
  "vodlegreen": "#62a73b",
  "vodledarkgreen": "#4c822e"
  },
  r_avatar = 7;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {

  @Input() P: PollPage;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  Array = Array;
  Math = Math;
  Object = Object;
  window = window;
  document = document;
  environment = environment;
  JSON = JSON;

  page = "analysis";

  // LIFECYCLE:

  constructor(
      public translate: TranslateService,
      private modalController: ModalController,
      public G: GlobalService) {
    this.G.L.entry("AnalysisPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("AnalysisPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("AnalysisPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("AnalysisPage.ionViewDidEnter");
    this.show_venn();
  }

  onDataReady() {
    this.G.L.entry("AnalysisPage.onDataReady");
  }

  onDataChange() {
    this.G.L.entry("AnalysisPage.onDataChange");
  }

  ionViewWillLeave() {
    this.G.L.entry("AnalysisPage.ionViewWillLeave");
  }

  ionViewDidLeave() {
    this.G.L.entry("AnalysisPage.ionViewDidLeave");
  }

  // UI:

  close() {
    this.modalController.dismiss();
  }

  // logics:

  show_venn() {
    // 1. filter oids with positive share in descending score order (at most 10 many):
    const T = this.P.p.T,
          shares_map = T.shares_map,
          our_oids = [],
          colors = [];
    for (const [i, oid] of T.oids_descending.entries()) {
      if (i == 10) {
        break;
      }
      if (shares_map.has(oid) && shares_map.get(oid) > 0) {
        our_oids.push(oid);
        // set to same color as slider:
        colors.push(this.P.slidercolor[oid]);
      }
    }
    this.G.L.info("colors", colors, svgcolors[colors[0]]);
    // 2. count how many approve each possible exact combination:
    const exact_combi_counts= {},
          approvals_map = T.approvals_map,
          chars = "abcdefghij";
    for (const vid of this.P.p.T.all_vids_set) {
      let combi = "";
      for (const [i, oid] of our_oids.entries()) {
        const amo = approvals_map.get(oid);
        if (amo.has(vid) && amo.get(vid)) {
          combi += chars[i];
        }
      }
      if (combi in exact_combi_counts) {
        exact_combi_counts[combi] += 1;
      } else {
        exact_combi_counts[combi] = 1;
      }
    }
    this.G.L.info("exact_combi_counts", exact_combi_counts);
    // 3. count how many approve at least each possible combination:
    const subset_counts = {};
    for (const [combi, size] of Object.entries(exact_combi_counts)) {
      const l = combi.length, n_subsets = 1 << l;
      for (let mask = 1; mask < n_subsets; mask++) {
        let subset = "";
        for (let i = 0; i < l; i++) {
          if( (mask & (1 << i)) !== 0){
            subset += combi[i];
          }
        }
        if (subset in subset_counts) {
          subset_counts[subset] += size;
        } else {
          subset_counts[subset] = size;
        }  
      }      
    }
    this.G.L.info("subset_counts", subset_counts);
    // 4. convert to array of objects of arrays as needed by venn.js:
    const sets_array = [],
          n_not_abstaining = T.n_not_abstaining; 
    for (const [i, oid] of our_oids.entries()) {
      sets_array.push({ 
          sets: [chars[i]], 
          size: subset_counts[chars[i]], 
          label: this.P.p.options[oid].name // + ": " + (shares_map.get(oid) * 100).toFixed(1) + "%" 
        });
    }
    for (const [subset, size] of Object.entries(subset_counts)) {
      if (subset.length > 1) {
        sets_array.push({ sets: [...subset], size: size });
      }
    }
    sets_array.reverse(); // so that topmost option is painted last
    // 5. paint the diagram:
    const div = d3.select("#venn"),
          div_bbox = div.node().getBoundingClientRect(),
          div_width = div_bbox.width;
    var chart = venn.VennDiagram().width(div_width).height(.9*div_width);
    d3.select("#venn").datum(sets_array).call(chart);
    d3.selectAll("#venn .venn-circle path")
    // lower options appear successively paler:
    .style("fill-opacity", 0)
    .style("fill", function(d, i) { return svgcolors[colors[our_oids.length - 1 - i]]; })
    .style("stroke-width", 1)
    .style("stroke-opacity", 0)
    .style("stroke", "white");
    d3.selectAll("#venn .venn-circle text")
    .style("fill", "white")
    .style("fill-opacity", 0)
    .style("stroke-width", 0)
    .style("font-size", "14px")
    .style("font-style", "italic")
    .style("font-weight", "bold");
    // 6. add voter avatars at random positions:
    const circle_data = [], svg = d3.select("#venn > svg"), svg_gs = [];
    for (const [i, oid] of our_oids.entries()) {
      const svg_g0 = d3.select('g[data-venn-sets="'+chars[i]+'"]'),
            svg_circle = svg_g0.select('path'),
            bbox = svg_circle.node().getBBox(),
            R = bbox.width / 2,
            cx = bbox.x + R,
            cy = bbox.y + R,
            n = n_not_abstaining <= 100 
                ? T.n_votes_map.get(oid)
                : Math.round(T.shares_map.get(oid) * 100),
            svg_g = svg.append("g"),
            positions = [];
      let fine = false;
      circle_data.push({cx:cx, cy:cy, R:R});
      svg_gs.push(svg_g);
      // put individual voters on that disc:
      for (let k=0; k<n; k++) {
        var x, y;
        // find a valid place:
        for (let it=0; it<100; it++) {
          // draw a random point on that disc:
          const r = (R - 1.5*r_avatar) * Math.sqrt(Math.random()),
                phi = 2 * Math.PI * Math.random();
          x = cx + r * Math.sin(phi);
          y = cy + r * Math.cos(phi);
          // check whether it is not overlapping an earlier dot:
          fine = true;
          for (let j=0; j<k; j++) {
            const pos = positions[j],
                  d2 = (x - pos.x)**2 + (y - pos.y)**2;
            if (d2 < (3*r_avatar)**2) {
              fine = false;
              break;
            }
          }
          if (fine) {
            // check whether it is outside all earlier discs:
            for (let j=0; j<i; j++) {
              const c = circle_data[j],
                    d2 = (x - c.cx)**2 + (y - c.cy)**2;
              if (d2 < (c.R + 1.5*r_avatar)**2) {
                fine = false;
                break;
              }
            }
          }
          if (fine) break;
        }
        positions.push([x, y]);
        if (fine) {
        // draw the avatar:
        svg_g.append("circle")
          .style("stroke", "black")
          .style("stroke-opacity", 0)
          .style("fill", "black")
          .style("fill-opacity", 0)
          .attr("r", r_avatar)
          .attr("cx", x)
          .attr("cy", y);
        }
      }
    }
    // finally place labels on top and fade in:
    for (const [i, oid] of our_oids.entries()) {
      const svg_g0 = d3.select('g[data-venn-sets="'+chars[i]+'"]'),
            svg_circle = svg_g0.select('path'),
            svg_text = svg_g0.select('text'),
            svg_g = svg_gs[i];
      // move label to front:
      svg.append(() => svg_text.node());
      const cloned_text = svg_text.clone(true);
      svg_text.style("stroke-width", 2).style("stroke", "black").style("stroke-opacity", 0);
      // fade in:
      svg_circle.transition().duration(2000).delay(1000*i)
        .style("fill-opacity", .95 - .05 * i)
        .style("stroke-opacity", 1);
      svg_text.transition().duration(2000).delay(1000*i)
        .style("stroke-opacity", 0.75);
      cloned_text.transition().duration(2000).delay(1000*i)
        .style("fill-opacity", 1);
      svg_g.selectAll("circle").transition().duration(2000).delay(1000*i)
        .style("fill-opacity", 0.3);
    }
  }
}

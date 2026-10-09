import {
  Host,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-segment-content.entry.js
var segmentContentCss, SegmentContent;
var init_ion_segment_content_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-segment-content.entry.js"() {
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    segmentContentCss = () => `:host{scroll-snap-align:center;scroll-snap-stop:always;-ms-flex-negative:0;flex-shrink:0;width:100%;min-height:1px;overflow-y:scroll;scrollbar-width:none;-ms-overflow-style:none;}:host::-webkit-scrollbar{display:none}`;
    SegmentContent = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      render() {
        return h(Host, { key: "b03079d7cfd78724828a4f42d7a7030457682b25" }, h("slot", { key: "c4c86280e5e577ee31a181758fea27a788fd87fa" }));
      }
    };
    SegmentContent.style = segmentContentCss();
  }
});
init_ion_segment_content_entry();
export {
  SegmentContent as ion_segment_content
};
//# debugId=8113a966-094b-52aa-afca-b10e157e44bb
//# sourceMappingURL=chunk-BO6CMQEG.js.map

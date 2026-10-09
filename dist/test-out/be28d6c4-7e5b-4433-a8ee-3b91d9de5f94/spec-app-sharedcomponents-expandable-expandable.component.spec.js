import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import "./chunk-PKPTYHZH.js";

// src/app/sharedcomponents/expandable/expandable.component.spec.ts
init_testing();

// src/app/sharedcomponents/expandable/expandable.component.ts
init_tslib_es6();

// angular:jit:template:src/app/sharedcomponents/expandable/expandable.component.html
var expandable_component_default = `<div #expandWrapper class='expand-wrapper' [class.collapsed]="!expanded">
  <ng-content></ng-content>
</div>`;

// angular:jit:style:src/app/sharedcomponents/expandable/expandable.component.scss
var expandable_component_default2 = "/* src/app/sharedcomponents/expandable/expandable.component.scss */\napp-expandable .expand-wrapper {\n  transition: height 1s ease;\n}\napp-expandable .collapsed {\n  display: none;\n  height: 0 !important;\n}\n/*# sourceMappingURL=expandable.component.css.map */\n";

// src/app/sharedcomponents/expandable/expandable.component.ts
init_core();
var ExpandableComponent = class ExpandableComponent2 {
  constructor(renderer) {
    this.renderer = renderer;
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "height", this.expandHeight + "px");
  }
  ngOnInit() {
  }
  static {
    this.ctorParameters = () => [
      { type: Renderer2 }
    ];
  }
  static {
    this.propDecorators = {
      expandWrapper: [{ type: ViewChild, args: ["expandWrapper", { read: ElementRef }] }],
      expanded: [{ type: Input, args: ["expanded"] }],
      expandHeight: [{ type: Input, args: ["expandHeight"] }]
    };
  }
};
ExpandableComponent = __decorate([
  Component({
    selector: "app-expandable",
    template: expandable_component_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [expandable_component_default2]
  })
], ExpandableComponent);

// src/app/sharedcomponents/expandable/expandable.component.spec.ts
describe("ExpandableComponent", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandableComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=ebd6873f-af12-5ddd-879f-f3b4b6aadb79
//# sourceMappingURL=spec-app-sharedcomponents-expandable-expandable.component.spec.js.map

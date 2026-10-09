import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/cubic-bezier-hHmYLOfE.js
var getTimeGivenProgression, solveCubicParametricEquation, solveCubicBezier, solveQuadraticEquation, solveCubicEquation;
var init_cubic_bezier_hHmYLOfE = __esm({
  "node_modules/@ionic/core/dist/esm/cubic-bezier-hHmYLOfE.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getTimeGivenProgression = (p0, p1, p2, p3, progression) => {
      return solveCubicBezier(p0[1], p1[1], p2[1], p3[1], progression).map((tValue) => {
        return solveCubicParametricEquation(p0[0], p1[0], p2[0], p3[0], tValue);
      });
    };
    solveCubicParametricEquation = (p0, p1, p2, p3, t) => {
      const partA = 3 * p1 * Math.pow(t - 1, 2);
      const partB = -3 * p2 * t + 3 * p2 + p3 * t;
      const partC = p0 * Math.pow(t - 1, 3);
      return t * (partA + t * partB) - partC;
    };
    solveCubicBezier = (p0, p1, p2, p3, refPoint) => {
      p0 -= refPoint;
      p1 -= refPoint;
      p2 -= refPoint;
      p3 -= refPoint;
      const roots = solveCubicEquation(p3 - 3 * p2 + 3 * p1 - p0, 3 * p2 - 6 * p1 + 3 * p0, 3 * p1 - 3 * p0, p0);
      return roots.filter((root) => root >= 0 && root <= 1);
    };
    solveQuadraticEquation = (a, b, c) => {
      const discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
        return [];
      } else {
        return [(-b + Math.sqrt(discriminant)) / (2 * a), (-b - Math.sqrt(discriminant)) / (2 * a)];
      }
    };
    solveCubicEquation = (a, b, c, d) => {
      if (a === 0) {
        return solveQuadraticEquation(b, c, d);
      }
      b /= a;
      c /= a;
      d /= a;
      const p = (3 * c - b * b) / 3;
      const q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
      if (p === 0) {
        return [Math.pow(-q, 1 / 3)];
      } else if (q === 0) {
        return [Math.sqrt(-p), -Math.sqrt(-p)];
      }
      const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
      if (discriminant === 0) {
        return [Math.pow(q / 2, 1 / 2) - b / 3];
      } else if (discriminant > 0) {
        return [
          Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow(q / 2 + Math.sqrt(discriminant), 1 / 3) - b / 3
        ];
      }
      const r = Math.sqrt(Math.pow(-(p / 3), 3));
      const phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
      const s = 2 * Math.pow(r, 1 / 3);
      return [
        s * Math.cos(phi / 3) - b / 3,
        s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
        s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
      ];
    };
  }
});

export {
  getTimeGivenProgression,
  init_cubic_bezier_hHmYLOfE
};
//# debugId=b5c61731-db4d-5af2-a5d1-e6a24a4dd4ab
//# sourceMappingURL=chunk-HMW3MSDJ.js.map

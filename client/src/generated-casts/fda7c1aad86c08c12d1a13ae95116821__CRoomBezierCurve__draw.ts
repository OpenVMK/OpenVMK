// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomBezierCurve / draw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function draw(_me: LingoMe, _this: LingoValue, a_rImage: LingoValue, a_iSteps: LingoValue) {
  if (lingoBinary("eq", a_iSteps, undefined)) {
  a_iSteps = 10;
  }

  var t_fStep = lingoBinary("div", float(1), a_iSteps);
  var t_iCount = lingoBinary("div", meProp(_me, "m_ar_vCurve").count, 3);
  var pt1 = callNamed("point", 0, 0);
  var pt2 = callNamed("point", 0, 0);
  for (var i = 0; i <= lingoBinary("sub", t_iCount, 1); ++i) {
  var t_fTime = float(0);
  var t_vA = meProp(_me, "m_ar_vCurve")[lingoBinary("add", lingoBinary("mul", i, 3), 1)];
  var t_vB = meProp(_me, "m_ar_vCurve")[lingoBinary("add", lingoBinary("mul", i, 3), 2)];
  var t_vC = meProp(_me, "m_ar_vCurve")[lingoBinary("add", lingoBinary("mul", i, 3), 3)];
  for (var j = 1; j <= a_iSteps; ++j) {
  var v = callMethod("_Interpolate", _this, t_vA, t_vB, t_vC, t_fTime);
  setThePropOf(pt1, "locH", v.x);
  setThePropOf(pt1, "locV", v.y);
  v = callMethod("_Interpolate", _this, t_vA, t_vB, t_vC, lingoBinary("add", t_fTime, t_fStep));
  setThePropOf(pt2, "locH", v.x);
  setThePropOf(pt2, "locV", v.y);
  callMethod("draw", a_rImage, pt1, pt2, callNamed("rgb", 255, 0, 0))
  t_fTime = lingoBinary("add", t_fTime, t_fStep);
  }

  var t_rProps = new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", 0, 255, 0)]);
  callMethod("draw", a_rImage, callNamed("rect", lingoBinary("sub", t_vA.x, 2), lingoBinary("sub", t_vA.y, 2), lingoBinary("add", t_vA.x, 2), lingoBinary("add", t_vA.y, 2)), t_rProps)
  callMethod("draw", a_rImage, callNamed("rect", lingoBinary("sub", t_vB.x, 2), lingoBinary("sub", t_vB.y, 2), lingoBinary("add", t_vB.x, 2), lingoBinary("add", t_vB.y, 2)), t_rProps)
  callMethod("draw", a_rImage, callNamed("rect", lingoBinary("sub", t_vC.x, 2), lingoBinary("sub", t_vC.y, 2), lingoBinary("add", t_vC.x, 2), lingoBinary("add", t_vC.y, 2)), t_rProps)
  }

}


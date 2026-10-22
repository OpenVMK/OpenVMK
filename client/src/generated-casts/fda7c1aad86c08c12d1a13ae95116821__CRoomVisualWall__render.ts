// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualWall / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  if (callMethod("PointInside", _this, theProperty("mouseLoc"))) {
  var t_rRGB = callNamed("rgb", 255, 0, 0);
  } else {
  t_rRGB = callNamed("rgb", 200, 200, 200);
  }

  if (callNamed("objectp", a_rObj)) {
  var t_rObj = a_rObj;
  } else {
  t_rObj = callMethod("getObject", _this);
  }

  var t_veAbs = callMethod("GetAbsPos", t_rObj);
  var t_veOff = callMethod("GetScrPos", callMethod("GetContext", t_rObj));
  var t_iXD = callNamed("integer", callMethod("GetParam", t_rObj, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", t_rObj, "YD"));
  var t_iZD = callNamed("integer", callMethod("GetParam", t_rObj, "ZD"));
  if (lingoBinary("lt", t_iXD, t_iYD)) {
  var t_veA = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_veAbs, callNamed("vector", 0, t_iYD, t_iZD))));
  var t_veB = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_veAbs, callNamed("vector", 0, 0, t_iZD))));
  var t_veC = lingoBinary("add", t_veOff, callNamed("AbsToScr", t_veAbs));
  var t_veD = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_veAbs, callNamed("vector", 0, t_iYD, 0))));
  } else {
  t_veA = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_veAbs, callNamed("vector", 0, 0, t_iZD))));
  t_veB = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_veAbs, callNamed("vector", t_iXD, 0, t_iZD))));
  t_veC = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_veAbs, callNamed("vector", t_iXD, 0, 0))));
  t_veD = lingoBinary("add", t_veOff, callNamed("AbsToScr", t_veAbs));
  }

  var t_ptA = callNamed("point", t_veA.x, t_veA.y);
  var t_ptB = callNamed("point", t_veB.x, t_veB.y);
  var t_ptC = callNamed("point", t_veC.x, t_veC.y);
  var t_ptD = callNamed("point", t_veD.x, t_veD.y);
  var t_rBuffer = theProperty("stage").image;
  callMethod("draw", t_rBuffer, t_ptA, t_ptB, t_rRGB)
  callMethod("draw", t_rBuffer, t_ptB, t_ptC, t_rRGB)
  callMethod("draw", t_rBuffer, t_ptC, t_ptD, t_rRGB)
  callMethod("draw", t_rBuffer, t_ptD, t_ptA, t_rRGB)
  for (var i = 1; i <= callMethod("GetCount", t_rObj); ++i) {
  var t_rHole = t_rObj[i];
  if (lingoBinary("eq", callMethod("GetParam", t_rHole, "CLASS"), "hole")) {
  callMethod("render", _this, t_rHole)
  }

  }

}


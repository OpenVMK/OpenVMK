// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualWall / PointInside

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PointInside(_me: LingoMe, _this: LingoValue, a_ptPoint: LingoValue, a_rObj: LingoValue) {
  if (callNamed("voidp", a_rObj)) {
  var t_rObj = callMethod("getObject", _this);
  } else {
  t_rObj = a_rObj;
  }

  var t_vePos = callMethod("GetAbsPos", t_rObj);
  var t_veOff = callMethod("GetScrPos", callMethod("GetContext", t_rObj));
  var t_iXD = callNamed("integer", callMethod("GetParam", t_rObj, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", t_rObj, "YD"));
  var t_iZD = callNamed("integer", callMethod("GetParam", t_rObj, "ZD"));
  if (lingoBinary("lt", t_iXD, t_iYD)) {
  var t_veA = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, t_iYD, t_iZD))));
  var t_veB = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, 0, t_iZD))));
  var t_veC = lingoBinary("add", t_veOff, callNamed("AbsToScr", t_vePos));
  var t_veD = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, t_iYD, 0))));
  } else {
  t_veA = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, 0, t_iZD))));
  t_veB = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", t_iXD, 0, t_iZD))));
  t_veC = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", t_iXD, 0, 0))));
  t_veD = lingoBinary("add", t_veOff, callNamed("AbsToScr", t_vePos));
  }

  var t_ptA = callNamed("point", t_veA.x, t_veA.y);
  var t_ptB = callNamed("point", t_veB.x, t_veB.y);
  var t_ptC = callNamed("point", t_veC.x, t_veC.y);
  var t_ptD = callNamed("point", t_veD.x, t_veD.y);
  if ((lingoTruthy(callNamed("PntInsideTri", a_ptPoint, t_ptA, t_ptB, t_ptC)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("PntInsideTri", a_ptPoint, t_ptA, t_ptC, t_ptD)) ? 0 : 1)) {
  return 0;
  }

  }

  var t_iCnt = callMethod("GetCount", t_rObj);
  for (var i = 1; i <= t_iCnt; ++i) {
  var t_rChild = t_rObj[i];
  if (lingoBinary("eq", callMethod("GetParam", t_rChild, "CLASS"), "hole")) {
  if (callMethod("PointInside", _this, a_ptPoint, t_rChild)) {
  return 0;
  }

  }

  }

  return 1;
}


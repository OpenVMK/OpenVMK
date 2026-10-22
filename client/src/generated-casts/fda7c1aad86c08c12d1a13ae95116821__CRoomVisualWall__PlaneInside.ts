// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualWall / PlaneInside

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaneInside(_me: LingoMe, _this: LingoValue, a_pPlane: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_rcPlane = callMethod("_PlaneToRect", _this, a_pPlane);
  var t_rcWall = callMethod("_PlaneToRect", _this, t_rObj);
  if (lingoBinary("neq", callNamed("union", t_rcWall, t_rcPlane), t_rcWall)) {
  return 0;
  }

  var t_iCnt = callMethod("GetCount", t_rObj);
  for (var i = 1; i <= t_iCnt; ++i) {
  var t_rChild = t_rObj[i];
  if (lingoBinary("eq", callMethod("GetParam", t_rChild, "CLASS"), "hole")) {
  var t_rcHole = callMethod("_PlaneToRect", _this, t_rChild);
  var t_rcGap = callNamed("intersect", t_rcHole, t_rcPlane);
  if (lingoBinary("or", lingoBinary("neq", t_rcGap.width, 0), lingoBinary("neq", t_rcGap.height, 0))) {
  return 0;
  }

  }

  }

  return 1;
}


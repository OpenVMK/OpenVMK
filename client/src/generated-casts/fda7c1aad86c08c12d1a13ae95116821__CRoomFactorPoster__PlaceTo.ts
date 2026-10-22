// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPoster / PlaceTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaceTo(_me: LingoMe, _this: LingoValue, a_rWall: LingoValue, a_veRel: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  callMethod("RemChild", callMethod("GetOwner", t_rObj), callMethod("GetKey", t_rObj))
  callMethod("SetChild", a_rWall, callMethod("GetKey", t_rObj), t_rObj)
  callMethod("SetOwner", t_rObj, a_rWall)
  var t_iXD = callNamed("integer", callMethod("GetParam", a_rWall, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", a_rWall, "YD"));
  if (lingoBinary("gt", t_iXD, t_iYD)) {
  var t_iDir = 5;
  callMethod("SetParam", t_rObj, "DIR", "5")
  } else {
  t_iDir = 3;
  callMethod("SetParam", t_rObj, "DIR", "3")
  }

  if (lingoBinary("eq", t_iDir, 3)) {
  setThePropOf(a_veRel, "x", 0);
  } else {
  setThePropOf(a_veRel, "y", 0);
  }

  callMethod("SetRelPos", t_rObj, a_veRel)
  callMethod("_Rotate", _this, t_iDir)
  callMethod("SetBlend", callMethod("GetVisual", t_rObj), 100)
  return 1;
}


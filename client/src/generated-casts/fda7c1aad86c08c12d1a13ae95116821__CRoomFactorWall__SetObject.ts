// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorWall / SetObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetObject(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  callNamed("callAncestor", symbol("SetObject"), _this, a_rObj)
  var t_iXD = callNamed("integer", callMethod("GetParam", a_rObj, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", a_rObj, "YD"));
  if (lingoBinary("lt", t_iXD, t_iYD)) {
  callMethod("SetParam", a_rObj, "DIR", "3")
  } else {
  callMethod("SetParam", a_rObj, "DIR", "5")
  }

}


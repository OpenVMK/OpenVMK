// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / Unselect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Unselect(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bteleport")) {
  var t_ar_vParams = callMethod("GetParam", callMethod("getObject", _this), "PARAMS");
  if (callNamed("ilk", t_ar_vParams, symbol("list"))) {
  callNamed("executeMessage", "teleport_unselected", t_ar_vParams[2])
  }

  }

}


// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / TeleportUnSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeleportUnSelected(_me: LingoMe, _this: LingoValue, a_iOtherID: LingoValue) {
  var t_ar_vParams = callMethod("GetParam", callMethod("getObject", _this), "PARAMS");
  if (callNamed("ilk", t_ar_vParams, symbol("list"))) {
  if (lingoBinary("eq", a_iOtherID, t_ar_vParams[3])) {
  callMethod("SetCustomHighlighters", callMethod("GetVisual", callMethod("getObject", _this)), 0)
  }

  }

}


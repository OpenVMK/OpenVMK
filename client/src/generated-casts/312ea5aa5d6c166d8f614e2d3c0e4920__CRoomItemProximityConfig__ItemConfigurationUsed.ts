// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemProximityConfig / ItemConfigurationUsed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ItemConfigurationUsed(_me: LingoMe, t_iRef: LingoValue, t_iStatus: LingoValue, a_ar_Params: LingoValue) {
  var t_sText = lingoBinary("joinPad", lingoBinary("joinPad", t_iRef, t_iStatus), a_ar_Params._string);
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "item_configuration_used", 1, 1);
  callMethod("setText", t, t_sText, "Item Configuration Used", "OK")
  callMethod("show", t)
}


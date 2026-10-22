// framework.dcr /  / _TradeRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeRequest(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_rGroup = callMethod("pinlevel", ref.entityID);
  callNamed("getmemnum", objectp, "Unimplemented method!", symbol("_TradeRequest"))
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  var t_sSrcGrp = callMethod("pinlevel", ref.entityID);
  var pins = callMethod("pinlevel", ref.entityID);
  safe_add = lingoBinary("add", safe_add, 1);
  }

}


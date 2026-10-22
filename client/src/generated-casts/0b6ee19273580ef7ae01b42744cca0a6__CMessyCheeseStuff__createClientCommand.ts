// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / createClientCommand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createClientCommand(_me: LingoMe, t_ar_Params: LingoValue, t_ar_msgDesc: LingoValue) {
  var t_ar_out = new LingoPropList([]);
  for (var t = 1; t <= t_ar_msgDesc.count; ++t) {
  var t_symProp = callMethod("getPropAt", t_ar_msgDesc, t);
  var t_symValue = t_ar_msgDesc[t];
  switch (t_symProp) {
case symbol("int"):
  callMethod("addProp", t_ar_out, t_symProp, t_ar_Params[t])
  break;
case symbol("str"):
  callMethod("addProp", t_ar_out, t_symProp, t_ar_Params[t])
  break;
case symbol("canned"):
  var tCannedBlock = callNamed("TransformCannedToMsg", t_ar_Params[t], 1);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", t_ar_out, tKey, tvalue)
  }

  break;
case symbol("Array"):
  var t_ar_append = callMethod("createClientCommand", _me, t_ar_Params[t], t_symValue);
  for (var t_iCounter = 1; t_iCounter <= t_ar_append.count; ++t_iCounter) {
  var t_rAppendProp = callMethod("getPropAt", t_ar_append, t_iCounter);
  var t_rAppendValue = t_ar_append[t_iCounter];
  callMethod("addProp", t_ar_out, t_rAppendProp, t_rAppendValue)
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Could not append unknown prop-type", t_symProp))
  }

  }

  return t_ar_out;
}


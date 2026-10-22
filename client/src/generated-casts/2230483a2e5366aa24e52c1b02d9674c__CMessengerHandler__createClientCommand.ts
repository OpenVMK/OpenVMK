// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / createClientCommand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createClientCommand(_me: LingoMe, t_ar_Params: LingoValue, t_ar_msgDesc: LingoValue) {
  var t_ar_out = callNamed("propList");
  for (var t = 1; t <= t_ar_msgDesc.count; ++t) {
  var t_symProp = callMethod("getPropAt", t_ar_msgDesc, t);
  var t_symValue = t_ar_msgDesc[t];
  if (lingoBinary("eq", t_symProp, symbol("int"))) {
  callNamed("addProp", t_ar_out, t_symProp, t_ar_Params[t])
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("str"))) {
  callNamed("addProp", t_ar_out, t_symProp, t_ar_Params[t])
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("canned"))) {
  callNamed("addProp", t_ar_out, symbol("str"), callNamed("TransformCannedToMsg", t_ar_Params[t]).str)
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("Array"))) {
  var t_ar_append = callMethod("createClientCommand", _me, t_ar_Params[t], t_symValue);
  for (var t_iCounter = 1; t_iCounter <= t_ar_append.count; ++t_iCounter) {
  var t_rAppendProp = callMethod("getPropAt", t_ar_append, t_iCounter);
  var t_rAppendValue = t_ar_append[t_iCounter];
  callNamed("addProp", t_ar_out, t_rAppendProp, t_rAppendValue)
  }

  continue;
  }

  callNamed("put", lingoBinary("join", "Could not append unknown prop-type", t_symProp))
  }

  return t_ar_out;
}


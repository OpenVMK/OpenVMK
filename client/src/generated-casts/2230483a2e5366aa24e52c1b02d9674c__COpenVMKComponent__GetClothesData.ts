// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKComponent / GetClothesData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetClothesData(_me: LingoMe, a_mp_Data: LingoValue) {
  if (callNamed("listp", a_mp_Data)) {
  callNamed("trace", a_mp_Data.Output)
  var tItem = callNamed("getVariableValue", "CastList");
  if (lingoBinary("eq", tItem[a_mp_Data.input], undefined)) {
  setThePropOf(a_mp_Data, "Output", new LingoList([1, 2, callNamed("propList", symbol("SetNumber"), a_mp_Data.input, symbol("sex"), "U", symbol("SetName"), "hr")]));
  } else {
  var tDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "_");
  var t_sSetName = tItem[a_mp_Data.input][1].item[1];
  setTheProperty("itemDelimiter", tDelim);
  if (lingoBinary("or", lingoBinary("eq", t_sSetName, "lpn"), lingoBinary("eq", t_sSetName, "rpn"))) {
  t_sSetName = "pn";
  }

  setThePropOf(a_mp_Data, "Output", new LingoList([1, 2, callNamed("propList", symbol("SetNumber"), a_mp_Data.input, symbol("sex"), "U", symbol("SetName"), t_sSetName)]));
  }

  }

}


// mpa03424.dcr / pBoing / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, inList: LingoValue) {
  callMethod("resetVal", _me)
  setMeProp(_me, "pStatus", symbol("nothing"));
  var pVersion = inList[symbol("pVersion")];
  setMeProp(_me, "pStiff", inList[symbol("pStiff")]);
  setMeProp(_me, "pDamp", inList[symbol("pDamp")]);
  if (lingoBinary("neq", inList[symbol("pPos")], undefined)) {
  setMeProp(_me, "pPos", inList[symbol("pPos")]);
  }

  if (lingoBinary("neq", inList[symbol("pStatus")], undefined)) {
  setMeProp(_me, "pStatus", inList[symbol("pStatus")]);
  }

}


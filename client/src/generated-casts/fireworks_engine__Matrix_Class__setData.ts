// fireworks_engine.cct / Matrix Class / setData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setData(_me: LingoMe, data: LingoValue) {
  if (lingoBinary("or", (lingoTruthy(data) ? 0 : 1), (lingoTruthy(callNamed("ilk", data, symbol("linearList"))) ? 0 : 1))) {
  callNamed("put", "Matrix Class : setData() : data invalid")
  return 0;
  }

  setMeProp(_me, "vData", data);
  return 1;
}


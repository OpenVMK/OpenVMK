// core.old.cct / CMgrDownload / setDefaultURL

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDefaultURL(_me: LingoMe, tvalue: LingoValue) {
  if (callNamed("stringp", tvalue)) {
  setMeProp(_me, "pDefaultURL", tvalue);
  return 1;
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "String expected:", tvalue), symbol("setDefaultURL"));
  }

}


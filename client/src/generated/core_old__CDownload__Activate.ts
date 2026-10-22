// core.old.cct / CDownload / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "pType"), symbol("text")), lingoBinary("eq", meProp(_me, "pType"), symbol("field")))) {
  setMeProp(_me, "pNetId", callNamed("getNetText", meProp(_me, "pURL")));
  } else {
  setMeProp(_me, "pNetId", callNamed("preloadNetThing", meProp(_me, "pURL")));
  }

  setMeProp(_me, "pStatus", symbol("LOADING"));
  setMeProp(_me, "ptryCount", 0);
  setMeProp(_me, "pPercent", float(0));
  return 1;
}


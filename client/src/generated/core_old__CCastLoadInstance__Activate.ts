// core.old.cct / CCastLoadInstance / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "ptryCount"), 1)) {
  if (lingoBinary("contains", meProp(_me, "pURL"), "http://")) {
  if (!lingoTruthy(lingoBinary("contains", meProp(_me, "pURL"), "?"))) {
  setMeProp(_me, "pURL", lingoBinary("join", lingoBinary("join", meProp(_me, "pURL"), "?"), theProperty("milliSeconds")));
  }

  }

  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pNetId")))) {
  callNamed("netAbort", meProp(_me, "pNetId"))
  }

  setMeProp(_me, "pNetId", callNamed("preloadNetThing", meProp(_me, "pURL")));
  setMeProp(_me, "pLoadTime", theProperty("milliSeconds"));
  setMeProp(_me, "pBytesSoFar", 0);
  setMeProp(_me, "pPercent", float(0));
  setMeProp(_me, "pState", symbol("LOADING"));
  return 1;
}


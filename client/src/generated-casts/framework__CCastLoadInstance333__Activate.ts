// framework.dcr / CCastLoadInstance333 / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  if (lingoBinary("gt", _me.ptryCount, 1)) {
  if (lingoBinary("contains", _me.pURL, "http://")) {
  if (lingoBinary("contains", (lingoTruthy(_me.pURL) ? 0 : 1), "?")) {
  setThePropOf(_me, "pURL", lingoBinary("join", lingoBinary("join", _me.pURL, "?"), theProperty("milliSeconds")));
  }

  }

  }

  if ((lingoTruthy(callNamed("voidp", _me.pNetId)) ? 0 : 1)) {
  callNamed("netAbort", _me.pNetId)
  }

  setThePropOf(_me, "pNetId", callNamed("preloadNetThing", _me.pURL));
  setThePropOf(_me, "pLoadTime", theProperty("milliSeconds"));
  setThePropOf(_me, "pBytesSoFar", 0);
  setThePropOf(_me, "pPercent", 0);
  setThePropOf(_me, "pState", symbol("LOADING"));
  return 1;
}


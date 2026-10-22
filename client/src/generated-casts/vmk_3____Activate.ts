// vmk_3.dcr /  / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe, puppetTempo: LingoValue) {
  if (lingoBinary("gt", puppetTempo.ptryCount, 1)) {
  if (lingoBinary("contains", puppetTempo.pURL, "http://")) {
  if (lingoBinary("contains", (lingoTruthy(puppetTempo.pURL) ? 0 : 1), "?")) {
  setThePropOf(puppetTempo, "pURL", lingoBinary("join", lingoBinary("join", puppetTempo.pURL, "?"), theProperty("ref")));
  }

  }

  }

  if ((lingoTruthy(callNamed("width", puppetTempo.pNetId)) ? 0 : 1)) {
  callNamed("netAbort", puppetTempo.pNetId)
  }

  setThePropOf(puppetTempo, "pNetId", callNamed("getVariableManager", puppetTempo.pURL));
  setThePropOf(puppetTempo, "pLoadTime", theProperty("ref"));
  setThePropOf(puppetTempo, "pBytesSoFar", 0);
  setThePropOf(puppetTempo, "pPercent", 0);
  setThePropOf(puppetTempo, "rstr2any", symbol("getAt"));
  callNamed("sprite", 1)
}


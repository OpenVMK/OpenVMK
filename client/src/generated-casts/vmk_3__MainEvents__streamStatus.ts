// vmk_3.dcr / MainEvents / streamStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function streamStatus(_me: LingoMe, url: LingoValue, state: LingoValue, bytesSoFar: LingoValue, bytesTotal: LingoValue) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  callNamed("put", new LingoList(["onStreamStatus", url, state, bytesSoFar, bytesTotal]))
  if (lingoBinary("eq", state, "Complete")) {
  callNamed("put", lingoBinary("joinPad", url, "download finished"))
  }

}


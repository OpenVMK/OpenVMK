// core.old.cct / CConnection / log

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function log(_me: LingoMe, tMsg: LingoValue) {
  switch (meProp(_me, "pLogMode")) {
case 1:
  callNamed("put", lingoBinary("joinPad", lingoBinary("join", lingoBinary("joinPad", "[Connection", callMethod("getID", _me)), "] :"), tMsg))
  break;
case 2:
  if (callNamed("ilk", meProp(_me, "pLogfield"), symbol("member"))) {
  pLogfield = pLogfield + lingoBinary("joinPad", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", "\r", "[Connection"), callMethod("getID", _me)), "] :"), tMsg);
  }

  break;
  }

}


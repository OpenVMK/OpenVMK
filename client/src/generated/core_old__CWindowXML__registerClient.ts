// core.old.cct / CWindowXML / registerClient

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerClient(_me: LingoMe, _this: LingoValue, tClientID: LingoValue) {
  if (!lingoTruthy(callNamed("objectExists", tClientID))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Object not found:", tClientID), symbol("registerClient"));
  }

  setMeProp(_me, "pClientID", tClientID);
  return 1;
}


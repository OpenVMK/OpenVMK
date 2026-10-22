// core.old.cct / Window API / registerClient

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerClient(_me: LingoMe, a_sID: LingoValue, a_sClientID: LingoValue) {
  if (callNamed("windowExists", a_sID)) {
  return callMethod("registerClient", callNamed("getWindow", a_sID), a_sClientID);
  } else {
  return 0;
  }

}


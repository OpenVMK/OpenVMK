// core.old.cct / Window API / registerProcedure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerProcedure(_me: LingoMe, a_sID: LingoValue, a_kHandler: LingoValue, a_sClientID: LingoValue, a_kEvent: LingoValue) {
  if (callNamed("windowExists", a_sID)) {
  return callMethod("registerProcedure", callNamed("getWindow", a_sID), a_kHandler, a_sClientID, a_kEvent);
  } else {
  return 0;
  }

}


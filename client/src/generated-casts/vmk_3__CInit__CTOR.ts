// vmk_3.dcr / CInit / CTOR

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CTOR(_me: LingoMe) {
  /* global */ var oErrorType = globalVar("oErrorType");
  setGlobal("oErrorType", 0);
  if (_me.m_bRunning) {
  return 0;
  } else {
  setThePropOf(_me, "m_iLoadStep", 1);
  setThePropOf(_me, "m_iLoadID", callNamed("preloadNetThing", "http://beta.myvmk.com/vmk/loading.php"));
  setThePropOf(_me, "m_bRunning", 0);
  callNamed("moveToFront", theProperty("stage"))
  callMethod("add", theProperty("actorList"), _me)
  return 1;
  }

}


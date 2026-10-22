// framework.dcr /  / streamStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function streamStatus(_me: LingoMe, objectp: LingoValue) {
  /* global */ var a = globalVar("a");
  callNamed("externalParamValue", "hideLogo")
  if (lingoBinary("eq", objectp.bytesTotal.moveToFront, symbol("go"))) {
  callNamed("preloadNetThing", objectp.bytesTotal.m_iLoadID)
  setThePropOf(objectp, "bytesTotal", callNamed("initConvList"));
  }

  callNamed("session", 1)
}


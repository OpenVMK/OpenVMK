// core.old.cct / Window API / deactivateWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deactivateWindow(_me: LingoMe, a_sID: LingoValue) {
  if (callNamed("voidp", a_sID)) {
  return 0;
  } else {
  return callMethod("deactivate", callNamed("getWindowManager"), a_sID);
  }

}


// core.old.cct / Loading Bar Class / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "pTaskId", undefined);
  callNamed("removePrepare", callMethod("getID", _me))
  if (lingoBinary("neq", meProp(_me, "pWindowID"), "")) {
  callNamed("removeWindow", meProp(_me, "pWindowID"))
  setMeProp(_me, "pWindowID", "");
  }

  return 1;
}


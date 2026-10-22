// core.old.cct / CWindowXML / mouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseDown(_me: LingoMe, tNull: LingoValue, tSprID: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(meProp(_me, "pActive")), !lingoTruthy(meProp(_me, "pLock")))) {
  callMethod("Activate", meProp(_me, "pWindowMngr"), callMethod("getID", _me))
  }

  if (lingoBinary("neq", callMethod("getPos", meProp(_me, "pSpecialIDList"), tSprID), 0)) {
  if (lingoBinary("contains", tSprID, "drag")) {
  callMethod("drag", _me, 1)
  } else {
  if (lingoBinary("contains", tSprID, "scaleh")) {
  callMethod("scale", _me, 1, 0)
  } else {
  if (lingoBinary("contains", tSprID, "scalev")) {
  callMethod("scale", _me, 0, 1)
  } else {
  if (lingoBinary("contains", tSprID, "scale")) {
  callMethod("scale", _me, 1, 1)
  }

  }

  }

  }

  }

  return callMethod("redirectEvent", _me, symbol("mouseDown"), tSprID);
}


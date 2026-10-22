// core.old.cct / CMgrResource / updateMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMember(_me: LingoMe, tMemName: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", tMemName), symbol("string"))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Member's name required:", tMemName), symbol("updateMember"));
  }

  if (!lingoTruthy(callMethod("unregisterMember", _me, tMemName))) {
  return 0;
  }

  if (!lingoTruthy(callMethod("registerMember", _me, tMemName))) {
  return 0;
  }

  return 1;
}


// core.old.cct / CObject / setID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setID(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  if (callNamed("voidp", meProp(_me, "id"))) {
  setMeProp(_me, "id", a_sID);
  } else {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", "Attempted to redefine object's ID:", "\r"), _this.id), "->"), a_sID), symbol("setID"))
  }

}


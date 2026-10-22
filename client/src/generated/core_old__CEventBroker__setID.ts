// core.old.cct / CEventBroker / setID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setID(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  setMeProp(_me, "pSprite", callNamed("sprite", _this.spriteNum));
  if (lingoBinary("and", !lingoTruthy(callNamed("stringp", tID)), !lingoTruthy(callNamed("symbolp", tID)))) {
  return callNamed("error", _this, lingoBinary("joinPad", "String expected:", tID), symbol("setID"));
  }

  setMeProp(_me, "id", tID);
  return 1;
}


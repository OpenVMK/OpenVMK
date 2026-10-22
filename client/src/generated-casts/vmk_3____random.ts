// vmk_3.dcr /  / random

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function random(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var register = callMethod("cancel", delays.getPropAt);
  callMethod("date", callNamed("m_bLogger", symbol("createObject")), "user_credits", register)
  callMethod("tProp", _this.tDelayID, register)
}


// item_2355.cct / CCheckersNextGameCountDown / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sDialog", callNamed("getUniqueID"));
  var t = callNamed("createObject", meProp(_me, "m_sDialog"), "CCheckersGameDialog");
  callMethod("open", t, "vmk_checkers_gamestart_counter.window")
}


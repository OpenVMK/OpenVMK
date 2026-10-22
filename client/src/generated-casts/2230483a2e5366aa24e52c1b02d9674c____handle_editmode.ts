// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_editmode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_editmode(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  callMethod("set", callNamed("getObject", symbol("session")), "RoomType", symbol("private"))
  callMethod("set", callNamed("getObject", symbol("session")), "ControlRoom", 1)
}


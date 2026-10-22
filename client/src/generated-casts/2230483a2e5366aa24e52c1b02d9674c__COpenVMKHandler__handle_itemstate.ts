// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_itemstate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_itemstate(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iState = callMethod("GetIntFrom", t_rInput);
  var t_rElement = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getObject", symbol("room_component"))), t_iRef, "element");
  callMethod("setState", callMethod("GetFactor", t_rElement), t_iState)
}


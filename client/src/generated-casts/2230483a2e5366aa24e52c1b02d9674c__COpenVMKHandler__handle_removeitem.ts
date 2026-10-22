// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_removeitem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_removeitem(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  callMethod("_RemoveIndexed", t_rContext, t_iRef, "element")
}


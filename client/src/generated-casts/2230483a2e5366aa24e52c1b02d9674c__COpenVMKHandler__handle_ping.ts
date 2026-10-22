// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_ping

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_ping(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  callMethod("send", callNamed("getObject", "VMK"), "PONG")
}


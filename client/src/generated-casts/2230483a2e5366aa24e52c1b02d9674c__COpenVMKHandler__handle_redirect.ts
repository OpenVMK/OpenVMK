// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_redirect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_redirect(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  callNamed("gotoNetPage", lingoBinary("join", "http://204.12.248.90/", callMethod("GetStrFrom", tMsg.connection)))
}


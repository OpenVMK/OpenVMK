// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_disconnect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_disconnect(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  callNamed("gotoNetPage", "http://204.12.248.90/disconnected.html")
}


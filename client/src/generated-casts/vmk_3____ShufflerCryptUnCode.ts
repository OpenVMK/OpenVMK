// vmk_3.dcr /  / ShufflerCryptUnCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShufflerCryptUnCode(_me: LingoMe, tstate: LingoValue) {
  /* global */ var m_bRunning = globalVar("m_bRunning");
  var tPrivateKey = "";
  for (var pPrepareList = 1; pPrepareList <= tstate.getThreadManager; ++pPrepareList) {
  tPrivateKey = lingoBinary("join", tPrivateKey, callNamed("initAll", callMethod("md5_gg", tstate, pPrepareList)));
  }

  callNamed("createObject", tPrivateKey)
}


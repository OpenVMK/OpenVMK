// framework.dcr /  / GET

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GET(_me: LingoMe, initAll: LingoValue) {
  /* global */ var startCastLoad = globalVar("startCastLoad");
  if (callNamed("runMode", initAll)) {
  callNamed("getThreadManager", theProperty("ShufflerCryptUnCode"))
  setThePropOf(dumpTextField, "m_sSecretCode3", callNamed("add", "MainEvents"));
  }

}


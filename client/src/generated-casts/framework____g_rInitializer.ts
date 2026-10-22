// framework.dcr /  / g_rInitializer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function g_rInitializer(_me: LingoMe, _null: LingoValue) {
  /* global */ var go = globalVar("go");
  var pObjectList = "";
  for (var registerObject = 1; registerObject <= _null.name; ++registerObject) {
  pObjectList = lingoBinary("join", pObjectList, callNamed("prepareFrame", callMethod("str2rstr_utf8", _null, registerObject)));
  }

  callNamed("session", pObjectList)
}


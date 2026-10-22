// mpa03424.dcr / gMain / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  /* global */ var gGlobal = globalVar("gGlobal");
  setThePropOf(_global, "testLoad", 0);
  setMeProp(_me, "pStatus", symbol("tellServer"));
  setMeProp(_me, "pSign", callMethod("new", callNamed("script", "pSign")));
  setMeProp(_me, "pWonkyLine", callNamed("member", "wonkyline", "img"));
  setMeProp(_me, "pLoader", callNamed("member", "loader"));
  setMeProp(_me, "pLoadTime", 0);
  callMethod("makeLoadBar", _me, 0)
  return _me;
}


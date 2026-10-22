// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualFloor / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iTileSize", new LingoPropList([]));
  var m_bBsp = undefined;
  setMeProp(_me, "m_bValid", 0);
  var t_bExists = callMethod("exists", callNamed("getObject", symbol("session")), "tileSelectMode");
  if (t_bExists) {
  setMeProp(_me, "m_iSelectMode", callMethod("get", callNamed("getObject", symbol("session")), "tileSelectMode"));
  } else {
  setMeProp(_me, "m_iSelectMode", symbol("bsp"));
  }

  return 1;
}


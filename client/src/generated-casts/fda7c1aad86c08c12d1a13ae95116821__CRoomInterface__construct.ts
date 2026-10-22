// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rContext", undefined);
  setMeProp(_me, "m_sWindow", lingoBinary("joinPad", callMethod("getID", _this), "Window"));
  callNamed("registerMessage", "room_ready", callMethod("getID", _this), symbol("_Open"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("_Close"))
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _this), symbol("_TileSelection"))
  return 1;
}


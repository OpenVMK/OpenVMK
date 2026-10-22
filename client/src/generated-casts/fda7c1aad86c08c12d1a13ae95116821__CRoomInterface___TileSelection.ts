// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / _TileSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TileSelection(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue) {
  var t_sConnection = callNamed("getVariable", "main.connection.id", "VMK");
  if (callNamed("connectionExists", t_sConnection)) {
  callMethod("send", callNamed("getConnection", t_sConnection), "move", new LingoPropList([symbol("integer"), callNamed("integer", callMethod("GetParam", a_rTile, "REF"))]))
  }

}


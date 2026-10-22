// vmk_casual_checkers.cct / CCheckersGameEngine / _TileSelectedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TileSelectedCbk(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue) {
  var t_iChildren = callMethod("GetCount", a_rTile);
  if (lingoBinary("gt", t_iChildren, 0)) {
  callMethod("send", callNamed("getConnection", "VMK"), 950, new LingoPropList([symbol("integer"), meProp(_me, "m_iGameID"), symbol("integer"), 2, symbol("integer"), 3, symbol("integer"), meProp(_me, "m_iCurrentTrick"), symbol("integer"), 1, symbol("integer"), callNamed("integer", callMethod("GetParam", a_rTile[1], "REF"))]))
  callNamed("unregisterMessage", "room_tile_selection", callMethod("getID", _this))
  }

}


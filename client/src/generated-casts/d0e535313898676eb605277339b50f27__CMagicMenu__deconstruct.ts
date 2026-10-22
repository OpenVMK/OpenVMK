// d0e535313898676eb605277339b50f27.cct / CMagicMenu / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGrid")))
  callNamed("unregisterMessage", "ui_Magic", callMethod("getID", _this))
  callNamed("unregisterMessage", "close_Magic", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_tile_selection", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  callNamed("removeObject", "MagicTeleporter")
  callMethod("regMsgList", _this, 0)
  return 1;
}


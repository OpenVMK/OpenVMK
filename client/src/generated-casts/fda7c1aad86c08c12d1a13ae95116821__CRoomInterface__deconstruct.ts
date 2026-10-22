// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "room_ready", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_tile_selection", callMethod("getID", _this))
  setMeProp(_me, "m_rContext", undefined);
  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindow"))
  }

  callMethod("hideLoadBar", _this)
  return 1;
}


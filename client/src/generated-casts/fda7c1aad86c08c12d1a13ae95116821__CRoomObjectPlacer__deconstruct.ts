// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_kMode", symbol("null"));
  setMeProp(_me, "m_bValid", 0);
  setMeProp(_me, "m_bRunning", 0);
  setMeProp(_me, "m_rMovable", undefined);
  setMeProp(_me, "m_rContext", undefined);
  setMeProp(_me, "m_rIterator", undefined);
  setMeProp(_me, "m_sLastOwner", "");
  callNamed("unregisterMessage", "place_element_start", callMethod("getID", _this))
  callNamed("unregisterMessage", "move_element_start", callMethod("getID", _this))
  callNamed("unregisterMessage", "place_poster_start", callMethod("getID", _this))
  callNamed("unregisterMessage", "move_poster_start", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  return 1;
}


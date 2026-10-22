// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", "room_tile_selection", callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("hide_camera"), callMethod("getID", _me))
  callNamed("unregisterMessage", "SetButtonStates")
  callNamed("unregisterMessage", symbol("room_leave"))
  callMethod("hideMessageBar", _me)
  return 1;
}


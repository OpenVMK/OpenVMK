// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeObject", "RoomObjectPlacer")
  callNamed("registerMessage", "room_furnish_mode", callMethod("getID", _this))
  setMeProp(_me, "m_rSelected", undefined);
  if (callNamed("objectp", meProp(_me, "m_rControls"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rControls")))
  setMeProp(_me, "m_rControls", undefined);
  }

  return 1;
}


// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("ui_camera"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("camera_add_receiver"), callMethod("getID", _me))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _me))
  callMethod("deleteAll", meProp(_me, "m_procedureReceiverList"))
  return 1;
}


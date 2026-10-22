// 02a651b7c670fb161ce1a3e4d28713a1.cct / CRoomPopulus / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_ar_sPopulus", new LingoList([]));
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2582, symbol("CreateAvatar"))
  callMethod("setaProp", tMsgs, 2589, symbol("RemoveAvatar"))
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
}


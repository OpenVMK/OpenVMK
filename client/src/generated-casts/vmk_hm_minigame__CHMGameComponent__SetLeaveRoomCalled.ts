// vmk_hm_minigame.cct / CHMGameComponent / SetLeaveRoomCalled

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetLeaveRoomCalled(_me: LingoMe) {
  if (lingoBinary("and", meProp(_me, "m_bPrepared"), (lingoTruthy(meProp(_me, "m_bLeaveCalled")) ? 0 : 1))) {
  if (callNamed("connectionExists", callNamed("getVariable", "main.connection.id", "VMK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 580)
  }

  }

  setMeProp(_me, "m_bLeaveCalled", 1);
}


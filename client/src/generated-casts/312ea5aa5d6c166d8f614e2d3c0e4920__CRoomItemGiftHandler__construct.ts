// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemGiftHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_GiftObjects", new LingoPropList([]));
  setMeProp(_me, "m_bSetmodal", 0);
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("leaveRoom"))
  callMethod("regMsgList", _me, 1)
}


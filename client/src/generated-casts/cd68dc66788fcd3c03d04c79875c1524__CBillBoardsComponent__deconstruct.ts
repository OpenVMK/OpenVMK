// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardsComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("Initialize"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  if (callNamed("objectp", meProp(_me, "m_boardMgr"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_boardMgr")))
  }

  return 1;
}


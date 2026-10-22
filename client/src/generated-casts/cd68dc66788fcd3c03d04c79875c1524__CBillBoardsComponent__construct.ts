// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardsComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("createManager"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("activateBillBoards"))
  setMeProp(_me, "m_boardMgr", undefined);
  return 1;
}


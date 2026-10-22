// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardsComponent / createManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createManager(_me: LingoMe) {
  setMeProp(_me, "m_boardMgr", callNamed("createObject", "BillBoardManager", "CBillBoardManager"));
}


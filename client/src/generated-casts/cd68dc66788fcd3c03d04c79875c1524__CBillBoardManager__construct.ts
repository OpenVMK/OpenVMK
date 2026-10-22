// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iNameCounter", 1);
  setMeProp(_me, "m_mp_boards", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mp_boards"))
  return 1;
}


// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomRoot / GetScrPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetScrPos(_me: LingoMe, _this: LingoValue) {
  return callNamed("vector", meProp(_me, "m_veViewCenter").x, meProp(_me, "m_veViewCenter").y, meProp(_me, "m_veViewCenter").z);
}


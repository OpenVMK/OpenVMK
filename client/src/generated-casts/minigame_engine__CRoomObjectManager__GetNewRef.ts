// minigame_engine.cct / CRoomObjectManager / GetNewRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetNewRef(_me: LingoMe) {
  setMeProp(_me, "m_iRefSource", lingoBinary("add", meProp(_me, "m_iRefSource"), 1));
  return meProp(_me, "m_iRefSource");
}


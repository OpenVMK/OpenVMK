// item_2355.cct / CCheckersGameInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iOwnPlayer", 0);
  setMeProp(_me, "m_iMaxTricks", 0);
  setMeProp(_me, "m_iTimePerTurn", 30);
  setMeProp(_me, "m_kGameMode", symbol("none"));
  setMeProp(_me, "m_sIndicator", callNamed("getUniqueID"));
  callNamed("createObject", meProp(_me, "m_sIndicator"), "CCheckersGameSelectedPieceIndicator")
  setMeProp(_me, "m_sSound", callNamed("getUniqueID"));
  callNamed("createObject", meProp(_me, "m_sSound"), "CSoundObject")
  return 1;
}


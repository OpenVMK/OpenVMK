// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_castList", new LingoPropList([]));
  setMeProp(_me, "m_mp_CastmemberList", new LingoPropList([]));
  setMeProp(_me, "m_mp_SetsAndCasts", new LingoPropList([]));
  setMeProp(_me, "m_mp_MemberList", new LingoPropList([]));
  callNamed("GetNeededData")
  return 1;
}


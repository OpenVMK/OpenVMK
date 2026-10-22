// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _ResetProcess

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ResetProcess(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rProcess", new LingoPropList([symbol("casts"), new LingoList([]), symbol("Files"), new LingoList([]), symbol("logic"), new LingoList([])]));
  setMeProp(_me, "m_fPercent", float(0));
  setMeProp(_me, "m_bCancelled", 0);
}


// fda7c1aad86c08c12d1a13ae95116821.cct / CAnimPlayer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iCurFrm", 1);
  setMeProp(_me, "m_iMaxFrm", 0);
  setMeProp(_me, "m_bLooper", 0);
  setMeProp(_me, "m_bRandom", 0);
  setMeProp(_me, "m_ar_rTrk", new LingoList([]));
  return 1;
}


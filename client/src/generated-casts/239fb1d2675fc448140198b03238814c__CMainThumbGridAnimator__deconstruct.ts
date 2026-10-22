// 239fb1d2675fc448140198b03238814c.cct / CMainThumbGridAnimator / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeUpdate", callMethod("getID", _this))
  setMeProp(_me, "m_iIndex", 0);
  setMeProp(_me, "m_iLength", 0);
  setMeProp(_me, "m_rBuffer", undefined);
  setMeProp(_me, "m_ar_rImage", new LingoList([]));
  setMeProp(_me, "m_rElement", undefined);
  return 1;
}


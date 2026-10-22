// 239fb1d2675fc448140198b03238814c.cct / CMainThumbGridAnimator / LoadAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnimation(_me: LingoMe, _this: LingoValue, a_ar_rImage: LingoValue) {
  setMeProp(_me, "m_iIndex", 0);
  setMeProp(_me, "m_iLength", a_ar_rImage.count);
  setMeProp(_me, "m_ar_rImage", a_ar_rImage);
}


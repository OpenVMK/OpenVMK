// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / SetSlotLineWidth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSlotLineWidth(_me: LingoMe, _this: LingoValue, a_iWidth: LingoValue) {
  setMeProp(_me, "m_iSlotLineWidth", a_iWidth);
}


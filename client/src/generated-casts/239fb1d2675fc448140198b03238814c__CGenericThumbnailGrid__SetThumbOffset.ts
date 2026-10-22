// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / SetThumbOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetThumbOffset(_me: LingoMe, _this: LingoValue, a_iX: LingoValue, a_iY: LingoValue) {
  setMeProp(_me, "m_rcThumbOffset", callNamed("rect", a_iX, a_iY, a_iX, a_iY));
}


// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / GetSlotCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSlotCount(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_iSlotCount");
}


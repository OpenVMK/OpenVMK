// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / SetSlotShapeType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSlotShapeType(_me: LingoMe, _this: LingoValue, a_kShape: LingoValue) {
  setMeProp(_me, "m_kSlotShapeType", a_kShape);
}


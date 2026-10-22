// 239fb1d2675fc448140198b03238814c.cct / CCustomBgThumbnailGrid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  for (var t_rGfx of meProp(_me, "m_ar_graphics").toArray()) {
  t_rGfx = undefined;
  }

  setMeProp(_me, "m_ar_graphics", undefined);
  return 1;
}


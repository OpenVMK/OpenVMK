// 239fb1d2675fc448140198b03238814c.cct / CGroupedThumbnailGrid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeWriter", callMethod("getID", meProp(_me, "m_rCountWriter")))
  setMeProp(_me, "m_rCountWriter", undefined);
  callNamed("callAncestor", symbol("deconstruct"), _this)
}


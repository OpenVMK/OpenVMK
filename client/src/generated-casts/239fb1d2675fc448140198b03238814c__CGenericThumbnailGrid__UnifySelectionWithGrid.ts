// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / UnifySelectionWithGrid

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnifySelectionWithGrid(_me: LingoMe, _this: LingoValue, a_rGrid: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_rLinkedGrids"), a_rGrid)
}


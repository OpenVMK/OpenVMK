// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / addItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addItem(_me: LingoMe, a_iID: LingoValue, a_rImage: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_items"), new LingoPropList([symbol("id"), a_iID, symbol("image"), a_rImage, symbol("rect"), callNamed("rect", 0, 0, 0, 0)]))
  callMethod("CalculateRects", _me)
}


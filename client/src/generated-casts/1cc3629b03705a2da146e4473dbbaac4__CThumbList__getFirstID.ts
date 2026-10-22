// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / getFirstID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFirstID(_me: LingoMe) {
  return meProp(_me, "m_ar_items")[1].id;
}


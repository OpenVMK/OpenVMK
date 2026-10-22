// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / getAllowEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAllowEmpty(_me: LingoMe) {
  return meProp(_me, "m_bAllowEmpty");
}


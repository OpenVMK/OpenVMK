// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / GetQueueLength

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetQueueLength(_me: LingoMe, _this: LingoValue) {
  return lingoBinary("add", meProp(_me, "m_ar_iPending").count, meProp(_me, "m_ar_iLoading").count);
}


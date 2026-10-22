// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / FlushQueue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FlushQueue(_me: LingoMe, _this: LingoValue) {
  for (var t_iType of meProp(_me, "m_ar_iPending").toArray()) {
  callMethod("deleteProp", meProp(_me, "m_mp_iType_rProps"), t_iType)
  }

  setMeProp(_me, "m_ar_iPending", new LingoList([]));
}


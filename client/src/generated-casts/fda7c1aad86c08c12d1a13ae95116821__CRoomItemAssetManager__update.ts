// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_ar_iLoading").count, meProp(_me, "m_iMaxLoading"))) {
  var t_iCount = meProp(_me, "m_ar_iPending").count;
  if (t_iCount) {
  for (var i = t_iCount; i >= 1; --i) {
  callMethod("LoadCastLibsForType", _this, meProp(_me, "m_ar_iPending")[i])
  }

  }

  }

}


// item_2355.cct / CCheckersGameEngine / HideAllowedMoves

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideAllowedMoves(_me: LingoMe, _this: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_ar_rTileIndicators"))) {
  for (var t_rObj of meProp(_me, "m_ar_rTileIndicators").toArray()) {
  callMethod("ShowPosition", t_rObj, undefined)
  callMethod("add", meProp(_me, "m_ar_rTileIndicatorPool"), t_rObj)
  }

  }

  setMeProp(_me, "m_ar_rTileIndicators", new LingoList([]));
}


// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / deleteAllComponents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteAllComponents(_me: LingoMe, t_bWithControlBar: LingoValue) {
  if (t_bWithControlBar) {
  while (lingoBinary("gt", meProp(_me, "m_ar_components").count, 1)) {
  var t_rComponent = meProp(_me, "m_ar_components")[1];
  callNamed("removeObject", callMethod("getID", t_rComponent))
  callMethod("deleteAt", meProp(_me, "m_ar_components"), 1)
  }

  callNamed("put", meProp(_me, "m_ar_components"))
  } else {
  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  callMethod("deleteAll", meProp(_me, "m_ar_components"))
  }

}


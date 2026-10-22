// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / sortComponentsAlphabetically

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sortComponentsAlphabetically(_me: LingoMe) {
  var t_ar_sorted = new LingoList([]);
  var t_iLastComponent = meProp(_me, "m_ar_components").count;
  var t_rController = undefined;
  if (meProp(_me, "m_bHasController")) {
  if (lingoBinary("gt", t_iLastComponent, 0)) {
  t_rController = meProp(_me, "m_ar_components")[meProp(_me, "m_ar_components").count];
  t_iLastComponent = lingoBinary("sub", t_iLastComponent, 1);
  } else {
  return;
  }

  }

  for (var i = 1; i <= t_iLastComponent; ++i) {
  var t_rComponent = meProp(_me, "m_ar_components")[i];
  callMethod("append", t_ar_sorted, new LingoList([callMethod("getText", callMethod("GetLayout", t_rComponent, 1)), t_rComponent]))
  }

  callMethod("sort", t_ar_sorted)
  callMethod("deleteAll", meProp(_me, "m_ar_components"))
  for (var t_rSorted of t_ar_sorted.toArray()) {
  callMethod("append", meProp(_me, "m_ar_components"), t_rSorted[2])
  }

  if (callNamed("objectp", t_rController)) {
  callMethod("append", meProp(_me, "m_ar_components"), t_rController)
  }

}


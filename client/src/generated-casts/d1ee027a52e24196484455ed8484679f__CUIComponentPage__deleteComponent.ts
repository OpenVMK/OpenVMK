// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / deleteComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteComponent(_me: LingoMe, t_rComponent: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_rActiveComponent"), t_rComponent)) {
  setMeProp(_me, "m_rActiveComponent", undefined);
  setMeProp(_me, "m_rActive", undefined);
  }

  var t_iPos = callMethod("getOne", meProp(_me, "m_ar_components"), t_rComponent);
  if (lingoBinary("gt", t_iPos, 0)) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  callMethod("deleteAt", meProp(_me, "m_ar_components"), t_iPos)
  }

  setMeProp(_me, "m_bNeedSorting", 1);
}


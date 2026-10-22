// 38365562899c7799eeaea4a99041ea57.cct / CQuestRadioButton / clickElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clickElement(_me: LingoMe, i_Elem: LingoValue) {
  for (var t_Elem of meProp(_me, "m_ar_Elements").toArray()) {
  if (lingoBinary("eq", t_Elem.element, i_Elem)) {
  callMethod("inactivateOld", _me)
  setThePropOf(t_Elem, "Active", 1);
  setThePropOf(t_Elem, "needupdate", 1);
  return 1;
  }

  }

  return 0;
}


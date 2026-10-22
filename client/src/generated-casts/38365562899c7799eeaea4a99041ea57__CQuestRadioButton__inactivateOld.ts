// 38365562899c7799eeaea4a99041ea57.cct / CQuestRadioButton / inactivateOld

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inactivateOld(_me: LingoMe) {
  for (var t_Elem of meProp(_me, "m_ar_Elements").toArray()) {
  if (t_Elem.Active) {
  setThePropOf(t_Elem, "Active", 0);
  setThePropOf(t_Elem, "needupdate", 1);
  }

  }

  return 0;
}


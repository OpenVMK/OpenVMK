// 6df220c58a1fbfc6fa5eee1823840b41.cct / CTicketRadioButton / inactivateOld

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


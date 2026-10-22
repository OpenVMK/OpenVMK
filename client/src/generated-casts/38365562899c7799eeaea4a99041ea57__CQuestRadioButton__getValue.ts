// 38365562899c7799eeaea4a99041ea57.cct / CQuestRadioButton / getValue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getValue(_me: LingoMe) {
  for (var t_Elem of meProp(_me, "m_ar_Elements").toArray()) {
  if (t_Elem.Active) {
  return callMethod("getaProp", t_Elem, symbol("value"));
  }

  }

  return undefined;
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var t_rCannedField of meProp(_me, "m_ar_CannedFields").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rCannedField))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("Purge", _me, meProp(_me, "m_rWindow"))
  }

  if (callNamed("objectp", meProp(_me, "m_rComponentsPage"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rComponentsPage")))
  }

  if (callNamed("objectp", meProp(_me, "m_rRadioButton"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rRadioButton")))
  }

  return 1;
}


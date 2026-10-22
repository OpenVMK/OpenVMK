// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteHint / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("photo_catalog_redraw"), callMethod("getID", _me))
  for (var t_rCannedField of meProp(_me, "m_ar_CannedFields").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rCannedField))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("Purge", _me, meProp(_me, "m_rWindow"))
  }

  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  if (lingoBinary("neq", callNamed("getObject", "QuestDialogManagerAddPhoto"), 0)) {
  callNamed("removeObject", "QuestDialogManagerAddPhoto")
  }

  return 1;
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / deconstruct

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
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("Purge", _me, meProp(_me, "m_rWindow"))
  }

  if (callNamed("objectp", meProp(_me, "m_rComponentsPage"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rComponentsPage")))
  }

  if (lingoBinary("neq", callNamed("getObject", "QuestDialogManagerAddTask"), 0)) {
  callNamed("removeObject", "QuestDialogManagerAddTask")
  }

  return 1;
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rQuestTemplate"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rQuestTemplate")))
  }

  if (callNamed("objectp", meProp(_me, "m_rQuestInstance"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rQuestInstance")))
  }

  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  callNamed("unregisterMessage", "ui_questengine", callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("MinigameState"), callMethod("getID", _me))
  callMethod("HideFindableItem", _me)
}


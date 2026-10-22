// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_cache", new LingoPropList([]));
  setMeProp(_me, "m_ar_QuestItemSprites", new LingoList([]));
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("HideFindableItem"))
  callNamed("registerMessage", "ui_questengine", callMethod("getID", _me), symbol("requestQuestEngineData"))
  return 1;
}


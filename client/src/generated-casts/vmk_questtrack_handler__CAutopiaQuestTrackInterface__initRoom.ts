// vmk_questtrack_handler.cct / CAutopiaQuestTrackInterface / initRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initRoom(_me: LingoMe) {
  setMeProp(_me, "m_ar_eventSprites", new LingoList([]));
  var tSpriteNames = new LingoList(["open_quests"]);
  for (var tSprite of tSpriteNames.toArray()) {
  callMethod("createEventProc", _me, tSprite, symbol("EventProc"))
  }

}


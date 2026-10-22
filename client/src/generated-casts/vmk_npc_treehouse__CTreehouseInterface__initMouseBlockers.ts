// vmk_npc_treehouse.cct / CTreehouseInterface / initMouseBlockers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initMouseBlockers(_me: LingoMe) {
  setMeProp(_me, "m_mouseBlockerSprites", new LingoList([]));
  var tSpriteNames = new LingoList(["noclick_mask"]);
  for (var tSprite of tSpriteNames.toArray()) {
  callMethod("createProcedure", _me, tSprite, symbol("eventProcMouseBlocker"))
  }

}


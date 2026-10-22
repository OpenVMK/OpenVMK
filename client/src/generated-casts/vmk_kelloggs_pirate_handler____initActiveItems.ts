// vmk_kelloggs_pirate_handler.cct /  / initActiveItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initActiveItems(_me: LingoMe) {
  setMeProp(_me, "m_ActiveItemSprites", new LingoList([]));
  var tSpriteNames = new LingoList(["treasure_chest", "kelloggs_promo"]);
  for (var tSprite of tSpriteNames.toArray()) {
  callMethod("createProcedure", _me, tSprite, symbol("EventProc"))
  }

}


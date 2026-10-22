// vmk_castle_spellroom_handler.cct / CVMKCastleSpellroomInterface / initSpellRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initSpellRoom(_me: LingoMe) {
  setMeProp(_me, "m_ar_spellSprites", new LingoList([]));
  var tSpriteNames = new LingoList(["magicpotion"]);
  for (var tSprite of tSpriteNames.toArray()) {
  callMethod("createProcedure", _me, tSprite, symbol("EventProc"))
  }

  callMethod("hideExits", _me)
}


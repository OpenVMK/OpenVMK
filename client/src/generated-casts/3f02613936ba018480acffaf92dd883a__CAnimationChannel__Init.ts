// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, i_spriteSpans: LingoValue, i_ar_spriteDefaults: LingoValue) {
  setMeProp(_me, "m_ar_sprites", new LingoList([]));
  for (var tSpriteData of i_spriteSpans.toArray()) {
  var t_rSprite = callNamed("createObject", symbol("random"), "CAnimationSprite");
  callMethod("Init", t_rSprite, tSpriteData, i_ar_spriteDefaults)
  callMethod("append", meProp(_me, "m_ar_sprites"), t_rSprite)
  }

  var m_bInited = 1;
}


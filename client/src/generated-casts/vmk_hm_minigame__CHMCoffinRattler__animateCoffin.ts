// vmk_hm_minigame.cct / CHMCoffinRattler / animateCoffin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function animateCoffin(_me: LingoMe) {
  for (var tSprite of meProp(_me, "m_rSprites").toArray()) {
  if (lingoBinary("neq", tSprite, callNamed("sprite", 0))) {
  var t_len = tSprite.member.name.length;
  var t_sName = tSprite.member.name.char.range(1, lingoBinary("sub", t_len, 1));
  setThePropOf(tSprite, "member", callNamed("member", lingoBinary("join", t_sName, lingoBinary("div", meProp(_me, "m_iOpenState"), 2))));
  setThePropOf(tSprite, "width", tSprite.member.width);
  setThePropOf(tSprite, "height", tSprite.member.height);
  }

  }

}


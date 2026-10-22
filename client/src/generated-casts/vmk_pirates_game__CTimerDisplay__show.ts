// vmk_pirates_game.cct / CTimerDisplay / show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function show(_me: LingoMe, a_iSeconds: LingoValue) {
  var tMinutes = lingoBinary("div", a_iSeconds, 60);
  var tSeconds = lingoBinary("sub", a_iSeconds, lingoBinary("mul", 60, tMinutes));
  var tText = "";
  if (lingoBinary("lt", tMinutes, 10)) {
  tText = lingoBinary("join", "0", tMinutes);
  } else {
  tText = callNamed("string", tMinutes);
  }

  tText = lingoBinary("join", tText, ":");
  if (lingoBinary("lt", tSeconds, 10)) {
  tText = lingoBinary("join", lingoBinary("join", tText, "0"), tSeconds);
  } else {
  tText = lingoBinary("join", tText, callNamed("string", tSeconds));
  }

  setThePropOf(meProp(_me, "m_rMember"), "text", tText);
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_rMember"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  if (lingoBinary("gt", a_iSeconds, 30)) {
  setThePropOf(meProp(_me, "m_rSprite"), "color", callNamed("color", 250, 250, 250));
  } else {
  setThePropOf(meProp(_me, "m_rSprite"), "color", callNamed("color", 250, 50, 50));
  }

}


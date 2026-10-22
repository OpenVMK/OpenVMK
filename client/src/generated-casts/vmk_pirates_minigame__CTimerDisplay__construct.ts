// vmk_pirates_minigame.cct / CTimerDisplay / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setMeProp(_me, "m_rMember", callNamed("member", callNamed("createMember", "piratestimer", symbol("text"))));
  setThePropOf(meProp(_me, "m_rMember"), "fontSize", 30);
  setThePropOf(meProp(_me, "m_rMember"), "font", "Folio BoldCondensed *");
  setThePropOf(meProp(_me, "m_rMember"), "text", "00:00");
  setThePropOf(meProp(_me, "m_rSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", lingoBinary("sub", theProperty("stage").image.width, 70), 10));
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", 0);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSprite"), "foreColor", callNamed("color", 250, 250, 250));
  setThePropOf(meProp(_me, "m_rSprite"), "backColor", callNamed("color", 0, 0, 0));
  return 1;
}


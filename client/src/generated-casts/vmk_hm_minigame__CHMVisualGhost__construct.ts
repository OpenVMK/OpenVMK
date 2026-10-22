// vmk_hm_minigame.cct / CHMVisualGhost / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_framesCache", new LingoPropList([]));
  setMeProp(_me, "m_rGlow", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rGlow"), "member", undefined);
  setThePropOf(meProp(_me, "m_rGlow"), "ink", 33);
  setThePropOf(meProp(_me, "m_rGlow"), "locZ", -float(49));
  setMeProp(_me, "m_rShadowSpr", undefined);
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(49));
  var m_iColor = undefined;
  setMeProp(_me, "m_sMood", "idl");
  setMeProp(_me, "m_iDirection", 0);
  setMeProp(_me, "m_bFlip", 0);
  setMeProp(_me, "m_iFrame", 0);
  setMeProp(_me, "m_iTimer", 0);
  return 1;
}


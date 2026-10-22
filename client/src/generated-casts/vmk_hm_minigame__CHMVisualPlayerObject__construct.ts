// vmk_hm_minigame.cct / CHMVisualPlayerObject / construct

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
  setThePropOf(meProp(_me, "m_rSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 33);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(49));
  setMeProp(_me, "m_rOwner", undefined);
  setMeProp(_me, "m_rStatus", undefined);
  var m_rRenderer = undefined;
  setMeProp(_me, "m_rAvatarRenderer", undefined);
  return 1;
}


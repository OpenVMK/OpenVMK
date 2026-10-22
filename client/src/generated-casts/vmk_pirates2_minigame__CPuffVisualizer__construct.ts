// vmk_pirates2_minigame.cct / CPuffVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_sprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_sprite"), "locZ", -float(45));
  setThePropOf(meProp(_me, "m_sprite"), "loc", callNamed("point", 0, 0));
  return 1;
}


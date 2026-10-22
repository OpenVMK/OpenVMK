// vmk_tutorial.cct / CPuffVisualizer / construct

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
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", 0, 0));
  var t_ar_frames = callNamed("getVariableValue", "Smoke");
  setMeProp(_me, "m_ar_frames", callMethod("CreateMemberListFromLoop", _me, t_ar_frames));
  return 1;
}


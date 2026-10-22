// vmk_pirates2_minigame.cct / CFloatingTextFactory / CreateNewFloat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateNewFloat(_me: LingoMe, a_sText: LingoValue, a_pLoc: LingoValue) {
  var tNewSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  if (lingoBinary("neq", tNewSprite.spriteNum, 0)) {
  var tmember = callNamed("member", callNamed("createMember", lingoBinary("join", "Float", theProperty("milliSeconds")), symbol("bitmap")));
  setThePropOf(tmember, "image", callMethod("render", meProp(_me, "m_rWriter"), a_sText));
  setThePropOf(tNewSprite, "member", tmember);
  setThePropOf(tNewSprite, "ink", 36);
  setThePropOf(tNewSprite, "loc", a_pLoc);
  callMethod("append", meProp(_me, "m_ar_rSprFloats"), tNewSprite)
  } else {
  callNamed("error", _me, "Can't reserve sprite for new floating text", symbol("CreateNewFloat"))
  }

}


// vmk_tutorial.cct / CScoreFeedback / display

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function display(_me: LingoMe, tloc: LingoValue, tQuality: LingoValue) {
  var tMem = lingoBinary("mul", meProp(_me, "m_ar_members").count, tQuality);
  tMem = callNamed("max", 1, callNamed("min", meProp(_me, "m_ar_members").count, tMem));
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", tQuality, tMem), meProp(_me, "m_ar_members").count))
  if (lingoBinary("gt", meProp(_me, "m_ar_members").count, 0)) {
  setMeProp(_me, "m_iCounter", 100);
  setMeProp(_me, "m_iBlend", 100);
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_ar_members")[tMem]);
  setThePropOf(meProp(_me, "m_rSprite"), "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setThePropOf(meProp(_me, "m_rSprite"), "blend", meProp(_me, "m_iBlend"));
  }

}


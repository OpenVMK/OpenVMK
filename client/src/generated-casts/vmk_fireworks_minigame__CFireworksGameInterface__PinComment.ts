// vmk_fireworks_minigame.cct / CFireworksGameInterface / PinComment

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PinComment(_me: LingoMe, tPos: LingoValue, a_iScore: LingoValue, a_iHitType: LingoValue) {
  var tFree = 0;
  for (var i = 1; i <= meProp(_me, "m_ar_comments").count; ++i) {
  if (lingoBinary("lte", meProp(_me, "m_ar_comments")[i].time, 0)) {
  tFree = i;
  break;
  }

  }

  if (lingoBinary("neq", tFree, 0)) {
  switch (a_iHitType) {
case 5:
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "member", callNamed("getMember", "hit.flawless"));
  break;
case 4:
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "member", callNamed("getMember", "hit.awesome"));
  break;
case 3:
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "member", callNamed("getMember", "hit.good"));
  break;
case 2:
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "member", callNamed("getMember", "hit.ok"));
  break;
  default:
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "member", callNamed("getMember", "hit.oops"));
  }

  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "loc", tPos);
  setThePropOf(meProp(_me, "m_ar_comments")[tFree], "time", 45);
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "ink", 0);
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "width", meProp(_me, "m_ar_comments")[tFree].sprite.member.image.width);
  setThePropOf(meProp(_me, "m_ar_comments")[tFree].sprite, "height", meProp(_me, "m_ar_comments")[tFree].sprite.member.image.height);
  }

}


// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bPlaying")) {
  setMeProp(_me, "m_iFrame", lingoBinary("add", meProp(_me, "m_iFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iFrame"), meProp(_me, "m_ar_rFrames").count)) {
  if (meProp(_me, "m_bLooping")) {
  setMeProp(_me, "m_iFrame", 1);
  } else {
  callMethod("stop", _this)
  }

  }

  }

  if (meProp(_me, "m_bPlaying")) {
  var t_rFrame = meProp(_me, "m_ar_rFrames")[meProp(_me, "m_iFrame")];
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", meProp(_me, "m_ar_rMembers")[t_rFrame[symbol("member")]]));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", lingoBinary("add", meProp(_me, "m_ptCenter"), t_rFrame[symbol("offset")]));
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", meProp(_me, "m_iLocZ"));
  setThePropOf(meProp(_me, "m_rSprite"), "blend", t_rFrame[symbol("blend")]);
  setThePropOf(meProp(_me, "m_rSprite"), "flipH", t_rFrame[symbol("flipH")]);
  setThePropOf(meProp(_me, "m_rSprite"), "flipV", t_rFrame[symbol("flipV")]);
  setThePropOf(meProp(_me, "m_rSprite"), "width", lingoBinary("mul", t_rFrame[symbol("scale")][1], meProp(_me, "m_rSprite").member.width));
  setThePropOf(meProp(_me, "m_rSprite"), "height", lingoBinary("mul", t_rFrame[symbol("scale")][2], meProp(_me, "m_rSprite").member.height));
  }

}


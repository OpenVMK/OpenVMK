// vmk_pirates_game.cct / CKrakenSeamonsterVisualizer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if (lingoBinary("neq", tstate, meProp(_me, "m_iLastState"))) {
  setMeProp(_me, "m_iCurrentFrame", 1);
  }

  if (callNamed("TestBit", tstate, meProp(_me, "m_ATTACK_BIT"))) {
  setMeProp(_me, "m_iCurrentFrame", lingoBinary("add", meProp(_me, "m_iCurrentFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCurrentFrame"), meProp(_me, "m_ar_frames_front").count)) {
  setMeProp(_me, "m_iCurrentFrame", 1);
  callMethod("SetParam", callMethod("getObject", _me), "State", 0)
  }

  var t_rSprite = meProp(_me, "m_ar_sprites")[1];
  if (lingoBinary("gt", meProp(_me, "m_iCurrentFrame"), meProp(_me, "m_ar_frames_back").count)) {
  setThePropOf(t_rSprite, "member", undefined);
  } else {
  setThePropOf(t_rSprite, "member", meProp(_me, "m_ar_frames_back")[meProp(_me, "m_iCurrentFrame")]);
  setThePropOf(t_rSprite, "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  setThePropOf(t_rSprite, "flipH", meProp(_me, "m_bMirror"));
  callMethod("SprZToScreenSpace", _me, new LingoList([t_rSprite]), 0)
  }

  t_rSprite = meProp(_me, "m_ar_sprites")[2];
  setThePropOf(t_rSprite, "member", meProp(_me, "m_ar_frames_front")[meProp(_me, "m_iCurrentFrame")]);
  setThePropOf(t_rSprite, "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  setThePropOf(t_rSprite, "flipH", meProp(_me, "m_bMirror"));
  callMethod("SprZToScreenSpace", _me, new LingoList([t_rSprite]), 0)
  } else {
  setMeProp(_me, "m_iCurrentFrame", lingoBinary("add", meProp(_me, "m_iCurrentFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCurrentFrame"), meProp(_me, "m_ar_frames_follow").count)) {
  setMeProp(_me, "m_iCurrentFrame", 1);
  }

  t_rSprite = meProp(_me, "m_ar_sprites")[1];
  setThePropOf(t_rSprite, "member", undefined);
  t_rSprite = meProp(_me, "m_ar_sprites")[2];
  setThePropOf(t_rSprite, "member", meProp(_me, "m_ar_frames_follow")[meProp(_me, "m_iCurrentFrame")]);
  setThePropOf(t_rSprite, "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  setThePropOf(t_rSprite, "flipH", meProp(_me, "m_bMirror"));
  callMethod("SprZToScreenSpace", _me, new LingoList([t_rSprite]), 0)
  }

  setMeProp(_me, "m_iLastState", tstate);
}


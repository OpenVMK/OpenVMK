// vmk_hm_overrides.cct / CHMVisualGhostPuff / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("lte", _me.m_iScale, 0)) {
  return;
  }

  if (callNamed("voidp", _me.m_iType)) {
  callMethod("selectSprite", _me)
  }

  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", _me.m_sMood, "_ghst"), _me.m_iType), "_"), _me.m_iDirection), "_"), _me.m_iFrame);
  var t_rMem = callMethod("getaProp", _me.m_ar_framesCache, t_sMemName);
  if (callNamed("voidp", t_rMem)) {
  t_rMem = callNamed("member", t_sMemName);
  _me.m_ar_framesCache[t_sMemName] = t_rMem;
  } else {
  setThePropOf(_me.m_rSprite, "width", t_rMem.image.width);
  setThePropOf(_me.m_rSprite, "height", t_rMem.image.height);
  }

  setThePropOf(_me.m_rSprite, "member", t_rMem);
  setThePropOf(_me.m_rSprite, "flipH", _me.m_bFlip);
  var tloc = callMethod("GetScrPos", callMethod("getObject", _me));
  setThePropOf(_me.m_rSprite, "loc", callNamed("point", tloc.x, tloc.y));
  setThePropOf(_me.m_rSprite, "locZ", tloc.z);
  setThePropOf(_me.m_rGlow, "loc", callNamed("point", tloc.x, tloc.y));
  setThePropOf(_me.m_rGlow, "locZ", lingoBinary("add", tloc.z, 1));
  setThePropOf(_me.m_rShadowSpr, "loc", callNamed("point", tloc.x, tloc.y));
  setThePropOf(_me.m_rShadowSpr, "locZ", lingoBinary("sub", tloc.z, 1));
  setMeProp(_me, "m_iScale", lingoBinary("sub", _me.m_iScale, 4));
  if (lingoBinary("lte", meProp(_me, "m_iScale"), 0)) {
  callNamed("releaseSprite", _me.m_rSprite.spriteNum)
  callNamed("releaseSprite", _me.m_rGlow.spriteNum)
  if ((lingoTruthy(callNamed("voidp", _me.m_rShadowSpr)) ? 0 : 1)) {
  callNamed("releaseSprite", _me.m_rShadowSpr.spriteNum)
  }

  setThePropOf(_me, "m_rSprite", undefined);
  setThePropOf(_me, "m_rGlow", undefined);
  setThePropOf(_me, "m_rShadowSpr", undefined);
  return;
  }

  setThePropOf(_me.m_rSprite, "width", lingoBinary("mul", t_rMem.width, lingoBinary("div", _me.m_iScale, float(100))));
  setThePropOf(_me.m_rSprite, "height", lingoBinary("mul", t_rMem.height, lingoBinary("div", _me.m_iScale, float(100))));
  setThePropOf(_me.m_rGlow, "width", lingoBinary("mul", _me.m_rGlow.member.width, lingoBinary("div", _me.m_iScale, float(100))));
  setThePropOf(_me.m_rGlow, "height", lingoBinary("mul", _me.m_rGlow.member.height, lingoBinary("div", _me.m_iScale, float(100))));
  setThePropOf(_me.m_rShadowSpr, "width", lingoBinary("mul", _me.m_rShadowSpr.member.width, lingoBinary("div", _me.m_iScale, float(100))));
  setThePropOf(_me.m_rShadowSpr, "height", lingoBinary("mul", _me.m_rShadowSpr.member.height, lingoBinary("div", _me.m_iScale, float(100))));
  setMeProp(_me, "m_iTimer", lingoBinary("add", _me.m_iTimer, 1));
  if (lingoBinary("eq", lingoBinary("mod", _me.m_iTimer, 3), 0)) {
  setMeProp(_me, "m_iFrame", lingoBinary("add", _me.m_iFrame, 1));
  if (lingoBinary("gt", _me.m_iFrame, 3)) {
  setMeProp(_me, "m_iFrame", 0);
  }

  setMeProp(_me, "m_iRotateDirection", lingoBinary("add", _me.m_iRotateDirection, 1));
  if (lingoBinary("gt", _me.m_iRotateDirection, 7)) {
  setMeProp(_me, "m_iRotateDirection", 0);
  }

  callMethod("setDirection", _me, _me.m_iRotateDirection)
  }

}


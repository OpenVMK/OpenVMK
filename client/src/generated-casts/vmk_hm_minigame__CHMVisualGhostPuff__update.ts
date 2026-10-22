// vmk_hm_minigame.cct / CHMVisualGhostPuff / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_iType"))) {
  callMethod("selectSprite", _me)
  }

  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", meProp(_me, "m_sMood"), "_ghst"), meProp(_me, "m_iType")), "_"), meProp(_me, "m_iDirection")), "_"), meProp(_me, "m_iFrame"));
  var t_rMem = callMethod("getaProp", meProp(_me, "m_ar_framesCache"), t_sMemName);
  if (callNamed("voidp", t_rMem)) {
  t_rMem = callNamed("member", t_sMemName);
  meProp(_me, "m_ar_framesCache")[t_sMemName] = t_rMem;
  } else {
  setThePropOf(meProp(_me, "m_rSprite"), "width", t_rMem.image.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", t_rMem.image.height);
  }

  setThePropOf(meProp(_me, "m_rSprite"), "member", t_rMem);
  setThePropOf(meProp(_me, "m_rSprite"), "flipH", meProp(_me, "m_bFlip"));
  var tloc = callMethod("GetScrPos", callMethod("getObject", _me));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", tloc.x, tloc.y));
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", tloc.z);
  setThePropOf(meProp(_me, "m_rGlow"), "loc", callNamed("point", tloc.x, tloc.y));
  setThePropOf(meProp(_me, "m_rGlow"), "locZ", lingoBinary("add", tloc.z, 1));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "loc", callNamed("point", tloc.x, tloc.y));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locZ", lingoBinary("sub", tloc.z, 1));
  setMeProp(_me, "m_iScale", lingoBinary("sub", meProp(_me, "m_iScale"), 4));
  if (lingoBinary("lte", meProp(_me, "m_iScale"), 0)) {
  callMethod("RemovePuff", callMethod("getComponent", callNamed("getThread", "hauntedmansiongame")), callMethod("getObject", _me))
  setMeProp(_me, "m_iScale", 0);
  }

  setThePropOf(meProp(_me, "m_rSprite"), "width", lingoBinary("mul", t_rMem.width, lingoBinary("div", meProp(_me, "m_iScale"), float(100))));
  setThePropOf(meProp(_me, "m_rSprite"), "height", lingoBinary("mul", t_rMem.height, lingoBinary("div", meProp(_me, "m_iScale"), float(100))));
  setThePropOf(meProp(_me, "m_rGlow"), "width", lingoBinary("mul", meProp(_me, "m_rGlow").member.width, lingoBinary("div", meProp(_me, "m_iScale"), float(100))));
  setThePropOf(meProp(_me, "m_rGlow"), "height", lingoBinary("mul", meProp(_me, "m_rGlow").member.height, lingoBinary("div", meProp(_me, "m_iScale"), float(100))));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "width", lingoBinary("mul", meProp(_me, "m_rShadowSpr").member.width, lingoBinary("div", meProp(_me, "m_iScale"), float(100))));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "height", lingoBinary("mul", meProp(_me, "m_rShadowSpr").member.height, lingoBinary("div", meProp(_me, "m_iScale"), float(100))));
  setMeProp(_me, "m_iTimer", lingoBinary("add", meProp(_me, "m_iTimer"), 1));
  if (lingoBinary("eq", lingoBinary("mod", meProp(_me, "m_iTimer"), 3), 0)) {
  setMeProp(_me, "m_iFrame", lingoBinary("add", meProp(_me, "m_iFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iFrame"), 3)) {
  setMeProp(_me, "m_iFrame", 0);
  }

  setMeProp(_me, "m_iRotateDirection", lingoBinary("add", meProp(_me, "m_iRotateDirection"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iRotateDirection"), 7)) {
  setMeProp(_me, "m_iRotateDirection", 0);
  }

  callMethod("setDirection", _me, meProp(_me, "m_iRotateDirection"))
  }

}


// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / SetMagicLocation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMagicLocation(_me: LingoMe) {
  /* global */ var pTemp = globalVar("pTemp");
  if (lingoBinary("eq", _me.m_iMagicFx, 3)) {
  setThePropOf(_me, "m_iFireworksCounter", lingoBinary("add", _me.m_iFireworksCounter, 1));
  if (lingoBinary("eq", lingoBinary("mod", _me.m_iFireworksCounter, 2), 0)) {
  setThePropOf(_me, "m_iFireworksCounter", 0);
  }

  return 0;
  }

  var i = 1;
  if (lingoBinary("lte", i, _me.m_ar_SpriteList.count)) {
  if (lingoBinary("gt", _me.m_ar_SpriteList[i].count, 0)) {
  setThePropOf(_me, "AnimCounter", lingoBinary("add", _me.m_ar_SpriteList[i].AnimCounter, 1));
  var t_iAnimCounter = _me.m_ar_SpriteList[i].AnimCounter;
  var t_iFrameCount = _me.m_ar_SpriteList[i].framelist.count;
  if (lingoBinary("gt", t_iAnimCounter, t_iFrameCount)) {
  var t_bLoop = _me.m_ar_SpriteList[i].loop;
  if (t_bLoop) {
  setThePropOf(_me, "AnimCounter", 1);
  t_iAnimCounter = 1;
  }

  setThePropOf(_me, "AnimCounter", t_iFrameCount);
  t_iAnimCounter = t_iFrameCount;
  }

  var t_rSpr = _me.m_ar_SpriteList[i].sprite;
  var t_mem = callNamed("getProp", _me.m_ar_SpriteList[i], symbol("framelist"), t_iAnimCounter);
  setThePropOf(t_rSpr, "member", t_mem);
  setThePropOf(t_rSpr, "width", t_mem.width);
  setThePropOf(t_rSpr, "height", t_mem.height);
  if (lingoBinary("neq", _me.m_iTileSize, 32)) {
  var t_iRatio = lingoBinary("div", _me.m_iTileSize, 32);
  setThePropOf(t_rSpr, "width", lingoBinary("mul", t_mem.width, t_iRatio));
  setThePropOf(t_rSpr, "height", lingoBinary("mul", t_mem.height, t_iRatio));
  }

  setThePropOf(t_rSpr, "locH", _me.m_veAvatarLoc.x);
  setThePropOf(t_rSpr, "locV", _me.m_veAvatarLoc.y);
  setThePropOf(t_rSpr, "locZ", lingoBinary("add", _me.m_veAvatarLoc.z, 200));
  setThePropOf(t_rSpr, "ink", 33);
  if (lingoBinary("eq", _me.m_iMagicFx, 35)) {
  setThePropOf(t_rSpr, "ink", 0);
  }

  if (lingoBinary("eq", _me.m_iMagicFx, 3)) {
  var t_ar_ColorList = new LingoList([callNamed("rgb", "FF4444"), callNamed("rgb", "00A5EE"), callNamed("rgb", "4BF254"), callNamed("rgb", "9F3AE7"), callNamed("rgb", "FF6420")]);
  var t_Col = t_ar_ColorList[callNamed("random", 5)];
  setThePropOf(t_rSpr, "locH", lingoBinary("add", _me.m_veAvatarLoc.x, 2));
  setThePropOf(t_rSpr, "locV", lingoBinary("sub", _me.m_veAvatarLoc.y, 40));
  setThePropOf(t_rSpr, "ink", 0);
  if ((lingoTruthy(callNamed("voidp", t_Col)) ? 0 : 1)) {
  setThePropOf(_me, "bgColor", t_Col);
  }

  }

  setThePropOf(t_rSpr, "flipH", _me.m_bFlip);
  }

  if (lingoBinary("eq", t_rSpr.m_iMagicFx, 35)) {
  setThePropOf(t_rSpr, "locV", lingoBinary("add", _me.m_veAvatarLoc.y, 3));
  setThePropOf(t_rSpr, "flipH", _me.m_bFlip);
  }

  i = lingoBinary("add", 1, i);
  }

}


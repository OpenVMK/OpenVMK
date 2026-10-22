// d0e535313898676eb605277339b50f27.cct / CMagicFactor / SetMagicLocation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMagicLocation(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 3)) {
  setMeProp(_me, "m_iFireworksCounter", lingoBinary("add", meProp(_me, "m_iFireworksCounter"), 1));
  if (lingoBinary("eq", lingoBinary("mod", meProp(_me, "m_iFireworksCounter"), 2), 0)) {
  setMeProp(_me, "m_iFireworksCounter", 0);
  } else {
  return 0;
  }

  }

  for (var i = 1; i <= meProp(_me, "m_ar_SpriteList").count; ++i) {
  if (lingoBinary("gt", meProp(_me, "m_ar_SpriteList")[i].count, 0)) {
  setThePropOf(meProp(_me, "m_ar_SpriteList")[i], "AnimCounter", lingoBinary("add", meProp(_me, "m_ar_SpriteList")[i].AnimCounter, 1));
  var t_iAnimCounter = meProp(_me, "m_ar_SpriteList")[i].AnimCounter;
  var t_iFrameCount = meProp(_me, "m_ar_SpriteList")[i].framelist.count;
  if (lingoBinary("gt", t_iAnimCounter, t_iFrameCount)) {
  var t_bLoop = meProp(_me, "m_ar_SpriteList")[i].loop;
  if (t_bLoop) {
  setThePropOf(meProp(_me, "m_ar_SpriteList")[i], "AnimCounter", 1);
  t_iAnimCounter = 1;
  } else {
  setThePropOf(meProp(_me, "m_ar_SpriteList")[i], "AnimCounter", t_iFrameCount);
  t_iAnimCounter = t_iFrameCount;
  }

  }

  var t_rSpr = meProp(_me, "m_ar_SpriteList")[i].sprite;
  var t_mem = meProp(_me, "m_ar_SpriteList")[i].framelist[t_iAnimCounter];
  setThePropOf(t_rSpr, "member", t_mem);
  setThePropOf(t_rSpr, "width", t_mem.width);
  setThePropOf(t_rSpr, "height", t_mem.height);
  if (lingoBinary("neq", meProp(_me, "m_iTileSize"), 32)) {
  var t_iRatio = lingoBinary("div", meProp(_me, "m_iTileSize"), 32);
  setThePropOf(t_rSpr, "width", lingoBinary("mul", t_mem.width, t_iRatio));
  setThePropOf(t_rSpr, "height", lingoBinary("mul", t_mem.height, t_iRatio));
  }

  setThePropOf(t_rSpr, "locH", meProp(_me, "m_veAvatarLoc").x);
  setThePropOf(t_rSpr, "locV", meProp(_me, "m_veAvatarLoc").y);
  setThePropOf(t_rSpr, "locZ", lingoBinary("add", meProp(_me, "m_veAvatarLoc").z, 200));
  setThePropOf(t_rSpr, "ink", 33);
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 3)) {
  var t_ar_ColorList = new LingoList([callNamed("rgb", "FF4444"), callNamed("rgb", "00A5EE"), callNamed("rgb", "4BF254"), callNamed("rgb", "9F3AE7"), callNamed("rgb", "FF6420")]);
  var t_Col = t_ar_ColorList[callNamed("random", 5)];
  setThePropOf(t_rSpr, "locH", lingoBinary("add", meProp(_me, "m_veAvatarLoc").x, 2));
  setThePropOf(t_rSpr, "locV", lingoBinary("sub", meProp(_me, "m_veAvatarLoc").y, 40));
  setThePropOf(t_rSpr, "ink", 0);
  if ((lingoTruthy(callNamed("voidp", t_Col)) ? 0 : 1)) {
  setThePropOf(t_rSpr, "bgColor", t_Col);
  }

  }

  setThePropOf(t_rSpr, "flipH", meProp(_me, "m_bFlip"));
  // HAND-CORRECTED: Levitation (35), from a later build's CMagicFactor_new — copy
  // ink, drawn 3px below the avatar's loc (the cloud under its feet).
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 35)) {
  setThePropOf(t_rSpr, "ink", 0);
  setThePropOf(t_rSpr, "locV", lingoBinary("add", meProp(_me, "m_veAvatarLoc").y, 3));
  }
  }

  }

}


// vmk_tutorial.cct / CPuffVisualizer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tAge = callMethod("GetParam", callMethod("getObject", _me), "Age");
  var tScale = callMethod("GetParam", callMethod("getObject", _me), "Scale");
  var tFrame = tAge;
  if (lingoBinary("gt", tFrame, meProp(_me, "m_ar_frames").count)) {
  tFrame = meProp(_me, "m_ar_frames").count;
  }

  var tPuffFrame = meProp(_me, "m_ar_frames")[tFrame];
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _me));
  if (lingoBinary("neq", meProp(_me, "m_veLastScr"), t_veScr)) {
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_fXs);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_fYs);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_fZs);
  setMeProp(_me, "m_veLastScr", t_veScr);
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, tPuffFrame)) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", tPuffFrame);
  }

  var tWidth = lingoBinary("mul", meProp(_me, "m_rSprite").member.image.width, tScale);
  if (lingoBinary("neq", meProp(_me, "m_rSprite").width, tWidth)) {
  setThePropOf(meProp(_me, "m_rSprite"), "width", tWidth);
  }

  var tHeight = lingoBinary("mul", meProp(_me, "m_rSprite").member.image.height, tScale);
  if (lingoBinary("neq", meProp(_me, "m_rSprite").height, tHeight)) {
  setThePropOf(meProp(_me, "m_rSprite"), "height", tHeight);
  }

}


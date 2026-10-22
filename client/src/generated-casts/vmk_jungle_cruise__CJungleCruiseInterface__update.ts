// vmk_jungle_cruise.cct / CJungleCruiseInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (theProperty("mouseDown")) {
  if ((lingoTruthy(meProp(_me, "m_bMouseIsDown")) ? 0 : 1)) {
  callMethod("JCMouseDown", _me)
  }

  setMeProp(_me, "m_bMouseIsDown", 1);
  } else {
  if (meProp(_me, "m_bMouseIsDown")) {
  if (lingoBinary("neq", meProp(_me, "m_exitButton").count, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_exitButton").sprite.member, meProp(_me, "m_exitButton").pressed)) {
  setThePropOf(meProp(_me, "m_exitButton").sprite, "member", meProp(_me, "m_exitButton").Active);
  setThePropOf(meProp(_me, "m_exitButton").sprite, "width", meProp(_me, "m_exitButton").sprite.member.width);
  setThePropOf(meProp(_me, "m_exitButton").sprite, "height", meProp(_me, "m_exitButton").sprite.member.height);
  }

  }

  setMeProp(_me, "m_bMouseIsDown", 0);
  }

  }

  if (callMethod("gameOn", callMethod("getComponent", _me))) {
  var tBoat = callMethod("GetBoat", callMethod("getComponent", _me));
  if (lingoBinary("neq", tBoat, 0)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetFactor", tBoat))) ? 0 : 1)) {
  if (lingoBinary("and", callMethod("GetAvatarInBoat", callMethod("getComponent", _me)), (lingoTruthy(callMethod("GetGameEnd", callMethod("getComponent", _me))) ? 0 : 1))) {
  var tSize = float(1);
  callMethod("SetLock", meProp(_me, "m_camera"), meProp(_me, "m_bAnimalsInSight"))
  callMethod("render", meProp(_me, "m_camera"))
  if (callNamed("keyPressed", 123)) {
  callMethod("GoLeft", callMethod("GetFactor", tBoat))
  }

  if (callNamed("keyPressed", 124)) {
  callMethod("GoRight", callMethod("GetFactor", tBoat))
  }

  if (callNamed("keyPressed", 126)) {
  callMethod("GoUp", callMethod("GetFactor", tBoat))
  }

  if (callNamed("keyPressed", 125)) {
  callMethod("GoDown", callMethod("GetFactor", tBoat))
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_scoreSprite"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_scoreSprite"), "loc", callNamed("point", meProp(_me, "m_scoreSprite").locH, lingoBinary("sub", meProp(_me, "m_scoreSprite").locV, 5)));
  var tBlend = lingoBinary("sub", meProp(_me, "m_scoreSprite").blend, 4);
  if (lingoBinary("lt", tBlend, 0)) {
  tBlend = 0;
  setThePropOf(meProp(_me, "m_scoreSprite").member, "image", callNamed("image", 0, 0, 8));
  setThePropOf(meProp(_me, "m_scoreSprite"), "width", meProp(_me, "m_scoreSprite").member.width);
  setThePropOf(meProp(_me, "m_scoreSprite"), "height", meProp(_me, "m_scoreSprite").member.height);
  }

  setThePropOf(meProp(_me, "m_scoreSprite"), "blend", tBlend);
  }

  }

  }

  }

}


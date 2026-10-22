// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_iState"), symbol("play"))) {
  for (var i = 1; i <= meProp(_me, "m_ar_animContainers").count; ++i) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", meProp(_me, "m_ar_pNodes")[i]));
  if ((lingoTruthy(callNamed("voidp", tSprite)) ? 0 : 1)) {
  if (lingoBinary("neq", tSprite.spriteNum, 0)) {
  var tmember = undefined;
  var tFrame = callMethod("GetAnimFrame", _me, i);
  if (lingoBinary("neq", tFrame, "")) {
  tmember = callNamed("getMember", tFrame);
  }

  if ((lingoTruthy(callNamed("voidp", tmember)) ? 0 : 1)) {
  setThePropOf(tSprite, "member", tmember);
  setThePropOf(tSprite, "width", tmember.image.width);
  setThePropOf(tSprite, "height", tmember.image.height);
  }

  }

  }

  }

  }

}


// registration.cct / CRegPage2 / attachAnimation

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function attachAnimation(_me: LingoMe, a_sElemName: LingoValue, a_sAnimMemName: LingoValue) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemName);
  if (callNamed("objectp", t_rElem)) {
  callMethod("hide", t_rElem)
  var t_rSprite = callMethod("getProperty", t_rElem, symbol("sprite"));
  if (lingoBinary("gt", t_rSprite.spriteNum, 0)) {
  var t_vPos = callNamed("vector", t_rSprite.locH, lingoBinary("sub", t_rSprite.locV, 6), t_rSprite.locZ);
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("ClearAll", t_rAnimationManager)
  callMethod("NewAnimation", t_rAnimationManager, t_vPos, a_sElemName, a_sAnimMemName, symbol("sprite"))
  }

  }

  }

}


// vmk_jungle_cruise.cct / CJungleCruiseInterface / DisplayPhotoScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayPhotoScore(_me: LingoMe, a_iAmount: LingoValue) {
  var tImage = callMethod("render", meProp(_me, "m_writer"), callNamed("string", a_iAmount));
  setThePropOf(meProp(_me, "m_scoreSprite").member, "image", tImage);
  setThePropOf(meProp(_me, "m_scoreSprite"), "width", meProp(_me, "m_scoreSprite").member.width);
  setThePropOf(meProp(_me, "m_scoreSprite"), "height", meProp(_me, "m_scoreSprite").member.height);
  setThePropOf(meProp(_me, "m_scoreSprite"), "loc", theProperty("mouseLoc"));
  setThePropOf(meProp(_me, "m_scoreSprite"), "blend", 100);
  callMethod("updateScoreinfo", _me)
}


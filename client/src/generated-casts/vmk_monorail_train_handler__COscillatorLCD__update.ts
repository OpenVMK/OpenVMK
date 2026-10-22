// vmk_monorail_train_handler.cct / COscillatorLCD / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("gte", meProp(_me, "m_iDelay"), meProp(_me, "m_iMaxDelay"))) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", meProp(_me, "m_rNode")));
  var tmember = meProp(_me, "m_arPics")[callMethod("GetFrameNum", _me)];
  setThePropOf(tSprite, "member", tmember);
  setThePropOf(tSprite, "width", tmember.image.width);
  setThePropOf(tSprite, "height", tmember.image.height);
  setMeProp(_me, "m_iDelay", 1);
  } else {
  setMeProp(_me, "m_iDelay", lingoBinary("add", meProp(_me, "m_iDelay"), 1));
  }

}


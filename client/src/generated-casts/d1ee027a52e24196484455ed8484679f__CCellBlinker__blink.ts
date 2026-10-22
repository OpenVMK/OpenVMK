// d1ee027a52e24196484455ed8484679f.cct / CCellBlinker / blink

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function blink(_me: LingoMe) {
  if (meProp(_me, "m_bToggle")) {
  var t_rBlinkImage = meProp(_me, "m_rActiveImage");
  } else {
  t_rBlinkImage = meProp(_me, "m_rNormalImage");
  }

  var t_rElementImage = callMethod("getProperty", meProp(_me, "m_rWindowElement"), symbol("image"));
  callMethod("copyPixels", t_rElementImage, t_rBlinkImage, meProp(_me, "m_rTargetRect"), t_rBlinkImage.rect)
  callMethod("setProperty", meProp(_me, "m_rWindowElement"), symbol("image"), t_rElementImage)
}


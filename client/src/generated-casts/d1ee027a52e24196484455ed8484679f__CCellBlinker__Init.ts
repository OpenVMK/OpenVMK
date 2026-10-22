// d1ee027a52e24196484455ed8484679f.cct / CCellBlinker / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, a_rImgElem: LingoValue, a_rActiveImage: LingoValue, t_pOffset: LingoValue) {
  setMeProp(_me, "m_rWindowElement", a_rImgElem);
  var t_rElementImage = callMethod("getProperty", meProp(_me, "m_rWindowElement"), symbol("image"));
  setMeProp(_me, "m_rActiveImage", a_rActiveImage);
  setMeProp(_me, "m_rNormalImage", callMethod("duplicate", a_rActiveImage));
  setMeProp(_me, "m_rTargetRect", lingoBinary("add", meProp(_me, "m_rActiveImage").rect, callNamed("rect", t_pOffset, t_pOffset)));
  callMethod("copyPixels", meProp(_me, "m_rNormalImage"), t_rElementImage, meProp(_me, "m_rNormalImage").rect, meProp(_me, "m_rTargetRect"))
  setMeProp(_me, "m_bBlinking", 1);
}


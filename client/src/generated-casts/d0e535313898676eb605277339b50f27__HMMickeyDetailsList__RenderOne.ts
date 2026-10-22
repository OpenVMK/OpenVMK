// d0e535313898676eb605277339b50f27.cct / HMMickeyDetailsList / RenderOne

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderOne(_me: LingoMe, a_iPos: LingoValue) {
  var tTopic = meProp(_me, "m_ar_pTopics")[a_iPos];
  var tImage = callMethod("getImage", tTopic);
  var tdestrect = meProp(_me, "m_ar_rects")[a_iPos];
  callMethod("copyPixels", meProp(_me, "m_Img"), tImage, tdestrect, tImage.rect)
}


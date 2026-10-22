// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponentPage / moveBlinker

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveBlinker(_me: LingoMe) {
  if (lingoBinary("and", lingoBinary("and", callNamed("objectp", meProp(_me, "m_rImgElement")), callNamed("objectp", meProp(_me, "m_ar_lastEvent"))), callNamed("objectp", meProp(_me, "m_rBlinker")))) {
  var t_rImg = callMethod("GetActive", _me).m_rRender;
  var t_rCopy = callNamed("member", "emoticon_tn_6").image;
  var t_rOffset = lingoBinary("div", lingoBinary("sub", t_rImg.rect, t_rCopy.rect), 2);
  var t_pRectOff = callNamed("point", t_rOffset.width, t_rOffset.height);
  callMethod("copyPixels", t_rImg, t_rCopy, lingoBinary("add", t_rCopy.rect, callNamed("rect", t_pRectOff, t_pRectOff)), t_rCopy.rect)
  var t_pOffset = callNamed("point", meProp(_me, "m_ar_lastEvent").rect.left, meProp(_me, "m_ar_lastEvent").rect.top);
  callMethod("Init", meProp(_me, "m_rBlinker"), meProp(_me, "m_rImgElement"), t_rImg, t_pOffset)
  } else {
  }

}


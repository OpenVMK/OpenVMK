// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemCategory / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, g: LingoValue, i: LingoValue) {
  switch (_me.Active) {
case 0:
  setMeProp(_me, "m_pBgImg", callMethod("duplicate", callNamed("member", "field.hlp.active").image));
  break;
case 1:
  setMeProp(_me, "m_pBgImg", callMethod("duplicate", callNamed("member", "field.hlp.selected").image));
  break;
  }

  var t_Img = callNamed("image", meProp(_me, "m_pBgImg").width, meProp(_me, "m_pBgImg").height, 32);
  callMethod("copyPixels", t_Img, meProp(_me, "m_pBgImg"), meProp(_me, "m_pBgImg").rect, meProp(_me, "m_pBgImg").rect)
  var t = lingoBinary("div", lingoBinary("sub", _me.pLineHeight, meProp(_me, "m_pBgImg").rect.height), 2);
  var tW = t_Img.rect.width;
  var tH = t_Img.rect.height;
  var dy = lingoBinary("add", lingoBinary("mul", i, _me.pLineHeight), t);
  var tRect = callNamed("rect", 0, dy, tW, lingoBinary("add", dy, tH));
  callMethod("copyPixels", t_Img, _me.pImg, lingoBinary("add", _me.pImg.rect, callNamed("rect", 8, 3, 8, 3)), _me.pImg.rect)
  callMethod("copyPixels", g, t_Img, tRect, t_Img.rect)
}


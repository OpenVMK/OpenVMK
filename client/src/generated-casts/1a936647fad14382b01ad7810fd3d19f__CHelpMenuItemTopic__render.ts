// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, g: LingoValue, i: LingoValue) {
  callMethod("ResolveImage", _me)
  var t_Img = callNamed("image", meProp(_me, "m_pBgImg").width, meProp(_me, "m_pBgImg").height, 32);
  callMethod("copyPixels", t_Img, meProp(_me, "m_pBgImg"), meProp(_me, "m_pBgImg").rect, meProp(_me, "m_pBgImg").rect)
  var t = lingoBinary("div", lingoBinary("sub", _me.pLineHeight, meProp(_me, "m_pBgImg").rect.height), 2);
  var tW = t_Img.rect.width;
  var tH = t_Img.rect.height;
  var dy = lingoBinary("add", lingoBinary("mul", i, _me.pLineHeight), t);
  var tRect = callNamed("rect", 0, dy, tW, lingoBinary("add", dy, tH));
  callMethod("copyPixels", t_Img, _me.pImg, lingoBinary("add", _me.pImg.rect, callNamed("rect", 8, 3, 8, 3)), _me.pImg.rect)
  var t_x = 41;
  var t_offset = callNamed("rect", t_x, 0, t_x, 0);
  callMethod("copyPixels", g, t_Img, lingoBinary("add", tRect, t_offset), t_Img.rect)
}


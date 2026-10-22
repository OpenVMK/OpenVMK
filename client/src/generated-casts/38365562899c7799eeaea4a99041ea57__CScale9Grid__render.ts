// 38365562899c7799eeaea4a99041ea57.cct / CScale9Grid / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, t_rWriter: LingoValue) {
  if (meProp(_me, "m_bNeedUpdate")) {
  var t_Img = callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 32);
  if (meProp(_me, "m_rImg").useAlpha) {
  setThePropOf(t_Img, "useAlpha", 1);
  }

  if (lingoBinary("and", meProp(_me, "m_bMask"), meProp(_me, "m_rImg").useAlpha)) {
  setMeProp(_me, "m_rImg", callMethod("extractAlpha", meProp(_me, "m_rImg")));
  }

  var t_rBgColor = meProp(_me, "m_rBgColor");
  var t_rColor = meProp(_me, "m_rColor");
  if (lingoBinary("and", lingoBinary("or", meProp(_me, "m_bActive"), meProp(_me, "m_bShowAsActive")), callNamed("objectp", meProp(_me, "m_rActiveColor")))) {
  t_rColor = meProp(_me, "m_rActiveColor");
  }

  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_bMask")) ? 0 : 1), callNamed("objectp", t_rBgColor))) {
  callMethod("fill", t_Img, t_Img.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), t_rBgColor]))
  }

  var t_rDest = callNamed("rect", 0, 0, meProp(_me, "m_rGrid").left, meProp(_me, "m_rGrid").top);
  var t_rSrc = callNamed("rect", 0, 0, meProp(_me, "m_rGrid").left, meProp(_me, "m_rGrid").top);
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", meProp(_me, "m_rGrid").left, 0, lingoBinary("sub", meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").right), meProp(_me, "m_rGrid").top);
  t_rSrc = callNamed("rect", meProp(_me, "m_rGrid").left, 0, lingoBinary("sub", meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").right), meProp(_me, "m_rGrid").top);
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", lingoBinary("sub", meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").right), 0, meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").top);
  t_rSrc = callNamed("rect", lingoBinary("sub", meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").right), 0, meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").top);
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", 0, meProp(_me, "m_rGrid").top, meProp(_me, "m_rGrid").left, lingoBinary("sub", meProp(_me, "m_iHeight"), meProp(_me, "m_rGrid").bottom));
  t_rSrc = callNamed("rect", 0, meProp(_me, "m_rGrid").top, meProp(_me, "m_rGrid").left, lingoBinary("sub", meProp(_me, "m_rImg").height, meProp(_me, "m_rGrid").bottom));
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", meProp(_me, "m_rGrid").left, meProp(_me, "m_rGrid").top, lingoBinary("sub", meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").right), lingoBinary("sub", meProp(_me, "m_iHeight"), meProp(_me, "m_rGrid").bottom));
  t_rSrc = callNamed("rect", meProp(_me, "m_rGrid").left, meProp(_me, "m_rGrid").top, lingoBinary("sub", meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").right), lingoBinary("sub", meProp(_me, "m_rImg").height, meProp(_me, "m_rGrid").bottom));
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", lingoBinary("sub", meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").right), meProp(_me, "m_rGrid").top, meProp(_me, "m_iWidth"), lingoBinary("sub", meProp(_me, "m_iHeight"), meProp(_me, "m_rGrid").bottom));
  t_rSrc = callNamed("rect", lingoBinary("sub", meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").right), meProp(_me, "m_rGrid").top, meProp(_me, "m_rImg").width, lingoBinary("sub", meProp(_me, "m_rImg").height, meProp(_me, "m_rGrid").bottom));
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", 0, lingoBinary("sub", meProp(_me, "m_iHeight"), meProp(_me, "m_rGrid").bottom), meProp(_me, "m_rGrid").left, meProp(_me, "m_iHeight"));
  t_rSrc = callNamed("rect", 0, lingoBinary("sub", meProp(_me, "m_rImg").height, meProp(_me, "m_rGrid").bottom), meProp(_me, "m_rGrid").left, meProp(_me, "m_rImg").height);
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", meProp(_me, "m_rGrid").left, lingoBinary("sub", meProp(_me, "m_iHeight"), meProp(_me, "m_rGrid").bottom), lingoBinary("sub", meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").right), meProp(_me, "m_iHeight"));
  t_rSrc = callNamed("rect", meProp(_me, "m_rGrid").left, lingoBinary("sub", meProp(_me, "m_rImg").height, meProp(_me, "m_rGrid").bottom), lingoBinary("sub", meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").right), meProp(_me, "m_rImg").height);
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  t_rDest = callNamed("rect", lingoBinary("sub", meProp(_me, "m_iWidth"), meProp(_me, "m_rGrid").right), lingoBinary("sub", meProp(_me, "m_iHeight"), meProp(_me, "m_rGrid").bottom), meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"));
  t_rSrc = callNamed("rect", lingoBinary("sub", meProp(_me, "m_rImg").width, meProp(_me, "m_rGrid").right), lingoBinary("sub", meProp(_me, "m_rImg").height, meProp(_me, "m_rGrid").bottom), meProp(_me, "m_rImg").width, meProp(_me, "m_rImg").height);
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImg"), t_rDest, t_rSrc, new LingoPropList([symbol("ink"), meProp(_me, "m_iInk")]))
  if (lingoBinary("and", meProp(_me, "m_bMask"), (lingoTruthy(meProp(_me, "m_rImg").useAlpha) ? 0 : 1))) {
  var t_mask = callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 8, symbol("grayscale"));
  callMethod("copyPixels", t_mask, t_Img, t_Img.rect, t_Img.rect)
  callMethod("fill", t_Img, t_Img.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), t_rColor]))
  callMethod("setAlpha", t_Img, t_mask)
  setThePropOf(t_Img, "useAlpha", 1);
  }

  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "m_rIcon")), symbol("image"))) {
  var pImg = meProp(_me, "m_rIcon");
  var t_h = lingoBinary("div", lingoBinary("sub", t_Img.rect.height, pImg.rect.height), 2);
  var t_w = lingoBinary("div", lingoBinary("sub", t_Img.rect.width, pImg.rect.width), 2);
  var t_rOffset = callNamed("rect", callNamed("point", t_w, t_h), callNamed("point", t_w, t_h));
  callMethod("copyPixels", t_Img, pImg, lingoBinary("add", t_rOffset, pImg.rect), pImg.rect, new LingoPropList([symbol("ink"), 36, symbol("maskImage"), callMethod("extractAlpha", pImg)]))
  }

  if (lingoBinary("and", lingoBinary("neq", meProp(_me, "m_sTxt"), ""), (lingoTruthy(callNamed("voidp", meProp(_me, "m_sTxt"))) ? 0 : 1))) {
  setThePropOf(t_rWriter, "font", meProp(_me, "m_sFont"));
  setThePropOf(t_rWriter, "fontSize", meProp(_me, "m_iFontSize"));
  setThePropOf(t_rWriter, "antialias", meProp(_me, "m_bAntiAlias"));
  setThePropOf(t_rWriter, "text", callNamed("string", meProp(_me, "m_sTxt")));
  pImg = callMethod("duplicate", t_rWriter.image);
  if (lingoBinary("eq", meProp(_me, "m_sTxtAlignV"), "TOP")) {
  t_h = 0;
  } else {
  t_h = lingoBinary("div", lingoBinary("sub", t_Img.rect.height, pImg.rect.height), 2);
  }

  if (lingoBinary("eq", meProp(_me, "m_sTxtAlignH"), "CENTER")) {
  var t_iTxtWidth = callMethod("charPosToLoc", t_rWriter, lingoBinary("add", t_rWriter.text.length, 1)).locH;
  t_w = lingoBinary("div", lingoBinary("sub", t_Img.rect.width, t_iTxtWidth), 2);
  } else {
  t_w = 5;
  }

  t_rOffset = callNamed("rect", callNamed("point", t_w, t_h), callNamed("point", t_w, t_h));
  callMethod("copyPixels", t_Img, pImg, lingoBinary("add", t_rOffset, pImg.rect), pImg.rect, new LingoPropList([symbol("maskImage"), callMethod("extractAlpha", pImg)]))
  }

  if (meProp(_me, "m_bShowBorder")) {
  callMethod("draw", t_Img, lingoBinary("add", t_Img.rect, new LingoList([-float(0), -float(0), 0, 0])), new LingoPropList([symbol("color"), meProp(_me, "m_rHiliterCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  }

  setMeProp(_me, "m_rRender", t_Img);
  setMeProp(_me, "m_bNeedUpdate", 0);
  }

  return meProp(_me, "m_rRender");
}


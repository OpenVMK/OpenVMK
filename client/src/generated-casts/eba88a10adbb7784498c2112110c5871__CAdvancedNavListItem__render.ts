// eba88a10adbb7784498c2112110c5871.cct / CAdvancedNavListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterID"));
  var t_pImage = callMethod("render", tWriter, meProp(_me, "m_tText"));
  var t_Img = callMethod("duplicate", meProp(_me, "m_ImgBg").image);
  setThePropOf(t_Img, "useAlpha", 0);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", 5, 2, lingoBinary("add", t_pImage.width, 5), lingoBinary("add", t_pImage.height, 2)), t_pImage.rect)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pLinkedPage"))) ? 0 : 1)) {
  if (callNamed("integerp", meProp(_me, "m_pLinkedPage")["instanuserpercent"])) {
  var t_rIconImg = callNamed("getMember", "roomspace.indicator").image;
  var t_iPercent = meProp(_me, "m_pLinkedPage")["instanuserpercent"];
  var t_iCount = 0;
  if (lingoBinary("and", lingoBinary("gt", t_iPercent, 0), lingoBinary("lte", t_iPercent, 50))) {
  t_iCount = 1;
  } else {
  if (lingoBinary("and", lingoBinary("gt", t_iPercent, 50), lingoBinary("lt", t_iPercent, 100))) {
  t_iCount = 2;
  } else {
  if (lingoBinary("gte", t_iPercent, 100)) {
  t_iCount = 3;
  if (lingoBinary("gte", t_iPercent, 120)) {
  t_rIconImg = callNamed("getMember", "roomspace.indicator.full").image;
  }

  }

  }

  }

  if (lingoBinary("gt", t_iCount, 0)) {
  var t_iLeft = 155;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("copyPixels", t_Img, t_rIconImg, lingoBinary("add", t_rIconImg.rect, new LingoList([t_iLeft, 1, t_iLeft, 1])), t_rIconImg.rect, new LingoPropList([symbol("ink"), 36]))
  t_iLeft = lingoBinary("add", lingoBinary("add", t_iLeft, t_rIconImg.width), 2);
  }

  }

  }

  }

  setMeProp(_me, "m_Img", t_Img);
}


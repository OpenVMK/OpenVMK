// eba88a10adbb7784498c2112110c5871.cct / CGuestNavListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var t_fillColor = callNamed("rgb", "#001F55");
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterID"));
  if ((lingoTruthy(meProp(_me, "m_bVisibleInNavi")) ? 0 : 1)) {
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", 250, 10, 50))
  } else {
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", 250, 250, 250))
  if (lingoBinary("eq", meProp(_me, "m_pLinkedPage")["friendOnly"], 1)) {
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", "#99EE3C"))
  } else {
  if (lingoBinary("eq", meProp(_me, "m_pLinkedPage")["friendOnly"], 2)) {
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", "#FFFF25"))
  } else {
  if (lingoBinary("eq", meProp(_me, "m_pLinkedPage")["friendOnly"], 3)) {
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", "#FF6CFF"))
  }

  }

  }

  }

  var t_pImage = callMethod("render", tWriter, meProp(_me, "m_tText"));
  var t_Img = callMethod("duplicate", meProp(_me, "m_ImgBg").image);
  setThePropOf(t_Img, "useAlpha", 0);
  var t_x = 60;
  var t_y = 0;
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", t_x, t_y, lingoBinary("add", t_pImage.width, t_x), lingoBinary("add", t_pImage.height, t_y)), t_pImage.rect)
  setMeProp(_me, "m_Img", t_Img);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pLinkedPage"))) ? 0 : 1)) {
  if (callNamed("integerp", meProp(_me, "m_pLinkedPage")["UserCount"])) {
  var t_rIconImg = callNamed("getMember", "roomspace.indicator").image;
  var t_iPercent = meProp(_me, "m_pLinkedPage")["UserCount"];
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
  var t_iLeft = 4;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("copyPixels", t_Img, t_rIconImg, lingoBinary("add", t_rIconImg.rect, new LingoList([t_iLeft, 3, t_iLeft, 3])), t_rIconImg.rect, new LingoPropList([symbol("ink"), 36]))
  t_iLeft = lingoBinary("add", lingoBinary("add", t_iLeft, t_rIconImg.width), 2);
  }

  }

  }

  }

  setMeProp(_me, "m_Img", t_Img);
}


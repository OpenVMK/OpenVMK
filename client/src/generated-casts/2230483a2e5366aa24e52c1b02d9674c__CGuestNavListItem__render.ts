// 2230483a2e5366aa24e52c1b02d9674c.cct / CGuestNavListItem / render

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
  var tWriter = callNamed("getWriter", _me.m_sWriterID);
  if ((lingoTruthy(_me.m_bVisibleInNavi) ? 0 : 1)) {
  callNamed("trace", "not visible in navi")
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", 250, 10, 50))
  }

  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", 250, 250, 250))
  callNamed("trace", "setting default colour")
  if (lingoBinary("eq", _me.m_pLinkedPage["friendOnly"], 1)) {
  callNamed("trace", "- friends only 1")
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", "#99EE3C"))
  } else {
  if (lingoBinary("eq", _me.m_pLinkedPage["friendOnly"], 2)) {
  callNamed("trace", "- friendso nly 2")
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", "#FFFF25"))
  } else {
  if (lingoBinary("eq", _me.m_pLinkedPage["friendOnly"], 3)) {
  callNamed("trace", "-friendso nly 3")
  callMethod("setProperty", tWriter, symbol("color"), callNamed("rgb", "#FF6CFF"))
  }

  }

  }

  var t_pImage = callNamed("render", tWriter, _me.m_tText);
  var t_Img = callNamed("duplicate", _me.m_ImgBg.image);
  setThePropOf(_me, "useAlpha", 0);
  var t_x = 60;
  var t_y = 0;
  callNamed("copyPixels", t_Img, t_pImage, callNamed("rect", t_x, t_y, lingoBinary("add", t_pImage.width, t_x), lingoBinary("add", t_pImage.height, t_y)), t_pImage.rect)
  setThePropOf(_me, "m_Img", t_Img);
  if ((lingoTruthy(callNamed("voidp", _me.m_pLinkedPage)) ? 0 : 1)) {
  if (callNamed("integerp", _me.m_pLinkedPage["UserCount"])) {
  var t_rIconImg = callNamed("getMember", "roomspace.indicator").image;
  var t_iPercent = _me.m_pLinkedPage["UserCount"];
  var t_iCount = 0;
  if (lingoBinary("and", lingoBinary("lte", t_iPercent, 50), lingoBinary("gt", t_iPercent, 0))) {
  t_iCount = 1;
  } else {
  if (lingoBinary("and", lingoBinary("lt", t_iPercent, 100), lingoBinary("gt", t_iPercent, 50))) {
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
  callNamed("copyPixels", t_Img, t_rIconImg, lingoBinary("add", t_rIconImg.rect, new LingoList([t_iLeft, 3, t_iLeft, 3])), t_rIconImg.rect, callNamed("propList", symbol("ink"), 0))
  t_iLeft = lingoBinary("add", lingoBinary("add", t_iLeft, t_rIconImg.width), 2);
  }

  setThePropOf(_me, "m_Img", t_Img);
  }

  }

  }

}


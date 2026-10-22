// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreen / FeedBackground

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FeedBackground(_me: LingoMe, _this: LingoValue) {
  var t_rWnd = callNamed("getWindow", "room_custom_load_wnd");
  var t_mpBgConf = meProp(_me, "m_arConf")[4];
  var t_rBgElem = callMethod("getElement", t_rWnd, "loading.image.bg");
  var t_sBgColor = "#000000";
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpBgConf, symbol("color")))) ? 0 : 1)) {
  t_sBgColor = callMethod("getaProp", t_mpBgConf, symbol("color"));
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpBgConf, symbol("img")))) ? 0 : 1)) {
  var tImage = callNamed("getMember", callMethod("getaProp", t_mpBgConf, symbol("img"))).image;
  var tDestImage = callNamed("image", callMethod("getProperty", t_rBgElem, symbol("width")), callMethod("getProperty", t_rBgElem, symbol("height")), tImage.depth);
  if (lingoBinary("eq", callMethod("getaProp", t_mpBgConf, symbol("vAlign")), symbol("bottom"))) {
  var t_offSetY = lingoBinary("sub", tDestImage.height, tImage.height);
  } else {
  t_offSetY = 0;
  }

  callMethod("fill", tDestImage, tDestImage.rect, new LingoPropList([symbol("color"), callNamed("rgb", t_sBgColor), symbol("shapeType"), symbol("fill")]))
  var tdestrect = callNamed("rect", 0, t_offSetY, tImage.width, lingoBinary("add", tImage.height, t_offSetY));
  callMethod("copyPixels", tDestImage, tImage, tdestrect, tImage.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  callMethod("feedImage", t_rBgElem, tDestImage)
  } else {
  callMethod("setProperty", t_rBgElem, symbol("bgColor"), callNamed("rgb", t_sBgColor))
  callMethod("clearImage", t_rBgElem)
  }

}


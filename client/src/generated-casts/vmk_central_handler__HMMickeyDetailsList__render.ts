// vmk_central_handler.cct / HMMickeyDetailsList / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  setMeProp(_me, "m_ar_rects", new LingoList([]));
  callNamed("call", symbol("render"), meProp(_me, "m_ar_pTopics"))
  var t_iHeight = 0;
  for (var e = 1; e <= meProp(_me, "m_ar_pTopics").count; ++e) {
  var tImage = callMethod("getImage", meProp(_me, "m_ar_pTopics")[e]);
  t_iHeight = lingoBinary("add", t_iHeight, lingoBinary("add", tImage.height, 1));
  }

  setMeProp(_me, "m_Img", callNamed("image", callMethod("getProperty", meProp(_me, "m_rClientElement"), symbol("width")), t_iHeight, 32));
  callMethod("fill", meProp(_me, "m_Img"), meProp(_me, "m_Img").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), meProp(_me, "m_fillColor")]))
  var t_PrevTop = 1;
  var i = 0;
  for (var tTopic of meProp(_me, "m_ar_pTopics").toArray()) {
  tImage = callMethod("getImage", tTopic);
  var t_iMArgin = 1;
  t_iHeight = tImage.height;
  var tdestrect = callNamed("rect", t_iMArgin, t_PrevTop, lingoBinary("add", t_iMArgin, tImage.rect.right), lingoBinary("add", t_PrevTop, tImage.rect.bottom));
  callMethod("add", meProp(_me, "m_ar_rects"), tdestrect)
  callMethod("copyPixels", meProp(_me, "m_Img"), tImage, tdestrect, tImage.rect)
  t_PrevTop = lingoBinary("add", tdestrect.bottom, 1);
  i = lingoBinary("add", i, 1);
  }

}


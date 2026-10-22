// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  setMeProp(_me, "m_ar_rects", new LingoPropList([]));
  callNamed("call", symbol("render"), meProp(_me, "m_ar_pTopics"))
  var t_iHeight = 0;
  for (var e = 1; e <= meProp(_me, "m_ar_pTopics").count; ++e) {
  var tImage = callMethod("getImage", meProp(_me, "m_ar_pTopics")[e]);
  t_iHeight = lingoBinary("add", t_iHeight, lingoBinary("add", tImage.height, 2));
  }

  setMeProp(_me, "m_Img", callNamed("image", 215, t_iHeight, 8));
  callMethod("fill", meProp(_me, "m_Img"), meProp(_me, "m_Img").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), meProp(_me, "m_fillColor")]))
  var t_PrevRect = 2;
  var i = 0;
  for (var tTopic of meProp(_me, "m_ar_pTopics").toArray()) {
  tImage = callMethod("getImage", tTopic);
  var t_iMArgin = callMethod("GetMargin", tTopic);
  t_iHeight = tImage.height;
  var tdestrect = callNamed("rect", t_iMArgin, t_PrevRect, lingoBinary("add", t_iMArgin, tImage.rect.right), lingoBinary("add", t_PrevRect, tImage.rect.bottom));
  if (lingoBinary("eq", callMethod("GetType", tTopic), 2)) {
  var t_iID = callMethod("getLink", tTopic);
  } else {
  t_iID = callMethod("getLand", tTopic);
  }

  callMethod("addProp", meProp(_me, "m_ar_rects"), t_iID, tdestrect)
  callMethod("copyPixels", meProp(_me, "m_Img"), tImage, tdestrect, tImage.rect)
  t_PrevRect = lingoBinary("add", tdestrect.bottom, 2);
  i = lingoBinary("add", i, 1);
  }

}


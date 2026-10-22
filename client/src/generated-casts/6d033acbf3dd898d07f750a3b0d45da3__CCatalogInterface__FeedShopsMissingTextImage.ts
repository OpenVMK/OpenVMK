// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / FeedShopsMissingTextImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FeedShopsMissingTextImage(_me: LingoMe, _this: LingoValue, a_rClientElement: LingoValue) {
  var tWidth = callMethod("getProperty", a_rClientElement, symbol("width"));
  var tHeight = callMethod("getProperty", a_rClientElement, symbol("height"));
  var tRect = callNamed("rect", 0, 0, tWidth, tHeight);
  if ((lingoTruthy(callNamed("writerExists", meProp(_me, "m_sShopsMissingWriter"))) ? 0 : 1)) {
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 255, 255, 255), symbol("fixedLineSpace"), 12, symbol("wordWrap"), 1, symbol("rect"), tRect]);
  callNamed("createWriter", meProp(_me, "m_sShopsMissingWriter"), tMetrics)
  }

  var tImg = callMethod("render", callNamed("getWriter", meProp(_me, "m_sShopsMissingWriter")), callNamed("getText", "cat.visitshops"));
  var tTempImg = callNamed("image", tRect.width, tRect.height, 32);
  callMethod("fill", tTempImg, tRect, new LingoPropList([symbol("color"), callNamed("rgb", "#001F56"), symbol("shapeType"), symbol("rect")]))
  callMethod("copyPixels", tTempImg, tImg, tRect, tRect, new LingoPropList([symbol("ink"), 36]))
  callMethod("feedImage", a_rClientElement, tTempImg)
}


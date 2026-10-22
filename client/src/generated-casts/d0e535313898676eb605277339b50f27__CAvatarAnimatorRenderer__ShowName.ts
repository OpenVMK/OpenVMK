// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / ShowName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowName(_me: LingoMe, a_sAvatarName: LingoValue, a_kEvent: LingoValue) {
  var t_sPrevEvent = meProp(_me, "m_sNameTagEvent");
  setMeProp(_me, "m_sNameTagEvent", a_kEvent);
  if (lingoBinary("neq", t_sPrevEvent, meProp(_me, "m_sNameTagEvent"))) {
  setMeProp(_me, "m_bNameTagShown", lingoBinary("eq", a_kEvent, symbol("mouseEnter")));
  } else {
  return;
  }

  if (lingoBinary("neq", a_sAvatarName, undefined)) {
  var t_ShirtCol = callMethod("GetShirtColor", _me);
  setMeProp(_me, "m_sNameTagWnd", lingoBinary("join", "NameTag", a_sAvatarName));
  if ((lingoTruthy(callNamed("windowExists", meProp(_me, "m_sNameTagWnd"))) ? 0 : 1)) {
  callNamed("createWindow", meProp(_me, "m_sNameTagWnd"))
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sNameTagWnd"));
  callMethod("merge", t_rWnd, "vmk_mouseover.window")
  } else {
  t_rWnd = callNamed("getWindow", meProp(_me, "m_sNameTagWnd"));
  }

  callMethod("setProperty", t_rWnd, symbol("visible"), meProp(_me, "m_bNameTagShown"))
  setThePropOf(callMethod("getProperty", callMethod("getElement", t_rWnd, "bubble.color"), symbol("sprite")), "bgColor", t_ShirtCol);
  if ((lingoTruthy(callNamed("writerExists", lingoBinary("join", "NameTagWriter", a_sAvatarName))) ? 0 : 1)) {
  var tBold = callNamed("getStructVariable", "struct.font.chat.bold");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tBold, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tBold, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("fixedLineSpace"), 12]);
  callNamed("createWriter", lingoBinary("join", "NameTagWriter", a_sAvatarName), tMetrics)
  setMeProp(_me, "m_rWriterName", callNamed("getWriter", lingoBinary("join", "NameTagWriter", a_sAvatarName)));
  var t_ChatImg = callMethod("render", meProp(_me, "m_rWriterName"), lingoBinary("join", callNamed("space"), a_sAvatarName));
  var t_iWidht = t_ChatImg.width;
  var t_iHeight = t_ChatImg.height;
  var t_rChatImg = callNamed("image", lingoBinary("add", t_iWidht, 4), t_iHeight, 32);
  callMethod("copyPixels", t_rChatImg, t_ChatImg, callNamed("rect", 3, 0, lingoBinary("add", t_iWidht, 2), t_iHeight), t_ChatImg.rect)
  var t_rImgElem = callMethod("getElement", t_rWnd, "avatar.mouseover");
  var t_iCurWidth = callMethod("getProperty", t_rImgElem, symbol("width"));
  var t_iCurHeight = callMethod("getProperty", t_rImgElem, symbol("height"));
  var t_iOffWidth = lingoBinary("sub", t_rChatImg.width, t_iCurWidth);
  var t_iOffHeight = lingoBinary("sub", t_rChatImg.height, t_iCurHeight);
  callMethod("ResizeBy", t_rWnd, t_iOffWidth, t_iOffHeight)
  callMethod("feedImage", t_rImgElem, t_rChatImg)
  }

  if (meProp(_me, "m_bNameTagShown")) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iLoc"))) ? 0 : 1)) {
  t_rImgElem = callMethod("getElement", t_rWnd, "avatar.mouseover");
  t_iCurWidth = callMethod("getProperty", t_rImgElem, symbol("width"));
  if (meProp(_me, "m_bActSit")) {
  var t_iV = lingoBinary("add", lingoBinary("sub", meProp(_me, "m_iLoc").y, lingoBinary("mul", meProp(_me, "m_iTileSize"), 5.28)), 29);
  } else {
  t_iV = lingoBinary("sub", meProp(_me, "m_iLoc").y, lingoBinary("mul", meProp(_me, "m_iTileSize"), 5.28));
  }

  var t_iH = lingoBinary("sub", meProp(_me, "m_iLoc").x, lingoBinary("add", lingoBinary("div", t_iCurWidth, 2), 6));
  callMethod("moveTo", t_rWnd, t_iH, t_iV)
  }

  }

  if (meProp(_me, "m_bShowArrow")) {
  callMethod("ShowArrow", _me)
  }

  }

}


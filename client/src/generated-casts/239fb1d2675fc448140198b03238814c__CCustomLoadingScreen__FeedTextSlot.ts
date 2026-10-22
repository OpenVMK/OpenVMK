// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreen / FeedTextSlot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FeedTextSlot(_me: LingoMe, _this: LingoValue, a_iSlot: LingoValue) {
  var t_rWnd = callNamed("getWindow", "room_custom_load_wnd");
  var t_mpSlotConf = meProp(_me, "m_arConf")[a_iSlot];
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpSlotConf, symbol("text")))) ? 0 : 1)) {
  var t_rElement = callMethod("getElement", t_rWnd, lingoBinary("join", "loadingscreen.headline", a_iSlot));
  var t_sText = callNamed("replaceChunks", callMethod("getaProp", t_mpSlotConf, symbol("text")), "\\r", "\r");
  var t_sFontName = callMethod("getaProp", t_mpSlotConf, symbol("font"));
  var t_sTextColor = callMethod("getaProp", t_mpSlotConf, symbol("color"));
  var t_sTextStyle = callMethod("getaProp", t_mpSlotConf, symbol("style"));
  var t_iTextSize = callMethod("getaProp", t_mpSlotConf, symbol("size"));
  if (callNamed("voidp", t_sFontName)) {
  t_sFontName = "Folio BoldCondensed *";
  }

  if (callNamed("voidp", t_sTextColor)) {
  t_sTextColor = "#FEFEFE";
  }

  if (callNamed("voidp", t_sTextStyle)) {
  t_sTextStyle = "#plain";
  }

  if (callNamed("voidp", t_iTextSize)) {
  t_iTextSize = 12;
  }

  var tFontData = new LingoPropList([symbol("font"), t_sFontName, symbol("fontSize"), t_iTextSize, symbol("lineHeight"), t_iTextSize, symbol("color"), callNamed("rgb", t_sTextColor), symbol("ilk"), symbol("struct"), symbol("fontStyle"), new LingoList([callNamed("symbol", t_sTextStyle)])]);
  callMethod("setFont", t_rElement, tFontData)
  var t_iMTop = callNamed("value", callMethod("getaProp", t_mpSlotConf, symbol("mtop")));
  var t_iMBottom = callNamed("value", callMethod("getaProp", t_mpSlotConf, symbol("mbottom")));
  var t_iMLeft = callNamed("value", callMethod("getaProp", t_mpSlotConf, symbol("mleft")));
  var t_iMRight = callNamed("value", callMethod("getaProp", t_mpSlotConf, symbol("mright")));
  var t_member = callMethod("getProperty", t_rElement, symbol("member"));
  var t_newrect = callNamed("rect", 0, 0, lingoBinary("sub", lingoBinary("sub", t_member.width, t_iMLeft), t_iMRight), lingoBinary("sub", lingoBinary("sub", t_member.height, t_iMBottom), t_iMTop));
  callMethod("setProperty", t_rElement, symbol("width"), t_newrect.width)
  callMethod("setProperty", t_rElement, symbol("height"), t_newrect.height)
  setThePropOf(t_rElement, "pOwnW", t_newrect.width);
  setThePropOf(t_rElement, "pOwnH", t_newrect.height);
  callMethod("setText", t_rElement, t_sText)
  callMethod("moveBy", t_rElement, t_iMLeft, t_iMTop)
  callMethod("fixAntialiasing", _this, "room_custom_load_wnd", lingoBinary("join", "loadingscreen.headline", a_iSlot), 1)
  } else {
  callMethod("hide", callMethod("getElement", t_rWnd, lingoBinary("join", "loadingscreen.headline", a_iSlot)))
  }

}


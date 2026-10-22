// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / SetVisibleElements

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetVisibleElements(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("setText", callMethod("getElement", tWndObj, "nav.roominfo.owner"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "nav.roominfo.description"), "")
  callMethod("clearPopulation", _me)
  switch (meProp(_me, "m_page")) {
case symbol("popular"):
  callMethod("show", callMethod("getElement", tWndObj, "nav.roomsearch.field"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.searchfield.bg"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.searchrooms.button"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.deleteroom.button"))
  callMethod("setButtonState", _me, "nav.gotoroom.button", 0)
  callMethod("setButtonState", _me, "nav.modifyroom.button", 0)
  break;
case symbol("friends"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.roomsearch.field"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.searchfield.bg"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.searchrooms.button"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.deleteroom.button"))
  callMethod("setButtonState", _me, "nav.gotoroom.button", 0)
  callMethod("setButtonState", _me, "nav.modifyroom.button", 0)
  break;
case symbol("own"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.roomsearch.field"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.searchfield.bg"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.searchrooms.button"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.deleteroom.button"))
  callMethod("setButtonState", _me, "nav.gotoroom.button", 0)
  callMethod("setButtonState", _me, "nav.modifyroom.button", 0)
  break;
  }

  var t_rElement = callMethod("getElement", tWndObj, "nav.roomlist");
  if (lingoBinary("neq", t_rElement, 0)) {
  var tRect = callMethod("getProperty", t_rElement, symbol("rect"));
  var t_rTmp = callNamed("image", tRect.width, tRect.height, 32);
  callMethod("fill", t_rTmp, t_rTmp.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#001F55")]))
  callMethod("feedImage", t_rElement, t_rTmp)
  }

}


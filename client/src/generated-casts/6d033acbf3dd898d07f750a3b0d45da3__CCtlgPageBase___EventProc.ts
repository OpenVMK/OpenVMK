// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "cat.tab.furniture.passive":
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("furniture"))
  }

  break;
case "cat.tab.rooms.passive":
  if (callNamed("listp", meProp(_me, "m_mp_RoomDataList"))) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callMethod("_ChangePage", _this, symbol("rooms"))
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  }

  }

  break;
case "cat.tab.pins.passive":
  if (callNamed("listp", meProp(_me, "m_mp_RoomDataList"))) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callMethod("_ChangePage", _this, symbol("pins"))
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  }

  }

  break;
case "cat.tab.clothes.passive":
  if (callNamed("listp", meProp(_me, "m_mp_RoomDataList"))) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callMethod("_ChangePage", _this, symbol("clothes"))
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  }

  }

  break;
case "cat.tab.posters.passive":
  if (callNamed("listp", meProp(_me, "m_mp_RoomDataList"))) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callMethod("_ChangePage", _this, symbol("posters"))
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  }

  }

  break;
case "cat.tab.specials.passive":
  if (callNamed("listp", meProp(_me, "m_mp_RoomDataList"))) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callMethod("_ChangePage", _this, symbol("specials"))
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  }

  }

  break;
case "close":
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("CloseCatalog", callNamed("getThread", symbol("Catalog"))._interface)
  }

  break;
case "help":
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  callNamed("put", meProp(_me, "m_iCurPageName"))
  switch (meProp(_me, "m_iCurPageName")) {
case symbol("items"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.shopping")
  break;
case symbol("rooms"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.shopping")
  break;
  default:
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.shopping")
  }

  }

  break;
  /*
   * ⚠ HAND-CORRECTED: the forward to the page/view is the `otherwise:` branch.
   * The decompiler printed it AFTER `end case`, so it ran for every element;
   * in the bytecode the handled branches jump past it to `ret`. Forwarding
   * everything made a page's own handler fire too (see CInvPageBase._EventProc:
   * the Stuff "?" opened help and the page's `ui_help` toggled it shut).
   */
  default:
    return callNamed("call", symbol("_EventProc"), new LingoList([meProp(_me, "m_rCurPageObj")]), a_kEvent, a_sElem, a_vParam);
  }
}

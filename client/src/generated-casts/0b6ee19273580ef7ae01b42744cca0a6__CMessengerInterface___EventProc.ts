// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_rParam: LingoValue) {
  switch (a_sElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("showHide", _me)
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.messaging.guide")
  break;
case "mes.tab.friends.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("changeView", _me, "friendlist")
  break;
case "mes.tab.messages.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("changeView", _me, "messagesnew")
  break;
  /*
   * ⚠ HAND-CORRECTED: the forward to the page/view is the `otherwise:` branch.
   * The decompiler printed it AFTER `end case`, so it ran for every element;
   * in the bytecode the handled branches jump past it to `ret`. Forwarding
   * everything made a page's own handler fire too (see CInvPageBase._EventProc:
   * the Stuff "?" opened help and the page's `ui_help` toggled it shut).
   */
  default:
    return callMethod("_EventProc", meProp(_me, "m_rCurrentView"), a_kEvent, a_sElemID, a_rParam);
  }
}

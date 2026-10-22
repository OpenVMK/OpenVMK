// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPageBase / _EventProc

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
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("CloseAvatarBuilder", callNamed("getThread", symbol("AvatarFactory"))._interface)
  break;
case "help":
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (meProp(_me, "m_iCurrentPage")) {
case symbol("avatar"):
  callNamed("executeMessage", symbol("open_help_page"), "help.character.sig")
  break;
  default:
  callNamed("executeMessage", symbol("open_help_page"), "help.character.look")
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

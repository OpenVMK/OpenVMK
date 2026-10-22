// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / _EventProc

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
case "inv.tab.credits.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("credits"))
  break;
case "inv.tab.furniture.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("items"))
  break;
case "inv.tab.pins.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("pins"))
  break;
case "inv.tab.clothes.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("clothes"))
  break;
case "inv.tab.posters.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("posters"))
  break;
case "inv.tab.codes.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("_ChangePage", _this, symbol("code"))
  break;
case "close":
  callMethod("close", _this)
  switch (meProp(_me, "m_kCurPageName")) {
case symbol("credits"):
  break;
case symbol("items"):
  break;
case symbol("posters"):
  break;
case symbol("pins"):
  break;
case symbol("clothes"):
  break;
case symbol("code"):
  callMethod("close", meProp(_me, "m_rCurPageObj"))
  break;
  }

  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  break;
case "help":
  switch (meProp(_me, "m_kCurPageName")) {
case symbol("credits"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.credits")
  break;
case symbol("items"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.furniture")
  break;
case symbol("posters"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.posters")
  break;
case symbol("pins"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.pins")
  break;
case symbol("clothes"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.clothes")
  break;
case symbol("code"):
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.codes")
  break;
  default:
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.shopping")
  }

  break;
  /*
   * ⚠ HAND-CORRECTED: the forward to the page is the `otherwise:` branch.
   * The decompiler printed `return call(#_EventProc, [m_rCurPageObj], …)` AFTER
   * `end case`, so it ran for EVERY element. The bytecode says otherwise: the
   * "help" branch ends `[0427] jmp 27` -> `[0454] pop; ret`, skipping the call at
   * [0430]-[0452], which only the fall-through reaches. Forwarding everything
   * made a page's own handler fire as well — the Pins page answers "help" with
   * `executeMessage("ui_help", …)`, which TOGGLED the help window shut the
   * instant `#open_help_page` had opened it: the Stuff window's "?" did nothing.
   * Same decompiler defect family as `_ChangePage` / `_UpdateProcess`.
   */
  default:
    return callNamed("call", symbol("_EventProc"), new LingoList([meProp(_me, "m_rCurPageObj")]), a_kEvent, a_sElem, a_vParam);
  }
}


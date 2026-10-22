// vmk_pirates_game.cct / CPiratesMessageBar / setRedVault

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRedVault(_me: LingoMe, a_iVault: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  switch (meProp(_me, "m_iGameMode")) {
case 1:
  var t_rElem = callMethod("getElement", tWndObj, "vault.portroyal");
  break;
case 2:
  t_rElem = callMethod("getElement", tWndObj, "gold.vault");
  break;
  default:
  t_rElem = callMethod("getElement", tWndObj, "vault.portroyal");
  }

  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, a_iVault)
  }

  }

}


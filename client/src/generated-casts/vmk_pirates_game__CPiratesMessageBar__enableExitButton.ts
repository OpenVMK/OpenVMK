// vmk_pirates_game.cct / CPiratesMessageBar / enableExitButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enableExitButton(_me: LingoMe, a_bVisible: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  if ((lingoTruthy(a_bVisible) ? 0 : 1)) {
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.exitgame.button"))
  } else {
  callMethod("show", callMethod("getElement", tWndObj, "pirates.exitgame.button"))
  }

  var t_rElem = callMethod("getElement", tWndObj, "pirates.dropflag.button");
  if (callNamed("objectp", t_rElem)) {
  if ((lingoTruthy(a_bVisible) ? 0 : 1)) {
  callMethod("hide", t_rElem)
  } else {
  callMethod("show", t_rElem)
  }

  }

  if ((lingoTruthy(a_bVisible) ? 0 : 1)) {
  callNamed("removeDialogWindow", "pirates_exit")
  }

  }

}


// vmk_hm_lobby_handler.cct / CHMLobbyInterface / SetScrollArrows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetScrollArrows(_me: LingoMe) {
  var tGameCount = callMethod("GetGameList", meProp(_me, "m_rLobby")).count;
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if (lingoBinary("gt", meProp(_me, "m_iListDisplayOffset"), 1)) {
  callMethod("show", callMethod("getElement", tWndObj, "button.previous"))
  } else {
  callMethod("hide", callMethod("getElement", tWndObj, "button.previous"))
  }

  if (lingoBinary("gt", lingoBinary("sub", tGameCount, 1), meProp(_me, "m_iListDisplayOffset"))) {
  callMethod("show", callMethod("getElement", tWndObj, "button.next"))
  } else {
  callMethod("hide", callMethod("getElement", tWndObj, "button.next"))
  }

  }

}


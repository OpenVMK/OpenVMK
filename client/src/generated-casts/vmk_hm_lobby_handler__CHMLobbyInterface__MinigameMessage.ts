// vmk_hm_lobby_handler.cct / CHMLobbyInterface / MinigameMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MinigameMessage(_me: LingoMe, i_iGameState: LingoValue) {
  switch (i_iGameState) {
case symbol("idle"):
  setMeProp(_me, "m_gameOn", 0);
  break;
case symbol("running"):
  callMethod("ShowWindow", callMethod("getInterface", callNamed("getThread", "hauntedmansiongame")), "Waiting")
  if (callNamed("windowExists", meProp(_me, "m_sGamelistWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamelistWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  setMeProp(_me, "m_gameOn", 1);
  break;
  }

}


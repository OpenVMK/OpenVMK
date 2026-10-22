// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / MinigameMessage

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
  switch (meProp(_me, "m_iMessengerState")) {
case symbol("hidden"):
  setMeProp(_me, "m_iMessengerState", symbol("normal"));
  break;
case symbol("waiting"):
  setMeProp(_me, "m_iMessengerState", symbol("released"));
  break;
  }

  break;
case symbol("running"):
  if (meProp(_me, "m_bVisible")) {
  callMethod("hide", _me)
  }

  setMeProp(_me, "m_iMessengerState", symbol("hidden"));
  break;
  default:
  callNamed("put", "Messenger received unknown Minigame state")
  }

}


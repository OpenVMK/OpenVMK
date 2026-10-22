// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / MinigameStateChange

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MinigameStateChange(_me: LingoMe, a_sState: LingoValue, a_sGameName: LingoValue) {
  switch (a_sState) {
case symbol("running"):
  setMeProp(_me, "m_bMinigameRunning", 1);
  setMeProp(_me, "m_sMiniGameRunning", a_sGameName);
  break;
  default:
  setMeProp(_me, "m_bMinigameRunning", 0);
  setMeProp(_me, "m_sMiniGameRunning", undefined);
  }

}


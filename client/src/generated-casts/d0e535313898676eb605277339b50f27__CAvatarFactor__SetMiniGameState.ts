// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / SetMiniGameState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMiniGameState(_me: LingoMe, a_bMiniGame: LingoValue, a_sMiniGameName: LingoValue) {
  setMeProp(_me, "m_bMinigameRunning", a_bMiniGame);
  setMeProp(_me, "m_sMiniGameRunning", a_sMiniGameName);
}


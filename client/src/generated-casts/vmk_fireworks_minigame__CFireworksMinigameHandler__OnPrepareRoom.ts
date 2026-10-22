// vmk_fireworks_minigame.cct / CFireworksMinigameHandler / OnPrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnPrepareRoom(_me: LingoMe, a_iRoomCode: LingoValue) {
  callMethod("PrepareRoom", callMethod("getComponent", callNamed("getThread", "fireworks")))
}


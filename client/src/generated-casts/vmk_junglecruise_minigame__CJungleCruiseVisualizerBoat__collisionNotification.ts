// vmk_junglecruise_minigame.cct / CJungleCruiseVisualizerBoat / collisionNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionNotification(_me: LingoMe, _type: LingoValue, _collisionType: LingoValue, _collisionObject: LingoValue) {
  setMeProp(_me, "m_i_FlashBlend", 100);
}


// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / StageStartCountDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageStartCountDown(_me: LingoMe) {
  var m_iStageStartedAt = theProperty("milliSeconds");
}


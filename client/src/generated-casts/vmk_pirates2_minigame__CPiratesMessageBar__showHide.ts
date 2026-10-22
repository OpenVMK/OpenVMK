// vmk_pirates2_minigame.cct / CPiratesMessageBar / showHide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHide(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1)) {
  callMethod("showMessageBar", _me)
  } else {
  callMethod("hideMessageBar", _me)
  }

}


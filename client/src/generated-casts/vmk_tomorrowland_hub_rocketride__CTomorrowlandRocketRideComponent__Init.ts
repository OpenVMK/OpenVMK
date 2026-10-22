// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe) {
  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
  callMethod("rewindAndStopAnimations", _me)
  callMethod("hideAnimations", _me)
  callMethod("hideEmptyMasks", _me)
  callMethod("hideQueueTiles", _me)
  setMeProp(_me, "m_bReady", 1);
}


// vmk_fireworks_minigame.cct / CFireworksGameInterface / toggleControlMethod

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toggleControlMethod(_me: LingoMe, a_bDontSetSelector: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_bControlsLocked"))) {
  setMeProp(_me, "m_bControlsLocked", 0);
  } else {
  setMeProp(_me, "m_bControlsLocked", (lingoTruthy(meProp(_me, "m_bControlsLocked")) ? 0 : 1));
  }

  if (meProp(_me, "m_bControlsLocked")) {
  var t_rMem = callNamed("member", "button.controlswitch.lock");
  } else {
  t_rMem = callNamed("member", "button.controlswitch.unlock");
  }

  callMethod("changeImageInElement", _me, meProp(_me, "m_fireWorkSelector"), "controlswitch", t_rMem)
  if ((lingoTruthy(a_bDontSetSelector) ? 0 : 1)) {
  if ((lingoTruthy(meProp(_me, "m_bControlsLocked")) ? 0 : 1)) {
  callMethod("SetSelector", _me, callMethod("GetSelectorContent", callMethod("GetStage", callMethod("getComponent", _me))))
  }

  }

}


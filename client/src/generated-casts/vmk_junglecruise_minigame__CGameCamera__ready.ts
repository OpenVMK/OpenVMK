// vmk_junglecruise_minigame.cct / CGameCamera / ready

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ready(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  var tDeltaTime = lingoBinary("div", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_filmWindTime")), float(1000));
  if (lingoBinary("lt", tDeltaTime, meProp(_me, "m_frameSwitchDelay"))) {
  return 0;
  } else {
  return 1;
  }

  } else {
  return 0;
  }

}


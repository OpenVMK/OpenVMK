// vmk_junglecruise_minigame.cct / CJungleCruiseInterface / CheckHits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckHits(_me: LingoMe) {
  var tHitList = callMethod("CheckFrameHit", callMethod("getComponent", _me), meProp(_me, "m_camera"));
  if (lingoBinary("gt", tHitList.count, 0)) {
  for (var tHit of tHitList.toArray()) {
  if (lingoBinary("gt", tHit.accuracy, 30)) {
  setMeProp(_me, "m_bAnimalsInSight", 1);
  return;
  }

  }

  }

  setMeProp(_me, "m_bAnimalsInSight", 0);
}


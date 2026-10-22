// vmk_junglecruise_minigame.cct / CStage / GetSetID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSetID(_me: LingoMe, a_sAnimal: LingoValue) {
  for (var tSet of meProp(_me, "m_mp_animalSets").toArray()) {
  if (lingoBinary("eq", tSet.name, a_sAnimal)) {
  return tSet.id;
  }

  }

  return 0;
}


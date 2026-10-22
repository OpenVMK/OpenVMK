// vmk_junglecruise_minigame.cct / CAnimalManager / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  for (var tAnimal of meProp(_me, "m_mp_visibleAnimals").toArray()) {
  callMethod("RemoveAnimal", _me, tAnimal)
  }

  setMeProp(_me, "m_mp_visibleAnimals", new LingoPropList([]));
}


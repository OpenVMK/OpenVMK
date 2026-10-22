// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / AllClothesLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllClothesLoaded(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", "RegistrationClothesLoader")) {
  callNamed("removeObject", "RegistrationClothesLoader")
  }

  if (lingoBinary("and", meProp(_me, "m_bHatListReady"), meProp(_me, "m_bAvailableSetsReady"))) {
  callMethod("AllClothesLoaded", _this._interface)
  return callMethod("_UpdateRegData", callMethod("getComponent", _this), meProp(_me, "m_arPArsedAvailbleSets"), "AvailableSets");
  }

}


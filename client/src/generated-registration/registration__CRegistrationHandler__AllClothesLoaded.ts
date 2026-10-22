// registration.cct / CRegistrationHandler / AllClothesLoaded

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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


// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / AllClothesLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllClothesLoaded(_me: LingoMe, _this: LingoValue, a_arParsedAvailbleSets: LingoValue) {
  setMeProp(_me, "m_bAvailableSetsReady", 1);
  if (callNamed("listp", a_arParsedAvailbleSets)) {
  var m_ar_ParsedAvailbleSets = a_arParsedAvailbleSets;
  }

  if (callNamed("objectExists", "AvatarBuilderClothesLoader")) {
  callNamed("removeObject", "AvatarBuilderClothesLoader")
  }

  if (lingoBinary("and", lingoBinary("and", meProp(_me, "m_bHatListReady"), meProp(_me, "m_bAvailableSetsReady")), callNamed("listp", a_arParsedAvailbleSets))) {
  return callMethod("parseAvailableSets", callMethod("getComponent", _this), m_ar_ParsedAvailbleSets);
  }

}


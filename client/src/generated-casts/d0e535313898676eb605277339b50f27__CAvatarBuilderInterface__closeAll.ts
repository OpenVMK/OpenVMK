// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / closeAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeAll(_me: LingoMe, _this: LingoValue) {
  callMethod("CloseAvatarBuilder", _this)
  callMethod("CloseSettings", _this)
  if (callNamed("objectExists", "AvatarBuilderClothesLoader")) {
  callNamed("removeObject", "AvatarBuilderClothesLoader")
  }

}


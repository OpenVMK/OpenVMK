// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / CloseAvatarBuilder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseAvatarBuilder(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("CloseSettings", meProp(_me, "m_rCurPageObj"))
  setMeProp(_me, "m_rWindow", undefined);
  var m_iPageToShow = undefined;
  }

  if (callNamed("objectExists", "AvatarBuilderClothesLoader")) {
  callNamed("removeObject", "AvatarBuilderClothesLoader")
  }

}


// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeObject", "AvatarClothAssetManager")
  setMeProp(_me, "m_rClothAssetManager", undefined);
  callNamed("unregisterMessage", "CreateAvatar")
  callNamed("unregisterMessage", "RandomAvatar")
  callNamed("unregisterMessage", "CatalogAvatar")
  callNamed("unregisterMessage", "GetAvatarImage")
  callNamed("unregisterMessage", symbol("Initialize"), callMethod("getID", _this))
  callNamed("unregisterMessage", symbol("MinigameState"), callMethod("getID", _this))
  if (callNamed("objectp", meProp(_me, "m_objAnimator"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objAnimator")))
  }

  if (callNamed("objectp", "ClothesPreviewRenderer")) {
  callNamed("removeObject", "ClothesPreviewRenderer")
  }

  return 1;
}


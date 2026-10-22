// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / CreatetClothAssetManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatetClothAssetManager(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", "AvatarClothAssetManager")) {
  setMeProp(_me, "m_rClothAssetManager", callNamed("getObject", "AvatarClothAssetManager"));
  } else {
  setMeProp(_me, "m_rClothAssetManager", callNamed("createObject", "AvatarClothAssetManager", "CAvatarClothAssetManager"));
  }

  if (callNamed("variableExists", "body_part_cast")) {
  var t_sBodyPartCastName = callNamed("getVariable", "body_part_cast");
  if (callNamed("castExists", t_sBodyPartCastName)) {
  callMethod("AddCastContentsToImageCache", meProp(_me, "m_rClothAssetManager"), callNamed("castLib", t_sBodyPartCastName))
  }

  } else {
  callNamed("put", "body_part_cast not configured!!")
  }

  if (callNamed("variableExists", "magic_clothes_cast")) {
  var t_sMagicClothesCastName = callNamed("getVariable", "magic_clothes_cast");
  if (callNamed("castExists", t_sMagicClothesCastName)) {
  callMethod("AddCastContentsToImageCache", meProp(_me, "m_rClothAssetManager"), callNamed("castLib", t_sMagicClothesCastName))
  }

  } else {
  callNamed("put", "magic_clothes_cast not configured!!")
  }

}


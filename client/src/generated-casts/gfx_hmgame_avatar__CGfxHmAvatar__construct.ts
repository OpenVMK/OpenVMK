// gfx_hmgame_avatar.cct / CGfxHmAvatar / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var t_Obj = callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component);
  if (callNamed("objectp", t_Obj)) {
  if (callNamed("variableExists", "hm_clothes_cast")) {
  var t_sBodyPartCastName = callNamed("getVariable", "hm_clothes_cast");
  if (callNamed("castExists", t_sBodyPartCastName)) {
  callMethod("AddCastContentsToImageCache", t_Obj, callNamed("castLib", t_sBodyPartCastName))
  }

  } else {
  callNamed("put", "hm_clothe_cast not configured!!")
  }

  }

  return 1;
}


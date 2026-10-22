// vmk_fireworks.cct / CFireworksGameComponent / getAllAvatarsInRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAllAvatarsInRoom(_me: LingoMe) {
  var t_ar_avatars = new LingoPropList([]);
  var t_rIterator = callMethod("GetIterator", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "avatar");
  while (1) {
  var t_rAvatar = callMethod("getToken", t_rIterator);
  if (callNamed("voidp", t_rAvatar)) {
  break;
  }

  var t_sRef = callMethod("GetParam", t_rAvatar, "REF");
  t_ar_avatars[t_sRef] = callMethod("GetOutlook", callMethod("GetVisual", t_rAvatar));
  if ((lingoTruthy(callMethod("NextToken", t_rIterator)) ? 0 : 1)) {
  break;
  }

  }

  callMethod("clear", t_rIterator)
  t_rIterator = undefined;
  return t_ar_avatars;
}


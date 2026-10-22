// vmk_mystics.cct / CMysticsComponent / ActivateMysticsEffect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActivateMysticsEffect(_me: LingoMe, _this: LingoValue, t_iAvatar: LingoValue, t_iMagicFX: LingoValue, t_aParams: LingoValue) {
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  if (callNamed("objectp", t_rContext)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, t_iAvatar, "avatar");
  if (callNamed("objectp", t_rAvatar)) {
  var t_rRenderer = callMethod("CreateRenderer", _this, t_rAvatar, t_iMagicFX, t_aParams);
  callMethod("SetMysticRenderer", callMethod("GetVisual", t_rAvatar), t_rRenderer)
  } else {
  callNamed("error", symbol("ActivateMysticsEffect"), "Avatar not found!")
  }

  } else {
  callNamed("error", symbol("ActivateMysticsEffect"), "Room context not found!")
  }

}


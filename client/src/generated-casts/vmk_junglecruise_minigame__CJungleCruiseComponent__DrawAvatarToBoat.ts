// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / DrawAvatarToBoat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawAvatarToBoat(_me: LingoMe, a_img: LingoValue, a_ar_Param: LingoValue) {
  setThePropOf(callNamed("getMember", "tempAvatarImage"), "image", a_img);
  var tdir = 1;
  if (lingoBinary("eq", callMethod("getDirection", meProp(_me, "m_stage")), "down")) {
  tdir = 3;
  }

  if (lingoBinary("eq", tdir, 1)) {
  setThePropOf(callNamed("getMember", "tempAvatarImage"), "regPoint", callNamed("point", 73, 116));
  } else {
  setThePropOf(callNamed("getMember", "tempAvatarImage"), "regPoint", callNamed("point", 65, 152));
  }

  if ((lingoTruthy(meProp(_me, "m_avatarInBoat")) ? 0 : 1)) {
  setThePropOf(callNamed("getMember", "tempAvatarImage"), "regPoint", callNamed("point", 48, 90));
  }

}


// vmk_fireworks_minigame.cct / CFireworksGameComponent / GetAvatarName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAvatarName(_me: LingoMe, a_iAvatarRef: LingoValue) {
  if (lingoBinary("neq", callNamed("getThread", "minigame"), 0)) {
  var t_rParticipant = callMethod("getaProp", callMethod("GetParticipantlist", callMethod("getComponent", callNamed("getThread", "minigame"))), a_iAvatarRef);
  if (callNamed("listp", t_rParticipant)) {
  return t_rParticipant[symbol("name")];
  } else {
  return "";
  }

  } else {
  return "";
  }

}


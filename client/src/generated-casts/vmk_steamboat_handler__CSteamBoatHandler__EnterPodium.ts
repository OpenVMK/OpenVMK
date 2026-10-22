// vmk_steamboat_handler.cct / CSteamBoatHandler / EnterPodium

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnterPodium(_me: LingoMe, a_mp_Data: LingoValue) {
  var t_iAvatarRef = callMethod("GetIntFrom", a_mp_Data.connection);
  return callMethod("ShowScreen", _me.component, t_iAvatarRef);
}


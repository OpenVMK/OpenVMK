// vmk_pirates2_minigame.cct / CPiratesMessageBar / ChatAvatarMuted

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChatAvatarMuted(_me: LingoMe, tMsg: LingoValue) {
  var tMuteTime = callMethod("GetIntFrom", tMsg.connection);
  callMethod("Mute", _me, tMuteTime)
}


// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("timeoutExists", "MonorailStartRoomSound")) {
  callNamed("removeTimeout", "MonorailStartRoomSound")
  }

  if (callNamed("timeoutExists", "MonorailEndSong")) {
  callNamed("removeTimeout", "MonorailEndSong")
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}


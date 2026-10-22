// vmk_sound.cct / Sound Channel Class / dump

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dump(_me: LingoMe) {
  var tChannel = callNamed("sound", meProp(_me, "pChannelNum"));
  var tName = "<none>";
  if (callMethod("isBusy", tChannel)) {
  tName = tChannel.member.name;
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("joinPad", "* Channel", meProp(_me, "pChannelNum")), " - Playtime left:"), callMethod("getTimeRemaining", _me)), "Now playing:"), tName), "Queue:"), callMethod("getPlaylist", tChannel).count))
  if (callMethod("isBusy", tChannel)) {
  callMethod("delay", _me, 700, symbol("dump"))
  }

}


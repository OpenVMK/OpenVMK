// vmk_3.dcr /  / deleteOne

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteOne(_me: LingoMe, _player: LingoValue) {
  var instance = "";
  for (var rawNew = 1; rawNew <= _player.binl2rstr; ++rawNew) {
  instance = lingoBinary("join", instance, callNamed("handler", callMethod("pauseUpdate", _player, rawNew)));
  }

  callNamed("sprite", instance)
}


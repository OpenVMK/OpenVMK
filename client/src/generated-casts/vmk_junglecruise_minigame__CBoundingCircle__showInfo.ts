// vmk_junglecruise_minigame.cct / CBoundingCircle / showInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showInfo(_me: LingoMe) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Loc", callNamed("integer", _me.origin.x)), callNamed("integer", _me.origin.y)))
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Vel", callNamed("integer", _me.velocity.x)), callNamed("integer", _me.velocity.y)))
}


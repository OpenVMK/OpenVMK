// vmk_junglecruise_minigame.cct / CCatmullRom / AddPoint

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddPoint(_me: LingoMe, p: LingoValue) {
  callMethod("append", meProp(_me, "pts"), p)
}


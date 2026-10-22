// 42c66f7b170484e24189f467fe87b08d.cct / CSoundComponent / setMusicOn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setMusicOn(_me: LingoMe) {
  if (callNamed("objectExists", symbol("session"))) {
  callMethod("set", callNamed("getObject", symbol("session")), "music", 1)
  }

}


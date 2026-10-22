// vmk_npc_matterhorn.cct / CMatterhornComponent / ThrowSnowball

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ThrowSnowball(_me: LingoMe, i_age: LingoValue) {
  callNamed("executeMessage", symbol("changeAnimationState"), "yeti", symbol("goto"), "THROW", i_age)
}


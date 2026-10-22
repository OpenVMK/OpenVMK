// vmk_npc_matterhorn.cct / CMatterhornComponent / RoarAndSpeak

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoarAndSpeak(_me: LingoMe, i_age: LingoValue) {
  callNamed("executeMessage", symbol("changeAnimationState"), "yeti", symbol("goto"), "ROAR", i_age)
}


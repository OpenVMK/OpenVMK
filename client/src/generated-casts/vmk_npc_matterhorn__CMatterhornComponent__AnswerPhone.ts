// vmk_npc_matterhorn.cct / CMatterhornComponent / AnswerPhone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AnswerPhone(_me: LingoMe, i_age: LingoValue) {
  callNamed("executeMessage", symbol("changeAnimationState"), "yeti", symbol("goto"), "PHONE", i_age)
}


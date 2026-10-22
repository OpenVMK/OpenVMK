// vmk_pirates_game.cct / CPiratesSound / PlaySeaMonsterAttack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySeaMonsterAttack(_me: LingoMe) {
  callMethod("playFx", _me, meProp(_me, "m_mp_sSoundList")["SeaMonsterAttack"][1])
}


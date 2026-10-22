// minigame_engine2.cct / IntVectorInterface / intvector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function intvector(_me: LingoMe, a_iX: LingoValue, a_iY: LingoValue, a_iZ: LingoValue) {
  /* global */ var G_IntVectorScript = globalVar("G_IntVectorScript");
  return callMethod("new", globalVar("G_IntVectorScript"), a_iX, a_iY, a_iZ);
}


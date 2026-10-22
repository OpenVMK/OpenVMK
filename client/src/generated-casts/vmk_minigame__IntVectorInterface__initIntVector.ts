// vmk_minigame.cct / IntVectorInterface / initIntVector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initIntVector(_me: LingoMe) {
  /* global */ var G_IntVectorScript = globalVar("G_IntVectorScript");
  setGlobal("G_IntVectorScript", callNamed("script", "CIntVector"));
}


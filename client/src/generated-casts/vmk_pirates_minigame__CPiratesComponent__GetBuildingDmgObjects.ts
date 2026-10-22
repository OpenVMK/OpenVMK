// vmk_pirates_minigame.cct / CPiratesComponent / GetBuildingDmgObjects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetBuildingDmgObjects(_me: LingoMe, a_iGraphicCode: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  return meProp(_me, "m_ar_ar_dmgObjects")[a_iGraphicCode];
}


// minigame_engine_potc2.cct / CGameComponent / SetMinigameObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMinigameObject(_me: LingoMe, i_iObjectCode: LingoValue, i_sClass: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  callMethod("setaProp", meProp(_me, "m_mp_sObject"), i_iObjectCode, i_sClass)
  meProp(_me, "m_ar_ar_objByType")[i_iObjectCode] = new LingoList([]);
}


// minigame_engine_overrides.cct /  / SetMinigameObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMinigameObject(_me: LingoMe, i_iObjectCode: LingoValue, i_sClass: LingoValue) {
  callMethod("setaProp", _me.m_mp_sObject, i_iObjectCode, i_sClass)
  _me.m_ar_ar_objByType[i_iObjectCode] = new LingoList([]);
}


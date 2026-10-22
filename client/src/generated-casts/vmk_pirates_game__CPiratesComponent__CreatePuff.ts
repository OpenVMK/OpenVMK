// vmk_pirates_game.cct / CPiratesComponent / CreatePuff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePuff(_me: LingoMe, i_pCoordinates: LingoValue, i_sPuffType: LingoValue, i_iRef: LingoValue, a_iSize: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  var t_mp_Params = new LingoPropList(["Position", i_pCoordinates, "Age", 1, "Type", i_sPuffType, "Size", a_iSize]);
  var tObject = callMethod("newObject", callMethod("GetObjectPool", meProp(_me, "m_rMGE")), "piratespuff", t_mp_Params);
  callMethod("append", meProp(_me, "m_ar_puffs"), tObject)
}


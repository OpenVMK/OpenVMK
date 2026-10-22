// vmk_pirates2_minigame.cct / CPiratesComponent / StageEndCountDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageEndCountDown(_me: LingoMe, i_iTime: LingoValue, i_ar_params: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  setMeProp(_me, "m_iStageEndedAt", theProperty("milliSeconds"));
  setMeProp(_me, "m_ar_stagevictoryparams", i_ar_params);
  if (lingoBinary("eq", i_ar_params[4], 1)) {
  var tMyShip = callMethod("GetMyShip", callMethod("getInterface", _me));
  if (lingoBinary("eq", callMethod("GetParam", tMyShip, "Team"), i_ar_params[1])) {
  }

  }

  callMethod("enableExitButton", callMethod("getInterface", _me), 0)
}


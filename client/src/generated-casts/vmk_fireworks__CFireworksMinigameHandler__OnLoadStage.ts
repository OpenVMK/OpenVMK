// vmk_fireworks.cct / CFireworksMinigameHandler / OnLoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnLoadStage(_me: LingoMe, i_sName: LingoValue, i_iVersion: LingoValue, i_ar_params: LingoValue) {
  var t_ar_stageData = new LingoPropList([]);
  if (callNamed("listp", i_ar_params["intArray"])) {
  var t_ar_intVector = callMethod("new", callNamed("script", "CVectorStruct"), i_ar_params["intArray"]);
  t_ar_stageData[symbol("score")] = callMethod("Shift", t_ar_intVector);
  var t_ar_bonusCombinations = new LingoList([]);
  var t_iBonusCount = callMethod("Shift", t_ar_intVector);
  for (var j = 1; j <= t_iBonusCount; ++j) {
  callMethod("append", t_ar_bonusCombinations, callMethod("Shift", t_ar_intVector))
  }

  t_ar_stageData[symbol("bonus")] = t_ar_bonusCombinations;
  var t_ar_shots = new LingoList([]);
  var t_iShotCount = callMethod("Shift", t_ar_intVector);
  for (var j = 1; j <= t_iShotCount; ++j) {
  var t_ar_shot = new LingoPropList([]);
  t_ar_shot[symbol("shotTimeInMsecs")] = callMethod("Shift", t_ar_intVector);
  t_ar_shot[symbol("shotId")] = callMethod("Shift", t_ar_intVector);
  t_ar_shot[symbol("type")] = callMethod("Shift", t_ar_intVector);
  t_ar_shot[symbol("x")] = callMethod("Shift", t_ar_intVector);
  t_ar_shot[symbol("y")] = callMethod("Shift", t_ar_intVector);
  t_ar_shot[symbol("z")] = callMethod("Shift", t_ar_intVector);
  callMethod("append", t_ar_shots, t_ar_shot)
  }

  callMethod("addProp", t_ar_stageData, symbol("shots"), t_ar_shots)
  t_ar_intVector = undefined;
  }

  callMethod("LoadStage", callMethod("getComponent", callNamed("getThread", "fireworks")), i_sName, i_iVersion, t_ar_stageData)
}


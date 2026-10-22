// vmk_pirates_minigame.cct / CPiratesComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  var tt = theProperty("milliSeconds");
  var tMGE = callMethod("getComponent", callNamed("getThread", "minigame"));
  var t_ar_rShips = callMethod("GetObjectsByCode", tMGE, 1);
  for (var tShip of t_ar_rShips.toArray()) {
  var tOwner = callMethod("GetParam", callMethod("getObject", tShip), "Owner");
  var tScreenPos = callNamed("ProjectAxonometricPosition", callNamed("point", callMethod("GetParam", callMethod("getObject", tShip), "WorldPosition").x, callMethod("GetParam", callMethod("getObject", tShip), "WorldPosition").y));
  var tAvatarPos = callNamed("InverseAxonometricPosition", callNamed("point", tScreenPos.locH, lingoBinary("add", theProperty("stage").image.height, 200)));
  var t_rAvatar = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), tOwner, "avatar");
  if (lingoBinary("neq", t_rAvatar, 0)) {
  callMethod("SetAbsPos", t_rAvatar, callNamed("vector", lingoBinary("div", tAvatarPos.locH, 100), lingoBinary("div", tAvatarPos.locV, 100), 0))
  }

  }

  if (callMethod("getSyncState", callMethod("GetMinigameHandler", tMGE))) {
  setMeProp(_me, "m_gameOn", 1);
  var t_ar_Cannonballs = callMethod("GetObjectsByCode", tMGE, 2);
  var t_ar_deadRef = new LingoList([]);
  for (var tObj of t_ar_Cannonballs.toArray()) {
  if (callMethod("IsRemovable", callMethod("GetFactor", tObj))) {
  callMethod("append", t_ar_deadRef, callMethod("GetParam", tObj, "Reference"))
  }

  }

  for (var tDead of t_ar_deadRef.toArray()) {
  callMethod("_MinigameDeleteObject", tMGE, tDead)
  }

  var t_ar_newpuffs = new LingoList([]);
  for (var tPuff of meProp(_me, "m_ar_puffs").toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetFactor", tPuff))) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("IsRemovable", callMethod("GetFactor", tPuff))) ? 0 : 1)) {
  callMethod("append", t_ar_newpuffs, tPuff)
  continue;
  }

  callMethod("RemovePuff", _me, tPuff)
  }

  }

  setMeProp(_me, "m_ar_puffs", t_ar_newpuffs);
  var t_ar_powerups = callMethod("GetObjectsByCode", tMGE, 3);
  t_ar_deadRef = new LingoList([]);
  for (var tObj of t_ar_powerups.toArray()) {
  if (callMethod("IsRemovable", callMethod("GetFactor", tObj))) {
  callMethod("append", t_ar_deadRef, callMethod("GetParam", tObj, "Reference"))
  }

  }

  for (var tDead of t_ar_deadRef.toArray()) {
  callMethod("_MinigameDeleteObject", tMGE, tDead)
  }

  } else {
  setMeProp(_me, "m_gameOn", 0);
  }

  callMethod("update", meProp(_me, "m_rFloatFactory"))
  if (lingoBinary("neq", meProp(_me, "m_iStageStartedAt"), 0)) {
  var tTimeRemaining = lingoBinary("sub", callNamed("value", callMethod("GetStartTime", meProp(_me, "m_stage"))), lingoBinary("div", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iStageStartedAt")), 1000));
  callMethod("ShowPrepare", callMethod("getInterface", _me), tTimeRemaining)
  if (lingoBinary("lt", tTimeRemaining, 0)) {
  callMethod("HidePrepare", callMethod("getInterface", _me))
  tTimeRemaining = 0;
  setMeProp(_me, "m_iStageStartedAt", 0);
  callMethod("enableExitButton", callMethod("getInterface", _me), 1)
  }

  }

  if (lingoBinary("neq", meProp(_me, "m_iStageEndedAt"), 0)) {
  tTimeRemaining = lingoBinary("sub", callMethod("GetEndTime", meProp(_me, "m_stage")), callNamed("integer", lingoBinary("div", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iStageEndedAt")), 1000)));
  if ((lingoTruthy(callMethod("MidstageWindowExists", callMethod("getInterface", _me))) ? 0 : 1)) {
  var t_mp_score = callMethod("GetAllScores", _me);
  if (lingoBinary("neq", meProp(_me, "m_ar_stagevictoryparams")[4], 1)) {
  callMethod("DisplayStageEnd", callMethod("getInterface", _me), callMethod("GetName", meProp(_me, "m_stage")), t_mp_score.players, t_mp_score.scores, t_mp_score.teamscores, tTimeRemaining)
  } else {
  callMethod("DisplayGameEnd", callMethod("getInterface", _me), callMethod("GetName", meProp(_me, "m_stage")), t_mp_score.players, t_mp_score.scores, t_mp_score.teamscores, tTimeRemaining, meProp(_me, "m_ar_stagevictoryparams")[1])
  }

  }

  if (lingoBinary("lt", tTimeRemaining, 0)) {
  tTimeRemaining = 0;
  setMeProp(_me, "m_iStageEndedAt", 0);
  callMethod("RemoveMidstageWindow", callMethod("getInterface", _me))
  }

  }

  setGlobal("g_profComponent", lingoBinary("sub", theProperty("milliSeconds"), tt));
  callNamed("ProfilerReset")
}


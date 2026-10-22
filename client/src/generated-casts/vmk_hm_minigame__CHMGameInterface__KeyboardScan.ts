// vmk_hm_minigame.cct / CHMGameInterface / KeyboardScan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function KeyboardScan(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  if (callNamed("voidp", meProp(_me, "m_rAvatar"))) {
  callMethod("initAvatar", _me, 1)
  }

  var t_rMyPlayer = callMethod("GetMyAvatar", _me);
  if (callNamed("objectp", t_rMyPlayer)) {
  var t_rStatus = callMethod("GetStatus", callMethod("GetVisual", t_rMyPlayer));
  }

  switch (meProp(_me, "m_iControlMethod")) {
case symbol("mouse"):
  var t_ar_actions = callMethod("ReadKeys", _me);
  if (lingoBinary("neq", t_ar_actions[1], -float(1))) {
  setMeProp(_me, "m_iControlMethod", symbol("keyboard"));
  if (callNamed("objectp", t_rStatus)) {
  callMethod("changeControlMethod", t_rStatus, meProp(_me, "m_iControlMethod"))
  }

  } else {
  t_ar_actions = callMethod("ReadMouse", _me);
  }

  break;
  default:
  if (callMethod("checkMouseAction", _me)) {
  setMeProp(_me, "m_iControlMethod", symbol("mouse"));
  t_ar_actions = callMethod("ReadKeys", _me);
  if (callNamed("objectp", t_rStatus)) {
  callMethod("changeControlMethod", t_rStatus, meProp(_me, "m_iControlMethod"))
  }

  } else {
  t_ar_actions = callMethod("ReadKeys", _me);
  }

  }

  var tDirection = t_ar_actions[1];
  if (lingoBinary("eq", meProp(_me, "m_iControlMethod"), symbol("mouse"))) {
  var t_iDistance = t_ar_actions[3];
  if (lingoBinary("neq", meProp(_me, "m_iLastDirection"), tDirection)) {
  if (callNamed("objectp", t_rStatus)) {
  callMethod("setArrowStatus", t_rStatus, meProp(_me, "m_iLastDirection"), tDirection, meProp(_me, "m_iControlMethod"))
  }

  if (lingoBinary("lt", t_iDistance, 10)) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatar"))) ? 0 : 1), lingoBinary("gt", tDirection, -float(1)))) {
  callMethod("Actions", meProp(_me, "m_rAvatar"), new LingoList([tDirection, tDirection, 0, 0, 0, 0, 0, 0, 0, 0]))
  }

  callNamed("executeMessage", symbol("SendMinigameAction"), 4, new LingoList([]))
  setMeProp(_me, "m_iMoveState", symbol("stopped"));
  } else {
  if (lingoBinary("lt", t_iDistance, 32)) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatar"))) ? 0 : 1), lingoBinary("gt", tDirection, -float(1)))) {
  callMethod("Actions", meProp(_me, "m_rAvatar"), new LingoList([tDirection, tDirection, 0, 0, 0, 0, 0, 0, 0, 0]))
  }

  callNamed("executeMessage", symbol("SendMinigameAction"), 3, new LingoList([meProp(_me, "m_iLastDirection")]))
  setMeProp(_me, "m_iMoveState", symbol("turn"));
  } else {
  callNamed("executeMessage", symbol("SendMinigameAction"), 7, new LingoList([tDirection]))
  setMeProp(_me, "m_iMoveState", symbol("move"));
  }

  }

  setMeProp(_me, "m_iLastDirection", tDirection);
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_iControlMethod"), symbol("keyboard"))) {
  switch (meProp(_me, "m_iMoveState")) {
case symbol("stopped"):
  if (lingoBinary("neq", tDirection, -float(1))) {
  setMeProp(_me, "m_iMoveState", symbol("turn"));
  setMeProp(_me, "m_iLastDirection", tDirection);
  callMethod("KeyboardScan", _me)
  }

  break;
case symbol("turn"):
  if (lingoBinary("eq", tDirection, -float(1))) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatar"))) ? 0 : 1), lingoBinary("gt", meProp(_me, "m_iLastDirection"), -float(1)))) {
  callMethod("Actions", meProp(_me, "m_rAvatar"), new LingoList([meProp(_me, "m_iLastDirection"), meProp(_me, "m_iLastDirection"), 0, 0, 0, 0, 0, 0, 0, 0]))
  }

  callNamed("executeMessage", symbol("SendMinigameAction"), 3, new LingoList([meProp(_me, "m_iLastDirection")]))
  setMeProp(_me, "m_iMoveState", symbol("stopped"));
  setMeProp(_me, "m_iMovementCounter", 0);
  } else {
  if (lingoBinary("neq", meProp(_me, "m_iLastDirection"), tDirection)) {
  setMeProp(_me, "m_iLastDirection", tDirection);
  }

  setMeProp(_me, "m_iMovementCounter", lingoBinary("add", meProp(_me, "m_iMovementCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMovementCounter"), 5)) {
  setMeProp(_me, "m_iMoveState", symbol("move"));
  setMeProp(_me, "m_mp_keyStatus", new LingoList([-float(1), 0, 0]));
  setMeProp(_me, "m_iLastDirection", -float(1));
  callMethod("KeyboardScan", _me)
  }

  }

  break;
case symbol("move"):
  if (lingoBinary("neq", t_ar_actions, meProp(_me, "m_mp_keyStatus"))) {
  if (lingoBinary("neq", meProp(_me, "m_iLastDirection"), tDirection)) {
  if (callNamed("objectp", t_rStatus)) {
  callMethod("setArrowStatus", t_rStatus, meProp(_me, "m_iLastDirection"), tDirection, meProp(_me, "m_iControlMethod"))
  }

  if (lingoBinary("eq", tDirection, -float(1))) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, new LingoList([]))
  setMeProp(_me, "m_iMoveState", symbol("stopped"));
  setMeProp(_me, "m_iMovementCounter", 0);
  } else {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatar"))) ? 0 : 1), lingoBinary("gt", tDirection, -float(1)))) {
  callMethod("Actions", meProp(_me, "m_rAvatar"), new LingoList([tDirection, tDirection, 0, 0, 0, 0, 0, 0, 0, 0]))
  }

  callNamed("executeMessage", symbol("SendMinigameAction"), 7, new LingoList([tDirection]))
  var m_iRotationalDirection = tDirection;
  }

  }

  setMeProp(_me, "m_iLastDirection", tDirection);
  }

  setMeProp(_me, "m_mp_keyStatus", t_ar_actions);
  break;
  }

  }

  }

  if (t_ar_actions[2]) {
  if (lingoBinary("neq", t_ar_actions[2], meProp(_me, "m_iActionState"))) {
  if (callNamed("objectp", t_rMyPlayer)) {
  if ((lingoTruthy(callMethod("getPossessed", callMethod("GetFactor", t_rMyPlayer))) ? 0 : 1)) {
  if ((lingoTruthy(meProp(_me, "m_bActionActive")) ? 0 : 1)) {
  callMethod("startAction", _me)
  }

  } else {
  callMethod("stopAction", _me)
  }

  } else {
  callMethod("stopAction", _me)
  }

  }

  }

  setMeProp(_me, "m_iActionState", t_ar_actions[2]);
  }

}


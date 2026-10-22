// vmk_hm_minigame.cct / CHMGameInterface / ReadMouse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReadMouse(_me: LingoMe) {
  var t_action = callMethod("keyPressed", _key, 48);
  if (callNamed("voidp", meProp(_me, "m_rAvatar"))) {
  return new LingoList([-float(1), lingoBinary("or", lingoBinary("or", t_action, _key.controlDown), _key.shiftDown), 0]);
  } else {
  if (callNamed("voidp", meProp(_me, "m_rAvatar").m_rCanvasSpr)) {
  return new LingoList([-float(1), lingoBinary("or", lingoBinary("or", t_action, _key.controlDown), _key.shiftDown), 0]);
  }

  }

  var t_pAvatarPos = meProp(_me, "m_rAvatar").m_rCanvasSpr.loc;
  var t_vAvatarPos = callNamed("vector", t_pAvatarPos.locH, t_pAvatarPos.locV, 0);
  var t_vMousePos = callNamed("vector", _mouse.mouseH, _mouse.mouseV, 0);
  var t_vDirection = lingoBinary("sub", t_vMousePos, t_vAvatarPos);
  var t_iLength = t_vDirection.length;
  callMethod("normalize", t_vDirection)
  var t_vZero = callNamed("vector", 0, -float(1), 0);
  var ang = callMethod("angleBetween", t_vDirection, t_vZero);
  var t_vCross = callMethod("cross", t_vDirection, t_vZero);
  if (lingoBinary("lt", t_vCross.z, 0)) {
  var a = ang;
  } else {
  a = lingoBinary("sub", 360, ang);
  }

  var t_iDir = lingoBinary("div", callNamed("integer", lingoBinary("add", a, 22)), 45);
  if (lingoBinary("lt", t_iDir, 0)) {
  t_iDir = 7;
  }

  if (lingoBinary("gt", t_iDir, 7)) {
  t_iDir = 0;
  }

  var t_ar_dirMap = new LingoList([0, 1, 2, 3, 4, 5, 6, 7]);
  t_iDir = t_ar_dirMap[lingoBinary("add", t_iDir, 1)];
  return new LingoList([t_iDir, lingoBinary("or", lingoBinary("or", t_action, _key.controlDown), _key.shiftDown), t_iLength]);
}


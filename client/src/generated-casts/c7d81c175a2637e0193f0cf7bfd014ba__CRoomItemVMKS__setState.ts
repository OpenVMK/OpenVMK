// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemVMKS / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_iState: LingoValue) {
  var t_rItem = callMethod("getObject", _me);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "VMKS State", a_iState), callMethod("GetParam", t_rItem, "TYPE")), callMethod("GetParam", t_rItem, "DIR")))
  switch (a_iState) {
case -float(2):
  callNamed("put", "hide")
  var t_bVisible = 0;
  var t_bAnimation = 0;
  break;
case 0:
  callNamed("put", "normal")
  t_bVisible = 1;
  t_bAnimation = 0;
  break;
  default:
  callNamed("put", "hide, and show enemy-animation: ", a_iState)
  t_bVisible = 0;
  t_bAnimation = 1;
  if (meProp(_me, "m_bAnimation")) {
  callMethod("RemoveAnimation", callNamed("getObject", "AnimationManager"), meProp(_me, "m_sAnimName"))
  setMeProp(_me, "m_bAnimation", 0);
  }

  }

  if (lingoBinary("eq", t_bVisible, (lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1))) {
  setMeProp(_me, "m_bVisible", t_bVisible);
  callMethod("showVMKS", _me)
  }

  if (lingoBinary("and", (lingoTruthy(t_bAnimation) ? 0 : 1), meProp(_me, "m_bAnimation"))) {
  callNamed("put", "Remove animation")
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  callMethod("RemoveAnimation", t_rAnimationManager, meProp(_me, "m_sAnimName"))
  }

  if (lingoBinary("and", t_bAnimation, (lingoTruthy(meProp(_me, "m_bAnimation")) ? 0 : 1))) {
  setMeProp(_me, "m_bAnimation", 1);
  t_rAnimationManager = callNamed("getObject", "AnimationManager");
  var tWorldPos = callMethod("GetAbsPos", t_rItem);
  if (lingoBinary("gt", a_iState, 0)) {
  var t_sEnemyAnimation = lingoBinary("join", lingoBinary("join", "enemy_", a_iState), ".ani");
  callMethod("NewAnimation", t_rAnimationManager, tWorldPos, meProp(_me, "m_sAnimName"), t_sEnemyAnimation)
  }

  var t_iCurrentTileSize = lingoBinary("mul", callMethod("GetParam", callMethod("GetContext", callMethod("getObject", _me)), "TILESIZE"), float(1));
  callMethod("setScale", callMethod("GetVisual", callMethod("getAnimation", callNamed("getObject", "AnimationManager"), meProp(_me, "m_sAnimName"))), lingoBinary("div", t_iCurrentTileSize, float(32)))
  }

}


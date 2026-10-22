// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / ActRightHand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActRightHand(_me: LingoMe, a_iAct: LingoValue) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iMagic"), 18), lingoBinary("eq", a_iAct, 1))) {
  setMeProp(_me, "m_sStatusRightHand", "std");
  return;
  }

  var t_sAct = "std";
  setMeProp(_me, "m_iItemRightHand", undefined);
  switch (a_iAct) {
case 1:
  t_sAct = "wlk";
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 16)) {
  callMethod("SetPushTheTrashcanAction", meProp(_me, "m_Obj_Magic"), "wlk")
  }

  break;
case 2:
  t_sAct = "crr";
  setMeProp(_me, "m_bActCrr", 1);
  setMeProp(_me, "m_iItemRightHand", 1);
  break;
case 3:
  t_sAct = "drk";
  setMeProp(_me, "m_iItemRightHand", 1);
  setMeProp(_me, "m_bActEat", 1);
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 16)) {
  callMethod("SetPushTheTrashcanAction", meProp(_me, "m_Obj_Magic"), "drk")
  return;
  }

  break;
case 4:
  t_sAct = "crr";
  setMeProp(_me, "m_bActCrr", 1);
  setMeProp(_me, "m_iItemRightHand", 2);
  break;
case 5:
  t_sAct = "drk";
  setMeProp(_me, "m_iItemRightHand", 2);
  setMeProp(_me, "m_bActEat", 1);
  break;
case 6:
  t_sAct = "crr";
  setMeProp(_me, "m_bActCrr", 1);
  setMeProp(_me, "m_iItemRightHand", 3);
  break;
case 11:
  t_sAct = "crr";
  setMeProp(_me, "m_bActCrr", 1);
  if (lingoBinary("neq", meProp(_me, "m_iBdDir"), 0)) {
  setMeProp(_me, "m_iItemRightHand", 50);
  }

  break;
case 10:
  t_sAct = "dnc";
  break;
case 21:
  break;
case 24:
  t_sAct = "wav";
  setMeProp(_me, "m_bActWav", 1);
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 16)) {
  callMethod("SetPushTheTrashcanAction", meProp(_me, "m_Obj_Magic"), "wav")
  return;
  }

  break;
case 100:
  t_sAct = "crr";
  setMeProp(_me, "m_bActCrr", 1);
  break;
  default:
  t_sAct = "std";
  setMeProp(_me, "m_bActSit", 0);
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 16)) {
  callMethod("SetPushTheTrashcanAction", meProp(_me, "m_Obj_Magic"), "std")
  return;
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_iWeapon"), 0)) {
  setMeProp(_me, "m_bActCrr", 1);
  setMeProp(_me, "m_iItemRightHand", meProp(_me, "m_iWeapon"));
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), t_sAct, new LingoList(["rh", "rs", "ri"]))
  }

  setMeProp(_me, "m_sStatusRightHand", t_sAct);
  if (lingoBinary("neq", t_sAct, "wlk")) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), t_sAct, new LingoList(["rh", "rs", "ri"]))
  }

}


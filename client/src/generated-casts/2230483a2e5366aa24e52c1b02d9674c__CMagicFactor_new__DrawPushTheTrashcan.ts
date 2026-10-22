// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawPushTheTrashcan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawPushTheTrashcan(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  var t_iDir = _me.m_arFlipList[lingoBinary("add", _me.m_iDir, 1)];
  if (lingoBinary("eq", _me.m_sCarPantAction, "spk")) {
  setThePropOf(_me, "m_bTrashCanTalkState", _me.m_sCarPantAction);
  setThePropOf(_me, "m_sCarPantAction", "drk");
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  } else {
  if (lingoBinary("eq", t_iDir, "blk1")) {
  setThePropOf(_me, "m_sCarPantAction", "blk");
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  } else {
  if (lingoBinary("eq", t_iDir, "blk2")) {
  setThePropOf(_me, "m_sCarPantAction", "std");
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  } else {
  if (lingoBinary("eq", t_iDir, "wav")) {
  setThePropOf(_me, "m_i_CarPantCounter", lingoBinary("add", _me.m_i_CarPantCounter, 1));
  if (lingoBinary("gt", _me.m_i_CarPantCounter, 1)) {
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  }

  }

  }

  }

  if (lingoBinary("eq", t_iDir, "wlk")) {
  setThePropOf(_me, "m_i_CarPantCounter", lingoBinary("add", _me.m_i_CarPantCounter, 1));
  if (lingoBinary("gt", _me.m_i_CarPantCounter, 3)) {
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  var t_sCarPantAction = _me.m_sCarPantAction;
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sCarPantAction, "_npc_1_"), t_iDir), "_"), _me.m_i_CarPantCounter);
  if ((lingoTruthy(_me.m_bTrashCanTalkState) ? 0 : 1)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  }

  return 0;
  if (callNamed("memberExists", lingoBinary("join", t_sMemName, "_a"))) {
  var t_rAlpha = callNamed("getMember", lingoBinary("join", t_sMemName, "_a"));
  }

  t_rAlpha = callMethod("extractAlpha", t_rMem.image);
  return new LingoList([t_rMem.image, t_rAlpha, undefined]);
}


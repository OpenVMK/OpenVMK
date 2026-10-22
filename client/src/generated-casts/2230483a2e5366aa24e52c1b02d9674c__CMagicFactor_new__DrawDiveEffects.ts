// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawDiveEffects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawDiveEffects(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_iMagicFrameCounter", lingoBinary("add", _me.m_iMagicFrameCounter, 1));
  if (lingoBinary("gt", _me.m_iMagicFrameCounter, 4)) {
  setThePropOf(_me, "m_iMagicFrameCounter", 0);
  }

  var t_iDir = _me.m_arFlipList[lingoBinary("add", _me.m_iDir, 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "bubbles_", t_iDir), "_"), _me.m_iMagicFrameCounter);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  setThePropOf(callNamed("member", "t1"), "image", t_rMem.image);
  setThePropOf(callNamed("member", "t1"), "regPoint", t_rMem.regPoint);
  if (_me.m_bSitting) {
  var t_Pnt_Orig = t_rMem.regPoint;
  var t_pnt = callNamed("point", t_Pnt_Orig[1], lingoBinary("sub", t_Pnt_Orig[2], 40));
  setThePropOf(t_rMem, "regPoint", t_pnt);
  }

  if (lingoBinary("neq", _me.m_iDir, 0)) {
  if (lingoBinary("neq", _me.m_iDir, 1)) {
  if (lingoBinary("neq", _me.m_iDir, 2)) {
  if (lingoBinary("neq", _me.m_iDir, 6)) {
  if (lingoBinary("eq", _me.m_iDir, 7)) {
  var t_ar_MemList = new LingoList([a_Mem_AvatImage, t_rMem]);
  }

  }

  }

  }

  t_ar_MemList = new LingoList([t_rMem, a_Mem_AvatImage]);
  }

  var t_arData = callNamed("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  if (_me.m_bSitting) {
  setThePropOf(t_rMem, "regPoint", t_Pnt_Orig);
  }

  return t_arData;
  }

}


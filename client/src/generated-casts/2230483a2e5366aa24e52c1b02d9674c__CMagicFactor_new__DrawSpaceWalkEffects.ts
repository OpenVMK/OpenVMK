// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawSpaceWalkEffects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawSpaceWalkEffects(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_iMagicFrameCounter", lingoBinary("add", _me.m_iMagicFrameCounter, 1));
  if (lingoBinary("gt", _me.m_iMagicFrameCounter, 2)) {
  setThePropOf(_me, "m_iMagicFrameCounter", 0);
  }

  var t_iDir = _me.m_arFlipList[lingoBinary("add", _me.m_iDir, 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "flame_", t_iDir), "_"), _me.m_iMagicFrameCounter);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
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

  return callNamed("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  }

}


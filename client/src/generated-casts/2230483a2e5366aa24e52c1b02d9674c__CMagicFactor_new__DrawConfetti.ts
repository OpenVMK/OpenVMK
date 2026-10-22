// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawConfetti

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawConfetti(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_iMagicFrameCounter", lingoBinary("add", _me.m_iMagicFrameCounter, 1));
  if (lingoBinary("gt", _me.m_iMagicFrameCounter, 20)) {
  setThePropOf(_me, "m_iMagicFrameCounter", 1);
  }

  var t_arFrameList = new LingoList(["confetti_magic_1", "confetti_magic_1", "confetti_magic_2", "confetti_magic_2", "confetti_magic_3", "confetti_magic_3", "confetti_magic_4", "confetti_magic_4", "confetti_magic_5", "confetti_magic_5", "confetti_magic_6", "confetti_magic_6", "confetti_magic_7", "confetti_magic_7", "confetti_magic_8", "confetti_magic_8", "confetti_magic_9", "confetti_magic_9", "confetti_magic_10", "confetti_magic_10"]);
  var t_sMemName = t_arFrameList[_me.m_iMagicFrameCounter];
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  if (_me.m_bSitting) {
  var t_Pnt_Orig = t_rMem.regPoint;
  var t_pnt = callNamed("point", t_Pnt_Orig[1], lingoBinary("sub", t_Pnt_Orig[2], 20));
  setThePropOf(t_rMem, "regPoint", t_pnt);
  }

  var t_ar_MemList = new LingoList([a_Mem_AvatImage, t_rMem]);
  var t_ImgData = callNamed("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  if (_me.m_bSitting) {
  setThePropOf(t_rMem, "regPoint", t_Pnt_Orig);
  }

  return t_ImgData;
  }

}


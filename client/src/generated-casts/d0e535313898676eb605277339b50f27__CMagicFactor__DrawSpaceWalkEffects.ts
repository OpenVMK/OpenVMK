// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawSpaceWalkEffects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawSpaceWalkEffects(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), 2)) {
  setMeProp(_me, "m_iMagicFrameCounter", 0);
  }

  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "flame_", t_iDir), "_"), meProp(_me, "m_iMagicFrameCounter"));
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  switch (meProp(_me, "m_iDir")) {
case 0:
case 1:
case 2:
case 6:
case 7:
  var t_ar_MemList = new LingoList([a_Mem_AvatImage, t_rMem]);
  break;
  default:
  t_ar_MemList = new LingoList([t_rMem, a_Mem_AvatImage]);
  break;
  break;
  break;
  break;
  }

  return callMethod("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  }

}


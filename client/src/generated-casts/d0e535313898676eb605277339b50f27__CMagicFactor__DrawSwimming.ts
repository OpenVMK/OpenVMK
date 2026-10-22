// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawSwimming

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawSwimming(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), 8)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_ar_AnimFrames = new LingoList([0, 0, 1, 1, 2, 2, 3, 3]);
  var t_iFrame = t_ar_AnimFrames[meProp(_me, "m_iMagicFrameCounter")];
  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_swimming_", t_iDir), "_"), t_iFrame);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  var t_ar_MemList = new LingoList([t_rMem, a_Mem_AvatImage]);
  return callMethod("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  }

}


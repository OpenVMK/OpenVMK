// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawMagicCarpet

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawMagicCarpet(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), meProp(_me, "m_arCarpetFrameList").count)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_carpet_", t_iDir), "_"), meProp(_me, "m_arCarpetFrameList")[meProp(_me, "m_iMagicFrameCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  return callMethod("createUnionImageFromMemberList", _me, new LingoList([t_rMem, a_Mem_AvatImage]), callNamed("point", 0, 0));
  }

}


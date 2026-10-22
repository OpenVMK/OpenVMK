// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawMagicCarpet

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawMagicCarpet(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_iMagicFrameCounter", lingoBinary("add", _me.m_iMagicFrameCounter, 1));
  if (lingoBinary("gt", _me.m_iMagicFrameCounter, _me.m_arCarpetFrameList.count)) {
  setThePropOf(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iDir = _me.m_arFlipList[lingoBinary("add", _me.m_iDir, 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_carpet_", t_iDir), "_"), _me.m_arCarpetFrameList[_me.m_iMagicFrameCounter]);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  return callNamed("createUnionImageFromMemberList", _me, new LingoList([t_rMem, a_Mem_AvatImage]), callNamed("point", 0, 0));
  }

}


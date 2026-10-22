// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawMagicBatOut

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawMagicBatOut(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicBatStateCounter", lingoBinary("add", meProp(_me, "m_iMagicBatStateCounter"), 1));
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), meProp(_me, "m_arBatFrameList").count)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  var t_arFrameList = new LingoList([5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0]);
  switch (1) {
case lingoBinary("lte", meProp(_me, "m_iMagicBatStateCounter"), 6):
  var t_ar_MemList = new LingoList([]);
  var t_sMemName = lingoBinary("join", "magic_batcloud_", t_arFrameList[meProp(_me, "m_iMagicBatStateCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_MemList, t_rMem)
  }

  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_bat_", t_iDir), "_"), meProp(_me, "m_arBatFrameList")[meProp(_me, "m_iMagicFrameCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_MemList, t_rMem)
  }

  if (lingoBinary("gt", t_ar_MemList.count, 1)) {
  return callMethod("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  }

  break;
case lingoBinary("and", lingoBinary("gt", meProp(_me, "m_iMagicBatStateCounter"), 6), lingoBinary("lte", meProp(_me, "m_iMagicBatStateCounter"), 12)):
  t_sMemName = lingoBinary("join", "magic_batcloud_", t_arFrameList[meProp(_me, "m_iMagicBatStateCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  return callMethod("createUnionImageFromMemberList", _me, new LingoList([a_Mem_AvatImage, t_rMem]), callNamed("point", 0, 0));
  }

  break;
case lingoBinary("gt", meProp(_me, "m_iMagicBatStateCounter"), 12):
  return undefined;
  }

}


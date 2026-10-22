// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawMagicSharkIn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawMagicSharkIn(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicBatStateCounter", lingoBinary("add", meProp(_me, "m_iMagicBatStateCounter"), 1));
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), meProp(_me, "m_arBatFrameList").count)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  switch (1) {
case lingoBinary("lte", meProp(_me, "m_iMagicBatStateCounter"), 6):
  var t_arFrameList = new LingoList([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  var t_sMemName = lingoBinary("join", "magic_batcloud_", t_arFrameList[meProp(_me, "m_iMagicBatStateCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  break;
case lingoBinary("and", lingoBinary("gt", meProp(_me, "m_iMagicBatStateCounter"), 6), lingoBinary("lte", meProp(_me, "m_iMagicBatStateCounter"), 12)):
  t_arFrameList = new LingoList([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  t_sMemName = lingoBinary("join", "magic_batcloud_", t_arFrameList[meProp(_me, "m_iMagicBatStateCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  break;
case meProp(_me, "m_bTalk"):
  if (lingoBinary("gt", meProp(_me, "m_iMagicBatStateCounter"), 12)) {
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), 2)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_sName = meProp(_me, "m_ar_SharkTalkFrames")[meProp(_me, "m_iMagicFrameCounter")];
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sName, t_iDir), "_"), 0);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  }

  break;
case lingoBinary("gt", meProp(_me, "m_iMagicBatStateCounter"), 12):
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "Magic_shark_swim_", t_iDir), "_"), meProp(_me, "m_arBatFrameList")[meProp(_me, "m_iMagicFrameCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  break;
  }

}


// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawMagicSharkIn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawMagicSharkIn(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_iMagicBatStateCounter", lingoBinary("add", _me.m_iMagicBatStateCounter, 1));
  setThePropOf(_me, "m_iMagicFrameCounter", lingoBinary("add", _me.m_iMagicFrameCounter, 1));
  if (lingoBinary("gt", _me.m_iMagicFrameCounter, _me.m_arBatFrameList.count)) {
  setThePropOf(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iDir = _me.m_arFlipList[lingoBinary("add", _me.m_iDir, 1)];
  if (lingoBinary("eq", 1, t_iDir)) {
  var t_arFrameList = new LingoList([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  var t_sMemName = lingoBinary("join", "magic_batcloud_", t_arFrameList[_me.m_iMagicBatStateCounter]);
  if (lingoBinary("lte", _me.m_iMagicBatStateCounter, 6)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  }

  if (lingoBinary("eq", callNamed("memberExists", t_sMemName), t_iDir)) {
  t_arFrameList = new LingoList([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  t_sMemName = lingoBinary("join", "magic_batcloud_", t_arFrameList[_me.m_iMagicBatStateCounter]);
  if (lingoBinary("and", lingoBinary("lte", _me.m_iMagicBatStateCounter, 12), lingoBinary("gt", _me.m_iMagicBatStateCounter, 6))) {
  t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  }

  if (lingoBinary("eq", t_iDir, _me.m_bTalk)) {
  if (lingoBinary("gt", _me.m_iMagicBatStateCounter, 12)) {
  if (lingoBinary("gt", _me.m_iMagicFrameCounter, 2)) {
  setThePropOf(_me, "m_iMagicFrameCounter", 1);
  }

  var t_sName = _me.m_ar_SharkTalkFrames[_me.m_iMagicFrameCounter];
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sName, t_iDir), "_"), 0);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  }

  }

  if (lingoBinary("eq", callNamed("memberExists", t_sMemName), t_iDir)) {
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "Magic_shark_swim_", t_iDir), "_"), _me.m_arBatFrameList[_me.m_iMagicFrameCounter]);
  if (lingoBinary("gt", _me.m_iMagicBatStateCounter, 12)) {
  t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

  }

}


// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawLightning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawLightning(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), meProp(_me, "m_arLightningFrameList").count)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "lightning_", t_iDir), "_"), meProp(_me, "m_arLightningFrameList")[meProp(_me, "m_iMagicFrameCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  return new LingoList([t_rMem.image, callMethod("extractAlpha", t_rMem.image), undefined]);
  }

}


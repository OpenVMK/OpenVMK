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

  // HAND-CORRECTED: this cast drew the bolt alone, dropping the avatar. Ported from
  // a later build's CMagicFactor (vmkmpcasts/mp11248): avatar and bolt in one image,
  // using the direction 0 bolt for every facing.
  var t_sMemName = lingoBinary("join", "lightning_0_", meProp(_me, "m_arLightningFrameList")[meProp(_me, "m_iMagicFrameCounter")]);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  var t_ImgData = callMethod("createUnionImageFromMemberList", _me, new LingoList([a_Mem_AvatImage, t_rMem]), callNamed("point", 0, 0));
  setThePropOf(t_ImgData[3], "locV", lingoBinary("add", t_ImgData[3].locV, 10));
  return t_ImgData;
  }

}


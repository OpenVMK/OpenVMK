// d0e535313898676eb605277339b50f27.cct / CBodypartClass_ri / defineAnimFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function defineAnimFrame(_me: LingoMe, a_mp_AnimData: LingoValue, tTargetPartList: LingoValue) {
  if (callMethod("getOne", tTargetPartList, meProp(_me, "m_sPart"))) {
  if (lingoBinary("gt", callMethod("findPos", a_mp_AnimData, symbol("Dir")), 0)) {
  var tdir = a_mp_AnimData.Dir;
  } else {
  tdir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)];
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_AnimData, symbol("whole")), 0)) {
  var tMemString = a_mp_AnimData.whole;
  } else {
  tMemString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_mp_AnimData.act, meProp(_me, "m_sPart")), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), a_mp_AnimData.frame);
  }

  setMeProp(_me, "m_sSetAnimFrame", tMemString);
  }

}


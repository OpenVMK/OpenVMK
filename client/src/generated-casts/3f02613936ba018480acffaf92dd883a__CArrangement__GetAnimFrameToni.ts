// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / GetAnimFrameToni

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAnimFrameToni(_me: LingoMe, i_anim: LingoValue) {
  var tFrame = "";
  var t_iFrame = lingoBinary("div", meProp(_me, "m_iFrame"), meProp(_me, "m_ar_animContainers")[i_anim].fpsdivider);
  if (lingoBinary("lt", t_iFrame, 1)) {
  t_iFrame = 1;
  }

  if (lingoBinary("lte", meProp(_me, "m_ar_animContainers")[i_anim].offset, t_iFrame)) {
  tFrame = meProp(_me, "m_ar_pAnimations")[i_anim][t_iFrame];
  }

  return tFrame;
}


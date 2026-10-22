// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / GetAnimFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAnimFrame(_me: LingoMe, i_anim: LingoValue) {
  var tFrame = "";
  var t_iFrame = lingoBinary("sub", lingoBinary("div", meProp(_me, "m_iFrame"), meProp(_me, "m_ar_animContainers")[i_anim].fpsdivider), meProp(_me, "m_ar_animContainers")[i_anim].offset);
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_ar_sounds"), callNamed("string", t_iFrame)))) ? 0 : 1)) {
  var snd = meProp(_me, "m_ar_sounds")[callNamed("string", t_iFrame)];
  if (lingoBinary("lt", snd.playcount, 1)) {
  setThePropOf(snd, "playcount", lingoBinary("add", snd.playcount, 1));
  callNamed("executeMessage", "PlayFxSound", snd.name)
  }

  }

  if (lingoBinary("gt", t_iFrame, 0)) {
  tFrame = meProp(_me, "m_ar_pAnimations")[i_anim][t_iFrame];
  }

  return tFrame;
}


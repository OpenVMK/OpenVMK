// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_sAnimationID: LingoValue, a_bState: LingoValue, a_kParam: LingoValue, a_kParam2: LingoValue) {
  var t_rAnimation = meProp(_me, "m_ar_rAnimations")[a_sAnimationID];
  if (callNamed("objectp", t_rAnimation)) {
  switch (a_bState) {
case symbol("followObject"):
  callMethod("setFollowRoomObject", callMethod("GetVisual", t_rAnimation), a_kParam)
  break;
case symbol("pause"):
case symbol("play"):
case symbol("freeze"):
  callMethod("SetParam", t_rAnimation, "ANIMATIONSTATE", a_bState)
  break;
case symbol("stop"):
  callMethod("SetParam", t_rAnimation, "ANIMATIONSTATE", a_bState)
  callMethod("SetParam", t_rAnimation, "FRAMECOUNTER", 1)
  break;
case symbol("rewind"):
  callMethod("SetParam", t_rAnimation, "FRAMECOUNTER", 1)
  break;
case symbol("goto"):
  if (callNamed("integerp", a_kParam)) {
  callMethod("SetParam", t_rAnimation, "FRAMECOUNTER", a_kParam)
  } else {
  if (callNamed("stringp", a_kParam)) {
  callMethod("gotomarker", callMethod("GetFactor", t_rAnimation), a_kParam, a_kParam2)
  }

  }

  break;
case symbol("show"):
case symbol("hide"):
  if (callNamed("objectp", callMethod("GetVisual", t_rAnimation))) {
  callMethod("setState", callMethod("GetVisual", t_rAnimation), a_bState)
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Error, unknown animation state", a_bState))
  break;
  break;
  break;
  }

  }

}


// 3f02613936ba018480acffaf92dd883a.cct / CFactorVmkAnimation / playEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playEvent(_me: LingoMe, t_iFrameCounter: LingoValue) {
  var t_sCurrentMarker = callMethod("getaProp", meProp(_me, "m_ar_rEvents"), callNamed("string", t_iFrameCounter));
  if ((lingoTruthy(callNamed("voidp", t_sCurrentMarker)) ? 0 : 1)) {
  var t_sCurrentEvent = t_sCurrentMarker.word[1];
  var t_iEventNameLength = lingoBinary("add", t_sCurrentEvent.length, 2);
  switch (t_sCurrentEvent) {
case "stop":
case "Stop":
case "STOP":
  callMethod("SetParam", callMethod("getObject", _me), "FRAMECOUNTER", 1)
  callMethod("SetParam", callMethod("getObject", _me), "ANIMATIONSTATE", symbol("stop"))
  callNamed("executeMessage", symbol("animation_state_changed"), symbol("stop"), callMethod("GetParam", callMethod("getObject", _me), "ANIMATIONID"))
  break;
case "pause":
case "Pause":
case "PAUSE":
  callNamed("executeMessage", symbol("animation_state_changed"), symbol("pause"), callMethod("GetParam", callMethod("getObject", _me), "ANIMATIONID"))
  callMethod("SetParam", callMethod("getObject", _me), "ANIMATIONSTATE", symbol("pause"))
  break;
case "remove":
case "Remove":
case "REMOVE":
  var t_sName = callMethod("GetParam", callMethod("getObject", _me), "ANIMATIONID");
  if (lingoBinary("neq", callNamed("getObject", "AnimationManager"), 0)) {
  callMethod("RemoveAnimation", callNamed("getObject", "AnimationManager"), t_sName)
  }

  break;
case "gotoframe":
case "GOTOFRAME":
case "GoToFrame":
case "goto":
case "GOTO":
case "Goto":
  var t_sFrame = t_sCurrentMarker.char.range(t_iEventNameLength, t_sCurrentMarker.length);
  var t_iFrame = callNamed("integer", t_sFrame);
  if (callNamed("integerp", t_iFrame)) {
  callMethod("SetParam", callMethod("getObject", _me), "FRAMECOUNTER", t_iFrame)
  } else {
  if (callNamed("stringp", t_sFrame)) {
  callMethod("gotomarker", _me, t_sFrame)
  }

  }

  break;
  default:
  callNamed("executeMessage", t_sCurrentEvent)
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  }

}


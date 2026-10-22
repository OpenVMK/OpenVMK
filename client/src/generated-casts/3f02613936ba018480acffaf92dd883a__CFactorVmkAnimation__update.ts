// 3f02613936ba018480acffaf92dd883a.cct / CFactorVmkAnimation / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_bState = callMethod("GetParam", callMethod("getObject", _me), "ANIMATIONSTATE");
  var t_iFrameCounter = callMethod("GetParam", callMethod("getObject", _me), "FRAMECOUNTER");
  if (lingoBinary("or", lingoBinary("eq", t_bState, symbol("play")), lingoBinary("eq", t_bState, symbol("freeze")))) {
  callMethod("PlaySound", _me, t_iFrameCounter)
  callMethod("playEvent", _me, t_iFrameCounter)
  if (lingoBinary("eq", t_iFrameCounter, callMethod("GetParam", callMethod("getObject", _me), "FRAMECOUNTER"))) {
  t_iFrameCounter = lingoBinary("add", t_iFrameCounter, 1);
  } else {
  t_iFrameCounter = callMethod("GetParam", callMethod("getObject", _me), "FRAMECOUNTER");
  }

  var t_iLastFrame = callMethod("GetParam", callMethod("getObject", _me), "LASTFRAME");
  if (lingoBinary("gt", t_iFrameCounter, t_iLastFrame)) {
  t_iFrameCounter = 1;
  if (lingoBinary("eq", t_bState, symbol("freeze"))) {
  callNamed("executeMessage", symbol("animation_freezed"), callMethod("GetParam", callMethod("getObject", _me), "ANIMATIONID"))
  callMethod("SetParam", callMethod("getObject", _me), "ANIMATIONSTATE", symbol("stop"))
  }

  }

  callMethod("UpdateVisual", callMethod("GetVisual", callMethod("getObject", _me)))
  callMethod("SetParam", callMethod("getObject", _me), "FRAMECOUNTER", t_iFrameCounter)
  }

}


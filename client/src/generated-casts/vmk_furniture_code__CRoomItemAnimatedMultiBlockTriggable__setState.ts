// vmk_furniture_code.cct / CRoomItemAnimatedMultiBlockTriggable / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, _this: LingoValue, a_iState: LingoValue) {
  if (lingoBinary("neq", a_iState, meProp(_me, "m_iState"))) {
  switch (a_iState) {
case 0:
  callMethod("animate", _this, 1)
  setMeProp(_me, "m_iDelay", 1);
  break;
case 1:
  callNamed("nothing")
  setMeProp(_me, "m_iDelay", 1);
  break;
  }

  }

  setMeProp(_me, "m_iState", a_iState);
}


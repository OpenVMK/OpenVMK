// vmk_furniture_code.cct / CRoomItemAnimatedMultiBlockTriggable / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mpFrameList", new LingoPropList([]));
  setMeProp(_me, "m_bReady", 0);
  var m_iLastState = undefined;
  setMeProp(_me, "m_iDelay", undefined);
  setMeProp(_me, "m_iMaxDelay", 5);
  return 1;
}


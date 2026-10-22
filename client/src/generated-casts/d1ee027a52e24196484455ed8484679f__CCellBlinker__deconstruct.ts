// d1ee027a52e24196484455ed8484679f.cct / CCellBlinker / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_rWindowElement", undefined);
  setMeProp(_me, "m_rHiliterCol", undefined);
  setMeProp(_me, "m_iDelay", undefined);
  setMeProp(_me, "m_rTargetRect", undefined);
  setMeProp(_me, "m_rActiveImage", undefined);
  setMeProp(_me, "m_rNormalImage", undefined);
  setMeProp(_me, "m_bToggle", undefined);
  setMeProp(_me, "m_bBlinking", undefined);
  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}


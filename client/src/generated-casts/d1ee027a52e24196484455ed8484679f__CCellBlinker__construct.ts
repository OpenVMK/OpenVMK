// d1ee027a52e24196484455ed8484679f.cct / CCellBlinker / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rWindowElement", undefined);
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_iDelay", 12);
  setMeProp(_me, "m_rTargetRect", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_rActiveImage", callNamed("image", 0, 0, 32));
  setMeProp(_me, "m_rNormalImage", callNamed("image", 0, 0, 32));
  setMeProp(_me, "m_bToggle", 0);
  setMeProp(_me, "m_bBlinking", 0);
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}


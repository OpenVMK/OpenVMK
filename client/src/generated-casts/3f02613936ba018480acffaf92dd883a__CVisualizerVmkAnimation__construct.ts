// 3f02613936ba018480acffaf92dd883a.cct / CVisualizerVmkAnimation / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_channels", new LingoList([]));
  setMeProp(_me, "m_rAnchorObject", undefined);
  setMeProp(_me, "m_npcSprite", undefined);
  setMeProp(_me, "m_npcMoveMode", symbol("stay"));
  var m_npcMoveDeltaDistance = callNamed("vector", 0, 0, 0);
  setMeProp(_me, "m_npcMoveStartTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_npcMoveStartPos", callNamed("vector", 0, 0, 0));
  return 1;
}


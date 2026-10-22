// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoLoadStructure / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_rTypeMapXML", callNamed("CreateXML"));
  setMeProp(_me, "m_rNullObjDesc", undefined);
  setMeProp(_me, "m_pNotifyObject", undefined);
  return 1;
}


// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoLoadStructure / _FileLoadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FileLoadCallback(_me: LingoMe, a_sMember: LingoValue) {
  setMeProp(_me, "m_rTypeMapXML", callNamed("CreateXML", callNamed("getMember", a_sMember).text));
  setMeProp(_me, "m_bReady", 1);
  callMethod("parseHelpXML", meProp(_me, "m_pNotifyObject"), meProp(_me, "m_rTypeMapXML"))
}


// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoData / GetRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRooms(_me: LingoMe) {
  var t_rTopics = undefined;
  if (meProp(_me, "pXMLData").m_bReady) {
  callMethod("GetRoot", meProp(_me, "pXMLData").m_rTypeMapXML)
  if (callMethod("Search", meProp(_me, "pXMLData").m_rTypeMapXML, "type", "ROOMS")) {
  t_rTopics = callMethod("GetNode", meProp(_me, "pXMLData").m_rTypeMapXML);
  }

  }

  return t_rTopics;
}


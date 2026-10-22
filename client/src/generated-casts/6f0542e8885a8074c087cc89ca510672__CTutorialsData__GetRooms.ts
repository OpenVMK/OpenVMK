// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialsData / GetRooms

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
  if (callMethod("Search", meProp(_me, "pXMLData").m_rTypeMapXML, "type", "TUTORIALS")) {
  t_rTopics = callMethod("GetNode", meProp(_me, "pXMLData").m_rTypeMapXML);
  }

  }

  return t_rTopics;
}


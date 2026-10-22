// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialsData / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pXMLData", callNamed("createObject", "Tutorials XML Loader", "CTutorialsLoadStructure"));
  callMethod("setNotifyObject", meProp(_me, "pXMLData"), _me)
  callMethod("LoadMapFile", meProp(_me, "pXMLData"))
  setMeProp(_me, "bParsed", 0);
  setMeProp(_me, "m_pRooms", new LingoPropList([]));
  return 1;
}


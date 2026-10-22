// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / InitializeObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitializeObject(_me: LingoMe) {
  if (meProp(_me, "m_bSettingsDataArrived")) {
  setMeProp(_me, "m_pTutorialsData", callNamed("createObject", "Tutorials Data", "CTutorialsData"));
  }

}


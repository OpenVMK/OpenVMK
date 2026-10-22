// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialsLoadStructure / LoadMapFile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadMapFile(_me: LingoMe) {
  if (callNamed("variableExists", "tutorials_url")) {
  var t_sFile = callNamed("getVariable", "tutorials_url");
  var t_sMember = "Tutorials Structure";
  var t_iMember = callNamed("queueDownload", t_sFile, t_sMember, symbol("text"));
  callNamed("registerDownloadCallback", t_iMember, symbol("_FileLoadCallback"), callMethod("getID", _me), t_sMember)
  setMeProp(_me, "m_bReady", 0);
  } else {
  callNamed("error", _me, "URL for external Tutorials Structure not defined!", symbol("_LoadMapFile"))
  setMeProp(_me, "m_bReady", 1);
  }

}


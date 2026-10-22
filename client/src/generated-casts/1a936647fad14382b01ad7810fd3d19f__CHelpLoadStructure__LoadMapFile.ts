// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpLoadStructure / LoadMapFile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadMapFile(_me: LingoMe) {
  if (callNamed("variableExists", "helpstructure_url")) {
  var t_sFile = callNamed("getVariable", "helpstructure_url");
  var t_sMember = "Help Structure";
  var t_iMember = callNamed("queueDownload", t_sFile, t_sMember, symbol("text"));
  callNamed("registerDownloadCallback", t_iMember, symbol("_FileLoadCallback"), callMethod("getID", _me), t_sMember)
  setMeProp(_me, "m_bReady", 0);
  } else {
  callNamed("error", _me, "URL for external Help Structure not defined!", symbol("_LoadMapFile"))
  setMeProp(_me, "m_bReady", 1);
  }

}


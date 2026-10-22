// fb329984daeb374016fc0289347418de.cct / CWallPhotoViewer / PhotoIdOfPoster

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PhotoIdOfPoster(_me: LingoMe, tMsg: LingoValue) {
  setMeProp(_me, "m_iRef", callMethod("GetIntFrom", tMsg.connection));
  setMeProp(_me, "m_iId", callMethod("GetIntFrom", tMsg.connection));
  callMethod("RequestWallPhotoData", _me, meProp(_me, "m_iId"))
}


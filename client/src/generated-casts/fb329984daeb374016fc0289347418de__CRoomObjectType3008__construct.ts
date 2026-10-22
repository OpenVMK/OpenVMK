// fb329984daeb374016fc0289347418de.cct / CRoomObjectType3008 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sObjID", "PosterPhotoViewer");
  setMeProp(_me, "m_view", undefined);
  setMeProp(_me, "m_bReady", 0);
  return callNamed("callAncestor", symbol("construct"), _me);
}


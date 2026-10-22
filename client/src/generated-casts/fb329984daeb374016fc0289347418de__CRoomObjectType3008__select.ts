// fb329984daeb374016fc0289347418de.cct / CRoomObjectType3008 / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe) {
  var tRef = callNamed("value", callMethod("GetParam", callMethod("getObject", _me), "REF"));
  if (callNamed("objectExists", meProp(_me, "m_sObjID"))) {
  callNamed("removeObject", meProp(_me, "m_sObjID"))
  }

  setMeProp(_me, "m_view", callNamed("createObject", meProp(_me, "m_sObjID"), "CWallPhotoViewer"));
  callMethod("RequestPhotoID", meProp(_me, "m_view"), tRef)
  callNamed("callAncestor", symbol("select"), _me)
}


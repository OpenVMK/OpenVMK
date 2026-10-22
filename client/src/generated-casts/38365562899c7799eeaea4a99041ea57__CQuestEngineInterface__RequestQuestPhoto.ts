// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineInterface / RequestQuestPhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestQuestPhoto(_me: LingoMe, a_iID: LingoValue) {
  var tPhoto = callMethod("getaProp", meProp(_me, "m_mp_photos"), a_iID);
  if (callNamed("voidp", tPhoto)) {
  callMethod("AddID", _me, a_iID)
  }

  callMethod("retrieveQuestPhotoData", callNamed("getBinaryManager"), a_iID, callMethod("getID", _me))
}


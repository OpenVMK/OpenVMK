// fireworks_engine.cct / 3D Object Manager Class / deleteObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteObject(_me: LingoMe, p_ID: LingoValue) {
  var t_object = callNamed("getObject", p_ID);
  if (t_object) {
  callMethod("removeMeFromHierarchy", t_object)
  callMethod("deleteOne", meProp(_me, "m_lObjectPile"), t_object)
  }

  callNamed("removeObject", p_ID)
}


// fireworks_engine.cct / 3D Object Manager Class / copyObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function copyObject(_me: LingoMe, p_newID: LingoValue, p_source: LingoValue) {
  if ((lingoTruthy(p_source) ? 0 : 1)) {
  callNamed("put", "Object Manager Class : copyObject() : invalid input")
  return undefined;
  }

  var t_ID = lingoBinary("join", "3DObject:", theProperty("milliSeconds"));
  if (p_newID) {
  t_ID = p_newID;
  }

  var t_object = callNamed("createObject", t_ID, "3D Object Class");
  callMethod("initObject", t_object, callMethod("GetData", p_source), callMethod("getTransform", p_source), callMethod("getParent", p_source), callMethod("getChildren", p_source))
  callMethod("append", meProp(_me, "m_lObjectPile"), t_object)
  return t_object;
}


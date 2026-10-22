// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue, a_rXML: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_rChilds"), a_sKey))) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Object with given Key exists:", "\""), a_sKey), "\""), symbol("create"));
  }

  var t_rObj = callNamed("createObject", symbol("temp"), meProp(_me, "m_rProtoCls"));
  callMethod("Setkey", t_rObj, a_sKey)
  if (callNamed("objectp", t_rObj)) {
  var t_rNode = callMethod("GetNode", a_rXML);
  setThePropOf(t_rObj, "m_sType", t_rNode._type);
  setThePropOf(t_rObj, "m_sValue", t_rNode.value);
  setThePropOf(t_rObj, "m_rParent", _this);
  setThePropOf(t_rObj, "m_rFactory", meProp(_me, "m_rFactory"));
  t_rObj = callMethod("_BuildObj", meProp(_me, "m_rFactory"), t_rObj, a_rXML);
  }

  if (callNamed("objectp", t_rObj)) {
  callMethod("setaProp", meProp(_me, "m_rChilds"), a_sKey, t_rObj)
  return 1;
  } else {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Failed to create object:", "\""), a_sKey), "\""), symbol("create"));
  }

}


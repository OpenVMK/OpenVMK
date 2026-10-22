// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / Search

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Search(_me: LingoMe, _this: LingoValue, a_sAttr: LingoValue, a_sValue: LingoValue, a_bWrap: LingoValue) {
  if (lingoBinary("or", (lingoTruthy(callNamed("stringp", a_sAttr)) ? 0 : 1), (lingoTruthy(callNamed("stringp", a_sValue)) ? 0 : 1))) {
  return 0;
  }

  switch (a_sAttr) {
case "VALUE":
case "value":
case symbol("value"):
  var t_sValue = meProp(_me, "m_rRef").value;
  break;
case "TYPE":
case "type":
case symbol("type"):
  t_sValue = meProp(_me, "m_rRef")._type;
  break;
case "ID":
case "id":
case symbol("id"):
  var t_rChild = meProp(_me, "m_rRef").child;
  var t_iCount = t_rChild.count;
  for (var i = 1; i <= t_iCount; ++i) {
  if (lingoBinary("eq", callMethod("getPropAt", t_rChild, i), a_sValue)) {
  setMeProp(_me, "m_rRef", t_rChild[i]);
  return 1;
  }

  }

  break;
  default:
  t_sValue = callMethod("getaProp", meProp(_me, "m_rRef").param, a_sAttr);
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("eq", t_sValue, a_sValue)) {
  return 1;
  }

  var t_rTemp = meProp(_me, "m_rRef");
  for (var t_rChild of meProp(_me, "m_rRef").child.toArray()) {
  setMeProp(_me, "m_rRef", t_rChild);
  if (callMethod("Search", _this, a_sAttr, a_sValue)) {
  return 1;
  }

  }

  if (lingoBinary("eq", a_bWrap, 1)) {
  setMeProp(_me, "m_rRef", meProp(_me, "m_rRoot"));
  return callMethod("Search", _this, a_sAttr, a_sValue, 0);
  }

  setMeProp(_me, "m_rRef", t_rTemp);
  return 0;
}


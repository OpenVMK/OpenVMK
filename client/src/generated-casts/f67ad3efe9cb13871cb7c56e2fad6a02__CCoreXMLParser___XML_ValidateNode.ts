// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / _XML_ValidateNode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _XML_ValidateNode(_me: LingoMe, _this: LingoValue, a_rDTD: LingoValue, a_rNode: LingoValue) {
  var t_sTag = a_rNode._type;
  var t_rDesc = callMethod("getaProp", a_rDTD, t_sTag);
  if (callNamed("voidp", t_rDesc)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Undefined tag:", t_sTag), symbol("_XML_ValidateNode"));
  }

  var t_rParams = a_rNode.param;
  var t_iCount = t_rDesc.attributes.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sAttr = callMethod("getPropAt", t_rDesc.attributes, i);
  var t_rAttr = t_rDesc.attributes[i];
  if (callNamed("voidp", callMethod("getaProp", t_rParams, t_sAttr))) {
  switch (t_rAttr.data) {
case symbol("default"):
  callMethod("setaProp", t_rParams, t_sAttr, t_rAttr.value)
  break;
case symbol("required"):
  var t_sErr = lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Missing attribute", "\""), t_sAttr), "\""), "in"), t_sTag);
  return callNamed("error", _this, t_sErr, symbol("_XML_ValidateNode"));
  }

  }

  }

  var t_rChilds = a_rNode.child;
  var t_mp_sType_iCount = new LingoPropList(["EMPTY", 1, "#CDATA", 1, "#PCDATA", 1, "ANY", 1]);
  for (var t_rChild of t_rChilds.toArray()) {
  var t_sType = t_rChild._type;
  t_iCount = callMethod("getaProp", t_mp_sType_iCount, t_sType);
  if (callNamed("voidp", t_iCount)) {
  t_iCount = 0;
  }

  callMethod("setaProp", t_mp_sType_iCount, t_sType, lingoBinary("add", t_iCount, 1))
  }

  t_iCount = t_rDesc.elements.count;
  for (var i = 1; i <= t_iCount; ++i) {
  t_sType = callMethod("getPropAt", t_rDesc.elements, i);
  var t_sNeed = t_rDesc.elements[i];
  switch (callMethod("getaProp", t_mp_sType_iCount, t_sType)) {
case 1:
  break;
case undefined:
  if (lingoBinary("or", lingoBinary("eq", t_sNeed, ""), lingoBinary("eq", t_sNeed, "+"))) {
  t_sErr = lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Missing child:", "\""), t_sType), "\""), "in"), t_sTag);
  return callNamed("error", _this, t_sErr, symbol("_XML_ValidateNode"));
  }

  break;
  default:
  if (lingoBinary("or", lingoBinary("eq", t_sNeed, ""), lingoBinary("eq", t_sNeed, "?"))) {
  t_sErr = lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Too many child occurences:", "\""), t_sType), "\""), "in"), t_sTag);
  return callNamed("error", _this, t_sErr, symbol("_XML_ValidateNode"));
  }

  }

  }

  for (var t_rChild of a_rNode.child.toArray()) {
  if ((lingoTruthy(callMethod("_XML_ValidateNode", _this, a_rDTD, t_rChild)) ? 0 : 1)) {
  return 0;
  }

  }

  return 1;
}


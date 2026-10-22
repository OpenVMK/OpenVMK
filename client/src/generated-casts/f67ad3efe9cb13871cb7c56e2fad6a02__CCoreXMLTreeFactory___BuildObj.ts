// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / _BuildObj

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _BuildObj(_me: LingoMe, _this: LingoValue, a_rProto: LingoValue, a_rXML: LingoValue) {
  var t_rNode = callMethod("GetNode", a_rXML);
  var t_rType = callMethod("getaProp", meProp(_me, "m_rTagDefMap"), t_rNode._type);
  if (callNamed("voidp", t_rType)) {
  t_rType = new LingoPropList([symbol("name"), t_rNode._type, symbol("type"), "instance", symbol("class"), ""]);
  }

  var t_rClass = undefined;
  var t_sClsKey = t_rType._class;
  if (lingoBinary("neq", t_sClsKey, "")) {
  t_rClass = callNamed("GetClsVariable", t_sClsKey);
  if (lingoBinary("eq", t_rClass, 0)) {
  callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Undefined class:", "\""), t_sClsKey), "\""), symbol("_BuildObj"))
  return a_rProto;
  }

  }

  var t_iCount = t_rNode.param.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sKey = callMethod("getPropAt", t_rNode.param, i);
  var t_sValue = t_rNode.param[i];
  callMethod("SetParam", a_rProto, t_sKey, t_sValue)
  }

  var t_ar_rChild = new LingoList([]);
  t_iCount = t_rNode.child.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rChild = t_rNode.child[i];
  t_rType = callMethod("getaProp", meProp(_me, "m_rTagDefMap"), t_rChild._type);
  if (callNamed("voidp", t_rType)) {
  var t_sType = "instance";
  } else {
  t_sType = t_rType._type;
  }

  switch (t_sType) {
case "instance":
case undefined:
  callMethod("add", t_ar_rChild, t_rChild)
  break;
case "container":
  for (var t_rSibling of t_rChild.child.toArray()) {
  callMethod("add", t_ar_rChild, t_rSibling)
  }

  break;
case "parameter":
  callNamed("error", _this, "TODO: Parameters supported incorrectly!", symbol("_BuildObj"))
  for (var j = 1; j <= t_rChild.param.count; ++j) {
  t_sKey = callMethod("getPropAt", t_rChild.param, j);
  t_sValue = t_rChild.param[j];
  callMethod("SetParam", a_rProto, t_sKey, t_sValue)
  }

  break;
case "discard":
  break;
  default:
  callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Invalid tag type:", "\""), t_sType), "\""), symbol("_BuildObj"))
  break;
  }

  }

  var t_rObj = a_rProto;
  if (callNamed("listp", t_rClass)) {
  t_rObj = undefined;
  var t_rTemp = a_rProto;
  var t_bInit = 0;
  for (var t_sCls of t_rClass.toArray()) {
  var t_iMemNum = callNamed("getmemnum", t_sCls);
  if (lingoBinary("lt", t_iMemNum, 1)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Script not found:", t_sCls), symbol("_BuildObj"));
  }

  t_rObj = callMethod("rawNew", callNamed("script", t_iMemNum));
  t_bInit = callMethod("handler", t_rObj, symbol("construct"));
  callMethod("setaProp", t_rObj, symbol("ancestor"), t_rTemp)
  t_rTemp = t_rObj;
  if (t_bInit) {
  callMethod("construct", t_rObj)
  }

  }

  }

  if (lingoBinary("gt", t_ar_rChild.count, 0)) {
  var t_rXML = callNamed("CreateXML");
  t_iCount = t_ar_rChild.count;
  for (var i = 1; i <= t_iCount; ++i) {
  t_rChild = t_ar_rChild[i];
  callMethod("copy", t_rXML, t_rChild)
  t_sKey = callMethod("createKey", _this);
  if (callMethod("Search", t_rXML, "type", t_rChild._type)) {
  callMethod("create", t_rObj, t_sKey, t_rXML)
  }

  callMethod("close", t_rXML)
  }

  }

  callMethod("setaProp", meProp(_me, "m_mp_sKey_rObj"), callMethod("GetKey", t_rObj), t_rObj)
  return t_rObj;
}


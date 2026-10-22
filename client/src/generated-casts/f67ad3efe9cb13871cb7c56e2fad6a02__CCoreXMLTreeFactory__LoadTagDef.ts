// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / LoadTagDef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadTagDef(_me: LingoMe, _this: LingoValue, a_rXML: LingoValue) {
  if (callMethod("Search", a_rXML, "type", "TAGS")) {
  var t_rNode = callMethod("GetNode", a_rXML);
  var t_iCount = t_rNode.child.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rChild = t_rNode.child[i];
  var t_sName = callMethod("getaProp", t_rChild.param, "NAME");
  var t_sType = callMethod("getaProp", t_rChild.param, "TYPE");
  var t_sClass = callMethod("getaProp", t_rChild.param, "CLASS");
  callMethod("setaProp", meProp(_me, "m_rTagDefMap"), t_sName, new LingoPropList([symbol("name"), t_sName, symbol("type"), t_sType, symbol("class"), t_sClass]))
  }

  return 1;
  } else {
  return callNamed("error", _this, "Missing data in document!", symbol("LoadTagDef"));
  }

}


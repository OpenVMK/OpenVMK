// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / GetNode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetNode(_me: LingoMe, _this: LingoValue) {
  var t_rNode = new LingoPropList([]);
  callMethod("setaProp", t_rNode, symbol("type"), meProp(_me, "m_sType"))
  callMethod("setaProp", t_rNode, symbol("value"), meProp(_me, "m_sValue"))
  callMethod("setaProp", t_rNode, symbol("param"), callMethod("duplicate", meProp(_me, "m_rParams")))
  callMethod("setaProp", t_rNode, symbol("child"), new LingoPropList([]))
  for (var t_rChild of meProp(_me, "m_rChilds").toArray()) {
  var t_rTmp = callMethod("GetNode", t_rChild);
  var t_sID = callMethod("getaProp", t_rTmp.param, "ID");
  if (callNamed("voidp", t_sID)) {
  t_sID = "";
  }

  callMethod("addProp", t_rNode.child, t_sID, t_rTmp)
  }

  return t_rNode;
}


// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTree / setup_import_node

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup_import_node(_me: LingoMe, a_rTreeNode: LingoValue, a_mpXmlNode: LingoValue) {
  var t_rThisNode = callNamed("createObject", symbol("temp"), "CBspTreeNode");
  setThePropOf(t_rThisNode, "dimensions", callNamed("value", callMethod("getaProp", a_mpXmlNode.param, "DIM")));
  var t_sObjRef = callMethod("getaProp", a_mpXmlNode.param, "OBJREF");
  if ((lingoTruthy(callNamed("voidp", t_sObjRef)) ? 0 : 1)) {
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  setThePropOf(t_rThisNode, "obj", callMethod("Search", t_rContext, "REF", t_sObjRef, 1));
  while (lingoBinary("eq", callMethod("GetParam", t_rThisNode.obj, "CLASS"), "floor")) {
  if (lingoBinary("lt", t_rThisNode.obj.count, 1)) {
  callNamed("error", _me, lingoBinary("join", "Could not resolve tile for object reference ", t_sObjRef), symbol("setup_import_node"))
  break;
  }

  setThePropOf(t_rThisNode, "obj", callMethod("Search", t_rThisNode.obj[1], "REF", t_sObjRef, 1));
  if ((lingoTruthy(callNamed("objectp", t_rThisNode.obj)) ? 0 : 1)) {
  break;
  }

  }

  setThePropOf(t_rThisNode, "isleaf", 1);
  }

  callMethod("append", a_rTreeNode.children, t_rThisNode)
  for (var i = 1; i <= a_mpXmlNode.child.count; ++i) {
  callMethod("setup_import_node", _me, t_rThisNode, a_mpXmlNode.child[i])
  }

}


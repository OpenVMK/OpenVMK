// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / parseHelpXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseHelpXML(_me: LingoMe, xmlData: LingoValue) {
  var t_sMemName = "HELPITEM.node";
  var t_iMemNum = callNamed("createMember", t_sMemName, symbol("text"));
  var t_rMem = callNamed("member", t_iMemNum);
  setThePropOf(t_rMem, "font", "Arial");
  setThePropOf(t_rMem, "wordWrap", 0);
  setThePropOf(t_rMem, "fontStyle", new LingoList([symbol("plain")]));
  setThePropOf(t_rMem, "fontSize", 12);
  setThePropOf(t_rMem, "antialias", 0);
  setThePropOf(t_rMem, "color", callNamed("rgb", 255, 255, 255));
  var objects = callMethod("getTopics", _me);
  if ((lingoTruthy(callNamed("voidp", objects)) ? 0 : 1)) {
  for (var node of objects.child.toArray()) {
  if (lingoBinary("eq", node._type, "HELPCATEGORY")) {
  var t_clsList = callNamed("GetClsVariable", "help.menu.item.category");
  var nucategory = callNamed("createObject", symbol("random"), t_clsList);
  callMethod("addHelps", nucategory, node, t_rMem)
  callMethod("append", meProp(_me, "helpCategories"), nucategory)
  }

  }

  setMeProp(_me, "bParsed", 1);
  } else {
  callNamed("put", "ERROR while parsing Help XML data")
  }

  callNamed("removeMember", t_sMemName)
}


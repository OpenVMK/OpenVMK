// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / toString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toString(_me: LingoMe, a_iIndent: LingoValue) {
  if (callNamed("voidp", a_iIndent)) {
  a_iIndent = 0;
  }

  var t_sIndent = "";
  for (var i = 1; i <= a_iIndent; ++i) {
  t_sIndent = t_sIndent + "\t";
  }

  var t_sTag = lingoBinary("join", t_sIndent, "<NODE");
  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("space"), "DIM="), "\""), callNamed("string", meProp(_me, "dimensions"))), "\"");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "obj"))) ? 0 : 1)) {
  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("space"), "OBJREF="), "\""), callMethod("GetParam", meProp(_me, "obj"), "REF")), "\""), " />");
  } else {
  t_sTag = t_sTag + lingoBinary("join", ">", "\r");
  for (var t_rChild of meProp(_me, "children").toArray()) {
  t_sTag = t_sTag + lingoBinary("join", callMethod("toString", t_rChild, lingoBinary("add", a_iIndent, 1)), "\r");
  }

  t_sTag = t_sTag + lingoBinary("join", t_sIndent, "</NODE>");
  }

  return t_sTag;
}


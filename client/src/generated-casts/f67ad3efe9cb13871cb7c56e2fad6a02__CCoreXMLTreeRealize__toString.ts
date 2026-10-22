// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / toString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toString(_me: LingoMe, _this: LingoValue, a_iIndent: LingoValue) {
  if (callNamed("voidp", a_iIndent)) {
  a_iIndent = 0;
  }

  var t_sIndent = "";
  for (var i = 1; i <= a_iIndent; ++i) {
  t_sIndent = t_sIndent + "\t";
  }

  var t_sTag = lingoBinary("join", lingoBinary("join", t_sIndent, "<"), meProp(_me, "m_sType"));
  for (var i = 1; i <= meProp(_me, "m_rParams").count; ++i) {
  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("space"), callMethod("getPropAt", meProp(_me, "m_rParams"), i)), "="), "\""), meProp(_me, "m_rParams")[i]), "\"");
  }

  if (lingoBinary("eq", meProp(_me, "m_rChilds").count, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_sValue"), "")) {
  t_sTag = t_sTag + lingoBinary("join", callNamed("space"), "/>");
  } else {
  t_sTag = t_sTag + lingoBinary("join", ">", "\r");
  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sIndent, "\t"), meProp(_me, "m_sValue")), "\r");
  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sIndent, "</"), meProp(_me, "m_sType")), ">");
  }

  } else {
  t_sTag = t_sTag + lingoBinary("join", ">", "\r");
  if (lingoBinary("neq", meProp(_me, "m_sValue"), "")) {
  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sIndent, "\t"), meProp(_me, "m_sValue")), "\r");
  }

  for (var t_rChild of meProp(_me, "m_rChilds").toArray()) {
  t_sTag = t_sTag + lingoBinary("join", callMethod("toString", t_rChild, lingoBinary("add", a_iIndent, 1)), "\r");
  }

  t_sTag = t_sTag + lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sIndent, "</"), meProp(_me, "m_sType")), ">");
  }

  return t_sTag;
}


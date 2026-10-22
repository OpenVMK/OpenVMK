// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / Output

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Output(_me: LingoMe, _this: LingoValue, a_sTabs: LingoValue) {
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "\"");
  var t_sClass = chunkOf(callNamed("string", _this), "item", 2, lingoBinary("sub", callNamed("string", _this).item.count, 1));
  setTheProperty("itemDelimiter", t_sDelim);
  if (lingoBinary("eq", meProp(_me, "m_rChilds").count, 0)) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", a_sTabs, "<"), meProp(_me, "m_sType")), "KEY="), "\""), callMethod("GetKey", _this)), "\""), "CLASS="), "\""), t_sClass), "\""), "/>"))
  } else {
  callNamed("put", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", a_sTabs, "<"), meProp(_me, "m_sType")), "KEY="), "\""), callMethod("GetKey", _this)), "\""), "CLASS="), "\""), t_sClass), "\""), ">"))
  callNamed("call", symbol("Output"), meProp(_me, "m_rChilds"), lingoBinary("join", a_sTabs, "\t"))
  callNamed("put", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sTabs, "</"), meProp(_me, "m_sType")), ">"))
  }

}


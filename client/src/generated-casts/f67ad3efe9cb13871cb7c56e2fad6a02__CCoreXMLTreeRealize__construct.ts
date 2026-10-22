// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sKey", "");
  setMeProp(_me, "m_sType", "");
  setMeProp(_me, "m_sValue", "");
  setMeProp(_me, "m_rParams", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_rParams"))
  setMeProp(_me, "m_rParent", undefined);
  setMeProp(_me, "m_rChilds", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_rChilds"))
  setMeProp(_me, "m_rFactory", undefined);
  setMeProp(_me, "m_rProtoCls", callNamed("GetClsVariable", "core.xml.tree.realize"));
  return 1;
}


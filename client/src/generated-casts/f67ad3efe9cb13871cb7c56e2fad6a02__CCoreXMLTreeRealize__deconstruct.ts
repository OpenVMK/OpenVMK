// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  while (1) {
  if (lingoBinary("eq", meProp(_me, "m_rChilds").count, 0)) {
  break;
  }

  callMethod("remove", _this, callMethod("getPropAt", meProp(_me, "m_rChilds"), 1))
  }

  setMeProp(_me, "m_sValue", "");
  setMeProp(_me, "m_rParams", new LingoPropList([]));
  setMeProp(_me, "m_rParent", undefined);
  setMeProp(_me, "m_rChilds", new LingoPropList([]));
  setMeProp(_me, "m_rFactory", undefined);
  setMeProp(_me, "m_rProtoCls", undefined);
  return 1;
}


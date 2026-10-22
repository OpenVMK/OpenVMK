// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTree / setup_prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup_prepare(_me: LingoMe, a_ar_setup: LingoValue) {
  setMeProp(_me, "m_pRoot", callNamed("createObject", symbol("random"), "CBspTreeNode"));
  setThePropOf(meProp(_me, "m_pRoot"), "dimensions", callNamed("getMaxDimensions", a_ar_setup, meProp(_me, "m_iAxisMax")));
  for (var tNode of a_ar_setup.toArray()) {
  callMethod("append", meProp(_me, "m_pRoot").children, tNode)
  }

  for (var t_Obj of a_ar_setup.toArray()) {
  callNamed("removeObject", callMethod("getID", t_Obj))
  }

  a_ar_setup = new LingoList([]);
  callMethod("subdivide", meProp(_me, "m_pRoot"), 1)
}


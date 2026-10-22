// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / addComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addComponent(_me: LingoMe, i_sDef: LingoValue, t_bWithControlBar: LingoValue) {
  var t_rComponent = callNamed("createObject", lingoBinary("join", "CUIComponent", callNamed("getUniqueID")), "CUIComponent");
  callMethod("readDefinition", t_rComponent, i_sDef)
  callMethod("checkSize", t_rComponent, meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"))
  if (t_bWithControlBar) {
  var t_iPos = callNamed("max", meProp(_me, "m_ar_Children").count, 1);
  callMethod("addAt", meProp(_me, "m_ar_Children"), t_iPos, t_rComponent)
  } else {
  callMethod("append", meProp(_me, "m_ar_Children"), t_rComponent)
  }

  return t_rComponent;
}


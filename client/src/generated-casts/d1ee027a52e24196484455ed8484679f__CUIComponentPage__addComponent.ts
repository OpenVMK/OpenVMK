// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / addComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addComponent(_me: LingoMe, i_sDef: LingoValue, t_bWithControlBar: LingoValue, a_bMakeActive: LingoValue) {
  var t_rComponent = callNamed("createObject", symbol("random"), "CUIComponent");
  callMethod("readDefinition", t_rComponent, i_sDef)
  callMethod("checkSize", t_rComponent, meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"))
  callMethod("setParent", t_rComponent, _me)
  if (t_bWithControlBar) {
  var t_iPos = callNamed("max", meProp(_me, "m_ar_components").count, 1);
  callMethod("addAt", meProp(_me, "m_ar_components"), t_iPos, t_rComponent)
  } else {
  callMethod("append", meProp(_me, "m_ar_components"), t_rComponent)
  }

  if (a_bMakeActive) {
  if (callNamed("objectp", meProp(_me, "m_rActiveComponent"))) {
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 0)
  }

  setMeProp(_me, "m_rActiveComponent", t_rComponent);
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 1)
  var t_rLayout = callMethod("GetLayout", meProp(_me, "m_rActiveComponent"), 1);
  if (callNamed("objectp", meProp(_me, "m_rActive"))) {
  callMethod("inActivate", meProp(_me, "m_rActive"))
  }

  callMethod("Activate", t_rLayout)
  setMeProp(_me, "m_rActive", t_rLayout);
  }

  setMeProp(_me, "m_bNeedSorting", 1);
  return t_rComponent;
}


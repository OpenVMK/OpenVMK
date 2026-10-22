// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / _PopulateReasonList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PopulateReasonList(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWnd"))) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWnd"), "mods.logmessage.list");
  var t_rComponentsPage = callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage");
  callMethod("setSize", t_rComponentsPage, t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", t_rComponentsPage, callNamed("rgb", "#001F56"))
  for (var i = 1; i <= meProp(_me, "m_mp_modReasons").count; ++i) {
  var t_rComponent = callMethod("addComponent", t_rComponentsPage, "component.modreasons.xml");
  callMethod("setEvent", callMethod("GetLayout", t_rComponent, 1), callNamed("string", callMethod("getPropAt", meProp(_me, "m_mp_modReasons"), i)))
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), meProp(_me, "m_mp_modReasons")[i])
  }

  setMeProp(_me, "m_rComponentsPage", t_rComponentsPage);
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

}


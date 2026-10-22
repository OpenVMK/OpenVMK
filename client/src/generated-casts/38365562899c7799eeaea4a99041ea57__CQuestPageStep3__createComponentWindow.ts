// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / createComponentWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createComponentWindow(_me: LingoMe) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.tasklist");
  setMeProp(_me, "m_rComponentsPage", callNamed("createObject", "ComponentPage", "CUIComponentPage"));
  callMethod("setSize", meProp(_me, "m_rComponentsPage"), t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", meProp(_me, "m_rComponentsPage"), callNamed("rgb", "#001F56"))
  callMethod("addComponent", meProp(_me, "m_rComponentsPage"), "component.questengine.03.xml")
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
}


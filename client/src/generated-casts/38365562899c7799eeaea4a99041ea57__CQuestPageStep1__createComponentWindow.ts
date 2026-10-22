// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / createComponentWindow

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
  setMeProp(_me, "m_rComponentsPage", callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage"));
  callMethod("setSize", meProp(_me, "m_rComponentsPage"), t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", meProp(_me, "m_rComponentsPage"), callNamed("rgb", "#001F56"))
  var t_rComponent = callMethod("addComponent", meProp(_me, "m_rComponentsPage"), "component.questengine.step1.addTask.xml");
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
}


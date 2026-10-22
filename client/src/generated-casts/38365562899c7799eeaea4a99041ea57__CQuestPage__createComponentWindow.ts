// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / createComponentWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createComponentWindow(_me: LingoMe, m_rWindow: LingoValue, m_ar_components: LingoValue, t_ar_componentsPage: LingoValue) {
  for (var i = 1; i <= t_ar_componentsPage.count; ++i) {
  var t_sElemName = callMethod("getPropAt", t_ar_componentsPage, i);
  var t_ar_components = t_ar_componentsPage[i];
  var t_rClientElement = callMethod("getElement", m_rWindow, t_sElemName);
  var t_rComponentsPage = callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage");
  callMethod("setSize", t_rComponentsPage, t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", t_rComponentsPage, callNamed("rgb", "#001F56"))
  var t_rImg = callMethod("render", t_rComponentsPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  m_ar_components[t_sElemName] = t_rComponentsPage;
  }

}


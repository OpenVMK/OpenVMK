// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / AddTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddTask(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rComponentsPage"))) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.tasklist");
  var t_rComponent = callMethod("addComponent", meProp(_me, "m_rComponentsPage"), "component.questengine.step1.taskDesc.xml", 1);
  var t_rLayout = callMethod("GetLayout", t_rComponent, 1);
  if (callNamed("objectp", t_rLayout)) {
  callMethod("setText", t_rLayout, callNamed("getText", lingoBinary("join", "quest.taskname.", t_ar_data.taskType)))
  }

  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

}


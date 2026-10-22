// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStartQuest / add_task

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add_task(_me: LingoMe, t_ar_taskData: LingoValue) {
  var t_rComponent = callMethod("addComponent", meProp(_me, "m_ar_components")["quest.tasklist"], "component.quest.start.viewtask.xml");
  var t_sText = callNamed("getText", lingoBinary("join", "quest.taskname.", t_ar_taskData[symbol("taskType")]));
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), t_sText)
}


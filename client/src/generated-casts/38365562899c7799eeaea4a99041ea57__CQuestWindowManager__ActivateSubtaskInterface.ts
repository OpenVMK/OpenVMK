// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / ActivateSubtaskInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActivateSubtaskInterface(_me: LingoMe, t_sSubtask: LingoValue) {
  callMethod("_ChangePage", meProp(_me, "m_rInterface"), t_sSubtask)
  callMethod("open", meProp(_me, "m_rInterface"))
  if (callNamed("objectp", meProp(_me, "m_rOwner"))) {
  var t_iTargetHandler = symbol("ChangePageEvent");
  if (lingoBinary("gt", callMethod("getOne", callMethod("handlers", meProp(_me, "m_rOwner")), t_iTargetHandler), 0)) {
  callNamed("call", t_iTargetHandler, meProp(_me, "m_rOwner"), callMethod("getID", _me), t_sSubtask)
  }

  }

}


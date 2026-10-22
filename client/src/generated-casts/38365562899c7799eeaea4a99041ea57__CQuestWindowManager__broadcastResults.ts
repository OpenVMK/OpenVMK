// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / broadcastResults

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function broadcastResults(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rOwner"))) {
  var t_iTargetHandler = symbol("QuestDialogBroadcastEvent");
  if (lingoBinary("gt", callMethod("getOne", callMethod("handlers", meProp(_me, "m_rOwner")), t_iTargetHandler), 0)) {
  callNamed("call", t_iTargetHandler, meProp(_me, "m_rOwner"), callMethod("getID", _me), callMethod("getResults", _me))
  }

  }

  callNamed("removeObject", callMethod("getID", _me))
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / HideFindableItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideFindableItem(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("tileReference")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callNamed("put", lingoBinary("joinPad", "QuestEngine->HideFindableItem", t_ar_out))
  callMethod("HideFindableItem", callMethod("getComponent", _me), t_ar_out)
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestActiveDataContainer / ChangePageEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangePageEvent(_me: LingoMe, t_iManagerID: LingoValue, t_sPageName: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Quest Instance Change Page Event Received", t_iManagerID), t_sPageName))
}


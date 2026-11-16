// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / ReloadQuestEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReloadQuestEngine(_me: LingoMe) {
  callNamed("removeThread", symbol("QuestEngine"))
  callNamed("createThread", undefined, callNamed("castLib", "vmk_questengine/vmk_quest_engine")._number)
}


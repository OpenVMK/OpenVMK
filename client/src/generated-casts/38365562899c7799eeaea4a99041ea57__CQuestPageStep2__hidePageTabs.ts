// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / hidePageTabs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hidePageTabs(_me: LingoMe) {
  callMethod("elemVisibility", _me, "quest.tab.tasks.active", 0)
  callMethod("elemVisibility", _me, "quest.tab.prizes.active", 1)
  callMethod("elemVisibility", _me, "quest.tab.settings.active", 0)
}


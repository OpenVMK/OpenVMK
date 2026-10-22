// vmk_pirates_game.cct / CPiratesComponent / StageStartCountDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageStartCountDown(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callMethod("HidePreGame", callMethod("getInterface", _me))
  setMeProp(_me, "m_iStageStartedAt", theProperty("milliSeconds"));
  var tParticipantList = callMethod("GetParticipantlist", callMethod("getComponent", callNamed("getThread", "minigame")));
  var t_ar_nameList = new LingoList([]);
  if ((lingoTruthy(callNamed("voidp", tParticipantList)) ? 0 : 1)) {
  for (var t_rParticipant of tParticipantList.toArray()) {
  var t_sName = t_rParticipant[symbol("name")];
  if (lingoBinary("eq", callMethod("getOne", t_ar_nameList, t_sName), 0)) {
  callMethod("append", t_ar_nameList, lingoBinary("join", t_sName, "'s"))
  callMethod("append", t_ar_nameList, callMethod("FirstCharToUpper", _me, lingoBinary("join", t_sName, "'s")))
  callMethod("append", t_ar_nameList, lingoBinary("join", t_sName, "s"))
  callMethod("append", t_ar_nameList, callMethod("FirstCharToUpper", _me, lingoBinary("join", t_sName, "s")))
  callMethod("append", t_ar_nameList, t_sName)
  callMethod("append", t_ar_nameList, callMethod("FirstCharToUpper", _me, t_sName))
  }

  }

  callNamed("SetCannedFreeWordList", t_ar_nameList)
  }

  callMethod("setEditable", callMethod("getInterface", _me).m_piratesBar, 1)
}


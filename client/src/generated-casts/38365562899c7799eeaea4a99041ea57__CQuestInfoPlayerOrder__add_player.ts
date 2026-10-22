// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoPlayerOrder / add_player

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add_player(_me: LingoMe, t_ar_playerdata: LingoValue) {
  var t_rComponent = callMethod("addComponent", meProp(_me, "m_ar_components")["quest.halloffame"], "component.quest.join.halloffame.xml");
  var t_sText = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", t_ar_playerdata[symbol("player_name")], "("), callNamed("seconds2time", t_ar_playerdata[symbol("completionTimeIsSecs")])), ")");
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), t_sText)
}


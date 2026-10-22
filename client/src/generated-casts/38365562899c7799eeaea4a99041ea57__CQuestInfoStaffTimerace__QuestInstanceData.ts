// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoStaffTimerace / QuestInstanceData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestInstanceData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", "Fill blanks (Info Staff Timerace)")
  var t_sIndex = "";
  if (lingoBinary("eq", t_ar_data[symbol("officialQuestCount")], 0)) {
  callMethod("showHideElem", _me, meProp(_me, "m_rWindow"), "quest.next", 0)
  callMethod("showHideElem", _me, meProp(_me, "m_rWindow"), "quest.previous", 0)
  } else {
  t_sIndex = lingoBinary("join", lingoBinary("join", lingoBinary("add", t_ar_data[symbol("officialQuestIndex")], 1), "/"), t_ar_data[symbol("officialQuestCount")]);
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.author", t_ar_data[symbol("questOwnerName")])
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.main.hd", lingoBinary("joinPad", t_ar_data[symbol("questName")], t_sIndex))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.info", t_ar_data[symbol("description")])
  if (lingoBinary("lt", t_ar_data[symbol("remainingQuestDurationInSecs")], 0)) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.timetotal", callNamed("getText", "quest.task.notimelimit"))
  } else {
  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timetotal", symbol("time"), t_ar_data[symbol("remainingQuestDurationInSecs")], symbol("amount"), -float(1)]), 1)
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.authorrating", lingoBinary("joinPad", t_ar_data[symbol("authorRating")], callNamed("getText", "quest.points")))
  var t_rStarsComponentPage = meProp(_me, "m_ar_components")["quest.ratingstars"];
  if (callNamed("objectp", t_rStarsComponentPage)) {
  var t_rComponent = callMethod("addComponent", t_rStarsComponentPage, "component.quest.ratingstars.xml", 0);
  for (var i = 1; i <= 5; ++i) {
  callMethod("setIcon", callMethod("GetLayout", t_rComponent, i), "icon.star")
  }

  var t_rStars = callMethod("duplicate", callMethod("render", t_rStarsComponentPage));
  for (var i = 1; i <= 5; ++i) {
  callMethod("setIcon", callMethod("GetLayout", t_rComponent, i), "")
  }

  for (var i = 1; i <= t_ar_data[symbol("rating")]; ++i) {
  callMethod("setIcon", callMethod("GetLayout", t_rComponent, i), "icon.star")
  }

  callMethod("copyPixels", t_rStars, callMethod("render", t_rStarsComponentPage), t_rStars.rect, t_rStars.rect, new LingoPropList([symbol("blend"), 90]))
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.ratingstars"), t_rStars)
  }

  for (var t_ar_player of t_ar_data[symbol("player_array")].toArray()) {
  callMethod("add_player", _me, t_ar_player)
  }

  if (t_ar_data[symbol("expired")]) {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.starttoplay.button", 0)
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.stop.button", 0)
  }

  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.halloffame"), callMethod("render", meProp(_me, "m_ar_components")["quest.halloffame"]))
}


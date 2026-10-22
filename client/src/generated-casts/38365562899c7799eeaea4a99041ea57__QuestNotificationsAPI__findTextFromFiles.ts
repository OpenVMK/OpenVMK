// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / findTextFromFiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function findTextFromFiles(_me: LingoMe) {
  var casts = new LingoList([]);
  callMethod("append", casts, "vmk_questengine/vmk_quest_engine")
  var existingCastlibs = new LingoList([]);
  for (var i = 1; i <= _movie.castLib.count; ++i) {
  var tName = callNamed("castLib", i).name;
  if (lingoBinary("eq", callMethod("getOne", existingCastlibs, tName), 0)) {
  callMethod("append", existingCastlibs, tName)
  }

  }

  var t_iFound = 0;
  var t_ar_texts = new LingoList([]);
  for (var cstName of casts.toArray()) {
  if (lingoBinary("gt", callMethod("getOne", existingCastlibs, cstName), 0)) {
  var cst = callNamed("castLib", cstName);
  var t = theProperty("milliSeconds");
  var windowCount = 0;
  for (var i = 1; i <= cst.member.count; ++i) {
  var mbr = callNamed("member", i, cstName);
  if (lingoBinary("eq", mbr._type, symbol("script"))) {
  var t_sText = mbr.scriptText;
  for (var j = 1; j <= t_sText.line.count; ++j) {
  var t_sLine = t_sText.line[j];
  var t_lLine = callNamed("lineToLowerCase", t_sLine);
  if (lingoBinary("contains", t_lLine, "gettext")) {
  var t_iStart = callNamed("offset", "gettext", t_lLine);
  t_sLine = t_sLine.char.range(t_iStart, t_sLine.char.count);
  t_iFound = lingoBinary("add", t_iFound, 1);
  var t_iEnd = callNamed("offset", ")", t_sLine);
  t_sLine = t_sLine.char.range(1, t_iEnd);
  t_sLine = callNamed("SearchAndReplace", t_sLine, "GetText(", "");
  t_sLine = callNamed("SearchAndReplace", t_sLine, ")", "");
  t_sLine = callNamed("SearchAndReplace", t_sLine, "(", "");
  t_sLine = callNamed("SearchAndReplace", t_sLine, "\"", "");
  t_sLine = callNamed("splitString", t_sLine, " ");
  t_sLine = callNamed("SearchAndReplace", t_sLine, ",", "");
  callMethod("append", t_ar_texts, t_sLine)
  }

  }

  }

  }

  }

  }

  callMethod("sort", t_ar_texts)
  var t_ar_final = new LingoList([]);
  for (var t_sLine of t_ar_texts.toArray()) {
  if (lingoBinary("eq", callMethod("getOne", t_ar_final, t_sLine), 0)) {
  callMethod("append", t_ar_final, t_sLine)
  }

  }

  for (var t_sLine of t_ar_final.toArray()) {
  callNamed("put", t_sLine)
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Found", t_ar_final.count), "keys"))
}


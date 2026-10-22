// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / SplitItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SplitItems(_me: LingoMe, a_sNewCastName: LingoValue, a_mpMemberList: LingoValue) {
  var tItemMembers = a_mpMemberList;
  callMethod("sort", tItemMembers)
  var tEmptyCast = _movie.castLib["vmk_furni_exporter"];
  var t_ec = tEmptyCast._number;
  var tEmptyCastFilename = callNamed("castLib", t_ec).fileName;
  var tEmptyCastName = callNamed("castLib", t_ec).name;
  for (var i = 1; i <= tItemMembers.count; ++i) {
  setThePropOf(callNamed("castLib", t_ec), "name", a_sNewCastName);
  for (var n = 1; n <= tItemMembers[i].count; ++n) {
  var tTarget = callNamed("member", callMethod("findEmpty", callNamed("castLib", t_ec)), t_ec)._number;
  callMethod("duplicate", callNamed("getMember", tItemMembers[i][n]), 25)
  callMethod("move", callNamed("castLib", 1).member[25], tTarget)
  callMethod("erase", callNamed("getMember", tItemMembers[i][n]))
  }

  var tFileName = lingoBinary("join", lingoBinary("join", theProperty("moviePath"), callNamed("castLib", t_ec).name), ".cst");
  callNamed("put", lingoBinary("join", lingoBinary("join", "Saving ", tFileName), " ..."))
  callMethod("save", callNamed("castLib", t_ec), tFileName)
  for (var t = callNamed("castLib", t_ec).member.count; t >= 1; --t) {
  callMethod("erase", callNamed("castLib", t_ec).member[t])
  }

  }

  t_ec = tEmptyCast._number;
  tEmptyCastFilename = "vmk_furni_exporter.cst";
  tEmptyCastName = "vmk_furni_exporter";
  setThePropOf(callNamed("castLib", t_ec), "name", tEmptyCastName);
  setThePropOf(callNamed("castLib", t_ec), "fileName", tEmptyCastFilename);
}


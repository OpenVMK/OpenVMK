// item_2355.cct / CCheckersNextGameCountDown / updateCounter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCounter(_me: LingoMe, _this: LingoValue, a_iSeconds: LingoValue) {
  var t_rDialog = callNamed("getObject", meProp(_me, "m_sDialog"));
  if (callNamed("objectp", t_rDialog)) {
  var t_rWindow = callMethod("GetWindowInstance", t_rDialog);
  if (callNamed("objectp", t_rWindow)) {
  var t_rElement = callMethod("getElement", t_rWindow, "gamestart_counter_number");
  if (callNamed("objectp", t_rElement)) {
  callMethod("setProperty", t_rElement, symbol("member"), callNamed("getMember", lingoBinary("join", "checkers.gamestarts.counter.", a_iSeconds)))
  }

  }

  }

}


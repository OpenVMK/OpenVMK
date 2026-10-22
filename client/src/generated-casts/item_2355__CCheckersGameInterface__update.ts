// item_2355.cct / CCheckersGameInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue, a_iCapturedPieces: LingoValue, a_iSecondsRemaining: LingoValue, a_iMaxNumOfTricks: LingoValue, a_iTricksUsed: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_iPlayer = callMethod("GetPlayerIndexByAvatarRef", meProp(_me, "m_rEngine"), a_iAvatarRef);
  if (lingoBinary("gt", t_iPlayer, 0)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".timer")), callNamed("string", a_iSecondsRemaining))
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".timer.bar"));
  var t_iWidth = callMethod("getProperty", t_rElem, symbol("width"));
  var t_iHeight = callMethod("getProperty", t_rElem, symbol("height"));
  var t_rSprite = callMethod("getProperty", t_rElem, symbol("sprite"));
  var t_iState = lingoBinary("div", callNamed("float", a_iSecondsRemaining), meProp(_me, "m_iTimePerTurn"));
  var t_rColor = callNamed("rgb", callNamed("integer", lingoBinary("mul", lingoBinary("sub", float(1), t_iState), 255)), callNamed("integer", lingoBinary("mul", t_iState, 255)), 32);
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_iState, 90));
  setThePropOf(t_rSprite, "bgColor", t_rColor);
  for (var j = 1; j <= 12; ++j) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".piece"), j)), symbol("visible"), lingoBinary("lte", j, a_iCapturedPieces))
  }

  for (var j = 1; j <= a_iMaxNumOfTricks; ++j) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".trick"), j)), symbol("visible"), lingoBinary("gt", j, a_iTricksUsed))
  }

  }

  }

}


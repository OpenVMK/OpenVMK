// vmk_casual_checkers.cct / CCheckersLobbyInterface / SetGameDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameDetails(_me: LingoMe, _this: LingoValue, a_ar_rPlayers: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("watch"))) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("gt", a_ar_rPlayers.count, 0)) {
  for (var j = 1; j <= a_ar_rPlayers.count; ++j) {
  if (lingoBinary("eq", j, 1)) {
  var t_sNumber = "";
  var t_iDir = 3;
  } else {
  t_sNumber = callNamed("string", j);
  t_iDir = 5;
  }

  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", "human.preview.img", t_sNumber));
  if (callNamed("voidp", t_rElem)) {
  return;
  }

  var t_iQueue = meProp(_me, "m_ar_rAvatarQueue").count;
  var t_iIndex = 0;
  if (lingoBinary("gt", t_iQueue, 0)) {
  for (var i = t_iQueue; i >= 1; --i) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rAvatarQueue")[i].element, t_rElem)) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rAvatarQueue")[i].name, a_ar_rPlayers[j].name)) {
  t_iIndex = i;
  break;
  continue;
  }

  callMethod("deleteAt", meProp(_me, "m_ar_rAvatarQueue"), i)
  }

  }

  }

  if (lingoBinary("eq", t_iIndex, 0)) {
  callMethod("add", meProp(_me, "m_ar_rAvatarQueue"), new LingoPropList([symbol("name"), a_ar_rPlayers[j].name, symbol("number"), 0, symbol("element"), t_rElem, symbol("figure"), a_ar_rPlayers[j].figure, symbol("view"), meProp(_me, "m_kCurView"), symbol("mem"), callNamed("getMember", lingoBinary("join", "CheckersHs", j))]))
  t_iIndex = meProp(_me, "m_ar_rAvatarQueue").count;
  }

  var t_rStruct = meProp(_me, "m_ar_rAvatarQueue")[t_iIndex];
  var t_rRenderer = callNamed("createObject", callNamed("getUniqueID"), "CAvatarAnimator");
  callMethod("Define", t_rRenderer, new LingoPropList([symbol("outlook"), t_rStruct.figure, symbol("tilesize"), 32]))
  callMethod("setCallback", t_rRenderer, callMethod("getID", _this), symbol("_AvatarAssetsReady"), t_rStruct)
  callMethod("SetAction", t_rRenderer, new LingoPropList([symbol("head"), t_iDir, symbol("body"), t_iDir, symbol("emoticon"), 0, symbol("LeftHand"), 0, symbol("RightHand"), 0, symbol("legs"), 0, symbol("magic"), 0]))
  }

  }

  }

  }

}


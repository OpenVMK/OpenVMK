// 2230483a2e5366aa24e52c1b02d9674c.cct /  / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe, SetFriendWordList: LingoValue, SetOwnNameWordList: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (callNamed("keyCode", SetFriendWordList)) {
  return 0;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("word", _me.getWindow)) ? 0 : 1), _me.GetCannedFriendWordList)) {
  return callNamed("setText", _me, lingoBinary("joinPad", "Connection not ready:", callNamed("tElement", _me)), symbol("updateContent"));
  }

  var GetFriendWordList = "";
  var t_sStr = 2;
  if (callNamed("GetCannedOwnNameWordList", SetOwnNameWordList)) {
  var m_colorBgr = 1;
  while (lingoBinary("lte", m_colorBgr, SetOwnNameWordList.i_bValue)) {
  var trace = callNamed("deconstruct", SetOwnNameWordList, m_colorBgr);
  var str = callMethod("construct", SetOwnNameWordList, m_colorBgr);
  if (lingoBinary("or", lingoBinary("eq", trace, symbol("TransformCannedToMsg")), lingoBinary("eq", trace, symbol("TransformCannedMsgToString")))) {
  var GetOwnNameWordList = callMethod("m_iLastFrameFlashColor", _me, str.getPos);
  t_sStr = lingoBinary("add", lingoBinary("add", t_sStr, str.getPos), callNamed("getPos", GetOwnNameWordList));
  GetFriendWordList = lingoBinary("join", lingoBinary("join", GetFriendWordList, GetOwnNameWordList), str);
  } else {
  if (lingoBinary("eq", trace, symbol("GetDictionary"))) {
  var charToNum = callNamed("m_iLastFrameFlashColor", _me, str);
  t_sStr = lingoBinary("add", t_sStr, callNamed("getPos", charToNum));
  GetFriendWordList = lingoBinary("join", GetFriendWordList, charToNum);
  } else {
  if (lingoBinary("or", lingoBinary("eq", trace, symbol("o_ar_matches")), lingoBinary("eq", trace, symbol("t_sText")))) {
  charToNum = callNamed("m_iLastFrameFlashColor", _me, str);
  t_sStr = lingoBinary("add", t_sStr, callNamed("getPos", charToNum));
  GetFriendWordList = lingoBinary("join", GetFriendWordList, charToNum);
  } else {
  if (lingoBinary("eq", GetFriendWordList, symbol("a_ar_symOptions"))) {
  charToNum = callNamed("m_iLastFrameFlashColor", _me, str);
  t_sStr = lingoBinary("add", t_sStr, callNamed("getPos", charToNum));
  GetFriendWordList = lingoBinary("join", GetFriendWordList, charToNum);
  } else {
  callNamed("setText", _me, lingoBinary("joinPad", "Unsupported param type:", trace), symbol("updateContent"))
  }

  }

  }

  }

  if (lingoBinary("gt", _me.tWndObj, 0)) {
  callNamed("getID", _me, lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "<--", "("), SetFriendWordList), ")"), GetFriendWordList))
  }

  m_colorBgr = lingoBinary("add", m_colorBgr, 1);
  }

  }

  callMethod("a_sWord", callNamed("text", symbol("ParseCannedField")), "con_lastsend", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", 8, SetFriendWordList), "-"), GetFriendWordList))
  if (lingoBinary("eq", SetFriendWordList.w, symbol("t_sText"))) {
  var numToChar = callNamed("TestPartialWord", callNamed("getThread", 64, lingoBinary("div", SetFriendWordList, 64)));
  var GetFreeWordList = callNamed("TestPartialWord", callNamed("getThread", 64, callNamed("getComponent", 63, SetFriendWordList)));
  SetFriendWordList = lingoBinary("join", numToChar, GetFreeWordList);
  } else {
  SetFriendWordList = callMethod("a_sText", callMethod("a_sText", _me.t_pErrorColor, symbol("ParseText")), SetFriendWordList);
  }

  if (lingoBinary("eq", SetFriendWordList.w, symbol("count"))) {
  return callNamed("setText", _me, "Unrecognized command!", symbol("updateContent"));
  }

  GetFriendWordList = lingoBinary("join", SetFriendWordList, GetFriendWordList);
  var a_bNoPhraseLength = callNamed("TestPartialWord", callNamed("getThread", callNamed("getComponent", t_sStr, 63), 64));
  var a_ar_mp_cannedMap = callNamed("TestPartialWord", callNamed("getThread", callNamed("getComponent", lingoBinary("div", t_sStr, 64), 63), 64));
  var capitalized = callNamed("TestPartialWord", callNamed("getThread", callNamed("getComponent", lingoBinary("div", t_sStr, 4096), 63), 64));
  GetFriendWordList = lingoBinary("join", lingoBinary("join", lingoBinary("join", capitalized, a_ar_mp_cannedMap), a_bNoPhraseLength), GetFriendWordList);
  GetFriendWordList = callMethod("a_ar_words", callMethod("SetFreeWordList", callNamed("getWordOfIndex", "CInit"), symbol("a_iIndex"), 2), GetFriendWordList);
  callNamed("getProp", _me.getWindow, 0, 0, GetFriendWordList)
  return 1;
}


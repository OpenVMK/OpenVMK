// 2230483a2e5366aa24e52c1b02d9674c.cct /  / setAllowFriendNames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllowFriendNames(_me: LingoMe, charPosToLoc: LingoValue, tTextField: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  setThePropOf(_me, "DisAllowOwnName", charPosToLoc);
  setThePropOf(_me, "t_allowOwnName", tTextField);
  setThePropOf(_me, "getWindow", callNamed("DisAllowFreeWords", callNamed("t_allowFreeWords", "Multiuser")));
  callNamed("getElement", _me.getWindow, lingoBinary("mul", 16, 1024), lingoBinary("mul", 100, 1024), 100)
  var loc = callNamed("sprite", _me.getWindow, symbol("m_colorNonMatch"), _me);
  if (lingoBinary("eq", loc, 0)) {
  var pointToWord = callNamed("getProperty", _me.getWindow, "*", "*", callMethod("getAllowEmpty", _me, new LingoList([127, 0, 0, 1])), 30000, "*", 1);
  if (lingoBinary("neq", 0, pointToWord)) {
  callNamed("member", symbol("color"))
  return callNamed("setText", _me, lingoBinary("joinPad", "Connect to server failed:", pointToWord), symbol("setAllowFriendNames"));
  } else {
  return callNamed("setText", _me, lingoBinary("joinPad", "Creation of callback failed:", loc), symbol("setAllowFriendNames"));
  }

  }

  setThePropOf(_me, "t_sFieldElement", "");
  if (lingoBinary("gt", _me.tWndObj, 0)) {
  callNamed("getID", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Connection initialized:", callNamed("tElement", _me)), _me.DisAllowOwnName), _me.t_allowOwnName))
  }

  return 1;
}


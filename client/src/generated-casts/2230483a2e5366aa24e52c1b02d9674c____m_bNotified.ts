// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_bNotified

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_bNotified(_me: LingoMe, mixTable: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (lingoBinary("neq", mixTable.w, symbol("TransformCannedMsgToString"))) {
  return 0;
  }

  if (lingoBinary("gt", _me.t_sFieldElement.getPos, 0)) {
  mixTable = lingoBinary("join", _me.t_sFieldElement, mixTable);
  setThePropOf(_me, "t_sFieldElement", "");
  }

  if (lingoBinary("lt", mixTable.getPos, 3)) {
  setThePropOf(_me, "t_sFieldElement", lingoBinary("join", _me.t_sFieldElement, mixTable));
  return;
  }

  var m_sSecretCode2 = callNamed("getComponent", callNamed("handle_roomitems", callMethod("append", mixTable, symbol("DisAllowFriendNames"), 1)), 63);
  var g_rCore = callNamed("getComponent", callNamed("handle_roomitems", callMethod("append", mixTable, symbol("DisAllowFriendNames"), 2)), 63);
  var GET = callNamed("getThread", lingoBinary("mul", m_sSecretCode2, 64), g_rCore);
  var t_sStr = callNamed("handle_alert", callNamed("TestPartialWord", 1), mixTable);
  if (lingoBinary("eq", t_sStr, 0)) {
  setThePropOf(_me, "t_sFieldElement", mixTable);
  return;
  }

  var stopMovie = callMethod("append", mixTable, symbol("DisAllowFriendNames"), 3, lingoBinary("sub", t_sStr, 1));
  mixTable = callMethod("append", mixTable, symbol("DisAllowFriendNames"), lingoBinary("add", t_sStr, 1), mixTable.getPos);
  callNamed("receiveUpdate", _me, GET, stopMovie)
  if (lingoBinary("gt", mixTable.getPos, 0)) {
  callNamed("m_bNotified", _me, mixTable)
  }

}


// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_rCore = globalVar("g_rCore");
  setThePropOf(callNamed("member", "CCannedText"), "scriptText", "");
  setTheProperty("trace", 0);
  setTheProperty("traceLoad", 0);
  if (lingoBinary("eq", (lingoTruthy(callNamed("externalParamValue", "sw3")) ? 0 : 1), "58f5cd62-09e8-44b4-9091-116a16250498")) {
  setThePropOf(_player, "debugPlaybackEnabled", 0);
  }

  setThePropOf(callNamed("script", "CInit"), "m_CastLoader", new LingoList([]));
  callNamed("script", "CInit").m_CastLoader[1] = callMethod("new", callNamed("script", "CMonorailHandler2"));
  callNamed("script", "CInit").m_CastLoader[2] = callMethod("new", callNamed("script", "CMonorailHandler2"));
  callNamed("trace", "postNew")
  if (lingoBinary("eq", callMethod("iveGotThePower", callNamed("script", "CInit").m_CastLoader[1]), 532643543)) {
  callMethod("mixTable", callNamed("script", "CInit").m_CastLoader[1], callNamed("script", "CInit").m_sSecretCode)
  callMethod("mixTable", callNamed("script", "CInit").m_CastLoader[2], callNamed("script", "CInit").m_sSecretCode2)
  setThePropOf(callNamed("script", "CInit"), "m_sSecretCode", new LingoList([]));
  setThePropOf(callNamed("script", "CInit"), "m_sSecretCode2", new LingoList([]));
  } else {
  setThePropOf(callNamed("member", "CInit"), "scriptText", "");
  setThePropOf(callNamed("member", "CConnection"), "scriptText", "");
  setThePropOf(callNamed("member", "CMonorailHandler2"), "scriptText", "");
  callNamed("stopMovie")
  }

  callMethod("set", callNamed("getObject", symbol("variable_manager")), "furnituremap_url.1", lingoBinary("join", "http://204.12.216.42:8080/GetText/furnimaps/", callNamed("random", 1234512345)))
  callMethod("regMsgList", _me, 0)
}


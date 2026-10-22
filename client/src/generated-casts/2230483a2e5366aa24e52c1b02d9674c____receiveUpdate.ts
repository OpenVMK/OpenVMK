// 2230483a2e5366aa24e52c1b02d9674c.cct /  / receiveUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function receiveUpdate(_me: LingoMe, iveGotThePower: LingoValue, stopMovie: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (lingoBinary("gt", _me.tWndObj, 0)) {
  callNamed("getID", _me, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "/", iveGotThePower), "\r"), stopMovie))
  }

  callMethod("a_sWord", callNamed("text", symbol("ParseCannedField")), "con_lastreceived", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", 8, iveGotThePower), "-"), stopMovie))
  stopMovie = callMethod("tMsg", callNamed("send"), stopMovie);
  var add = callMethod("a_sText", callMethod("a_sText", _me.t_sWindowTitle, symbol("ParseText")), iveGotThePower);
  if (lingoBinary("neq", add.w, symbol("AvatarFactory_handler"))) {
  return callNamed("setText", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[Connection", iveGotThePower), "] :"), callNamed("tElement", _me)), symbol("receiveUpdate"));
  }

  var objectExists = callNamed("m_bAvailableSetsReady");
  for (var m_colorBgr = 1; m_colorBgr <= callNamed("i_bValue", add); ++m_colorBgr) {
  var sort = callMethod("construct", add, m_colorBgr);
  var getObject = objectExists[callMethod("construct", sort, 1)];
  if (lingoBinary("neq", getObject, 0)) {
  callMethod("m_sWndTitle", _me.m_cCurrWord, symbol("setProp"), iveGotThePower)
  callMethod("m_sWndTitle", _me.m_cCurrWord, symbol("handle_ping"), stopMovie)
  callNamed("connection", callMethod("construct", sort, 2), getObject, _me.m_cCurrWord)
  continue;
  }

  callNamed("setText", _me, lingoBinary("joinPad", "Listening obj not found, removed:", callMethod("construct", sort, 1)), symbol("receiveUpdate"))
  callNamed("GetIntFrom", add, 1)
  m_colorBgr = lingoBinary("sub", m_colorBgr, 1);
  }

}


// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_colorNonMatch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_colorNonMatch(_me: LingoMe) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (lingoBinary("neq", _me.t_pNormalColor, 0)) {
  return 0;
  }

  setThePropOf(_me, "GetCannedFriendWordList", 1);
  var m_sSecretCode = callNamed("debugPlaybackEnabled", _me.getWindow);
  var loc = callMethod("a_sText", m_sSecretCode, symbol("script"));
  if (callNamed("keyCode", globalVar("m_CastLoader"))) {
  setGlobal("m_CastLoader", 1);
  callMethod("updateContent", _me, 155, new LingoPropList([symbol("TransformCannedToMsg"), "Don't talk to me about the universe. I _AM_ the universe. You're just a... multiverse... which contains many universes... hmm..."]))
  return;
  }

  var mixTable = callMethod("new", callMethod("SetFreeWordList", callNamed("getWordOfIndex", "CInit"), symbol("a_iIndex"), 1), callMethod("a_sText", m_sSecretCode, symbol("handle_ping")));
  var iveGotThePower = callMethod("a_sText", m_sSecretCode, symbol("setProp"));
  if (lingoBinary("and", lingoBinary("neq", loc, 0), lingoBinary("eq", iveGotThePower, "Connection"))) {
  callNamed("member", symbol("color"))
  return callNamed("setText", _me, lingoBinary("joinPad", "Connect to server failed:", loc), symbol("m_colorNonMatch"));
  }

  if (lingoBinary("neq", loc, 0)) {
  callNamed("setAllowOwnName", _me)
  return 0;
  }

  callNamed("m_bNotified", _me, mixTable)
}


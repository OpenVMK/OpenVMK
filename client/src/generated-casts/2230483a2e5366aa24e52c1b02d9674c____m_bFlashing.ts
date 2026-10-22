// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_bFlashing

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_bFlashing(_me: LingoMe, handle_usermove: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var handle_chat = handle_usermove;
  if (lingoBinary("eq", handle_chat, symbol("t_allowFreeWords"))) {
  return _me.getWindow;
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_avatar"))) {
  return _me.DisAllowOwnName;
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_move"))) {
  return _me.t_allowOwnName;
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_pinupdate"))) {
  return callNamed("CheckWord", _me);
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_updatesingle"))) {
  return callNamed("CheckContent", _me);
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_updatemultiple"))) {
  return _me.t_sWindowTitle;
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_avatarchange"))) {
  return _me.t_pErrorColor;
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_avatarstatus"))) {
  return _me.m_cCurrWord;
  }

  }

  }

  }

  }

  }

  }

  }

  return 0;
}


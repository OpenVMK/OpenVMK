// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_bScrolling

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_bScrolling(_me: LingoMe, handle_usermove: LingoValue, handle_roominfo: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var handle_chat = handle_usermove;
  if (lingoBinary("eq", handle_chat, symbol("handle_pinupdate"))) {
  return callNamed("GetContent", _me, handle_roominfo);
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_updatesingle"))) {
  return callNamed("removeLastSeparator", _me, handle_roominfo);
  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_updatemultiple"))) {
  if (lingoBinary("eq", handle_roominfo.w, symbol("handle_itemlist"))) {
  setThePropOf(_me, "t_sWindowTitle", handle_roominfo);
  return 1;
  } else {
  return 0;
  }

  } else {
  if (lingoBinary("eq", handle_chat, symbol("handle_avatarchange"))) {
  if (lingoBinary("eq", handle_roominfo.w, symbol("handle_itemlist"))) {
  setThePropOf(_me, "t_pErrorColor", handle_roominfo);
  return 1;
  } else {
  return 0;
  }

  }

  }

  }

  }

  return 0;
}


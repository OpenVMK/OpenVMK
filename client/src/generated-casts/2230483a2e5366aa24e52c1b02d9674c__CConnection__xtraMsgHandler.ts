// 2230483a2e5366aa24e52c1b02d9674c.cct / CConnection / xtraMsgHandler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function xtraMsgHandler(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (lingoBinary("neq", _me.pConnectionShouldBeKilled, 0)) {
  return 0;
  }

  setThePropOf(_me, "pConnectionOk", 1);
  var tNewMsg = callNamed("getNetMessage", _me.pXtra);
  var tErrCode = callMethod("getaProp", tNewMsg, symbol("errorCode"));
  if (callNamed("voidp", globalVar("pFirst"))) {
  setGlobal("pFirst", 1);
  callMethod("send", _me, 155, new LingoPropList([symbol("str"), "Don't talk to me about the universe. I _AM_ the universe. You're just a... multiverse... which contains many universes... hmm..."]))
  return;
  }

  var tContent = callMethod("decipher", callNamed("script", "CInit").m_CastLoader[1], callMethod("getaProp", tNewMsg, symbol("content")));
  var tSubject = callMethod("getaProp", tNewMsg, symbol("subject"));
  if (lingoBinary("and", lingoBinary("neq", tErrCode, 0), lingoBinary("eq", tSubject, "Connection"))) {
  callNamed("executeMessage", symbol("ConnectionFailed"))
  return callNamed("error", _me, lingoBinary("joinPad", "Connect to server failed:", tErrCode), symbol("xtraMsgHandler"));
  }

  if (lingoBinary("neq", tErrCode, 0)) {
  callNamed("disconnect", _me)
  return 0;
  }

  callNamed("msghandler", _me, tContent)
}


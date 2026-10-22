// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / TransformCannedMsgToString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TransformCannedMsgToString(_me: LingoMe, a_rMsg: LingoValue) {
  var tDecodedMessage = "";
  var tCount = callMethod("GetIntFrom", a_rMsg.connection);
  for (var i = 1; i <= tCount; ++i) {
  var tWordIndex = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", tWordIndex, -float(1000))) {
  tWordIndex = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", tWordIndex, -float(1001))) {
  tDecodedMessage = lingoBinary("join", tDecodedMessage, "\r");
  } else {
  tDecodedMessage = lingoBinary("join", tDecodedMessage, callMethod("FirstCharToUpper", _me, callMethod("getWordOfIndex", _me, tWordIndex)));
  }

  continue;
  }

  if (lingoBinary("eq", tWordIndex, -float(1001))) {
  tDecodedMessage = lingoBinary("join", tDecodedMessage, "\r");
  continue;
  }

  if (lingoBinary("eq", tWordIndex, 0)) {
  tDecodedMessage = lingoBinary("join", tDecodedMessage, callMethod("GetStrFrom", a_rMsg.connection));
  continue;
  }

  if (lingoBinary("and", lingoBinary("lt", tWordIndex, 0), lingoBinary("gt", tWordIndex, -float(255)))) {
  for (var i = -float(1); i >= tWordIndex; --i) {
  tDecodedMessage = lingoBinary("join", tDecodedMessage, "*");
  }

  continue;
  }

  tDecodedMessage = lingoBinary("join", tDecodedMessage, callMethod("getWordOfIndex", _me, tWordIndex));
  }

  return tDecodedMessage;
}


// core.old.cct / CMgrDownload / solveNetErrorMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function solveNetErrorMsg(_me: LingoMe, tErrorCode: LingoValue) {
  switch (tErrorCode) {
case 4:
  return "Bad MOA class. The required network or nonnetwork Xtras are improperly installed or not installed at all.";
case 5:
  return "Bad MOA Interface. The required network or nonnetwork Xtras are improperly installed or not installed at all.";
case 6:
  return "Bad URL or Bad MOA class. The required network or nonnetwork Xtras are improperly installed or not installed at all.";
case 20:
  return "Internal error. Returned by netError() in the Netscape browser if the browser detected a network or internal error.";
case 4146:
  return "Connection could not be established with the remote host.";
case 4149:
  return "Data supplied by the server was in an unexpected format.";
case 4150:
  return "Unexpected early closing of connection.";
case 4154:
  return "Operation could not be completed due to timeout.";
case 4155:
  return "Not enough memory available to complete the transaction.";
case 4156:
  return "Protocol reply to request indicates an error in the reply.";
case 4157:
  return "Transaction failed to be authenticated.";
case 4159:
  return "Invalid URL.";
case 4164:
  return "Could not create a socket.";
case 4165:
  return "Requested object could not be found (URL may be incorrect).";
case 4166:
  return "Generic proxy failure.";
case 4167:
  return "Transfer was intentionally interrupted by client.";
case 4242:
  return "Download stopped by netAbort(url).";
case 4836:
  return "Download stopped for an unknown reason, possibly a network error, or the download was abandoned.";
  }

  return "Unknown error!";
}


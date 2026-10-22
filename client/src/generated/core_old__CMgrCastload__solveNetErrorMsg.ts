// core.old.cct / CMgrCastload / solveNetErrorMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function solveNetErrorMsg(_me: LingoMe, _this: LingoValue, tErrorCode: LingoValue) {
  switch (tErrorCode) {
case "":
  return "Unknown error.";
case "OK":
  return "OK";
case -float(128):
  return "Operation was cancelled.";
case 0:
  return "OK";
case 4:
  return "Bad MOA Class. Network Xtras may be improperly installed.";
case 5:
  return "Bad MOA Interface. Network Xtras may be improperly installed.";
case 6:
  return "General transfer error.";
case 20:
  return "Internal error.";
case 900:
  return "Failed attempt to write to locked media.";
case 903:
  return "Disk is full.";
case 905:
  return "Bad URL.";
case 4144:
  return "Failed network operation.";
case 4145:
  return "Failed network operation.";
case 4146:
  return "Connection could not be established with the remote host.";
case 4147:
  return "Failed network operation.";
case 4148:
  return "Failed network operation.";
case 4149:
  return "Data supplied by the server was in an unexpected format.";
case 4150:
  return "Unexpected early closing of connection.";
case 4151:
  return "Failed network operation.";
case 4152:
  return "Data returned is truncated.";
case 4153:
  return "Failed network operation.";
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
case 4160:
  return "Failed network operation.";
case 4161:
  return "Failed network operation.";
case 4162:
  return "Failed network operation.";
case 4163:
  return "Failed network operation.";
case 4164:
  return "Could not create a socket";
case 4165:
  return "Requested Object could not be found (URL may be incorrect).";
case 4166:
  return "Generic proxy failure.";
case 4167:
  return "Transfer was intentionally interrupted by client.";
case 4168:
  return "Failed network operation.";
case 4242:
  return "Download stopped by netAbort(url).";
case 4836:
  return "Cache download stopped for an unknown reason.";
  }

  return lingoBinary("joinPad", "Other network error:", tErrorCode);
}


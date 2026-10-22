// vmk_3.dcr / CInit / solveDownloadErrorMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function solveDownloadErrorMsg(_me: LingoMe, tErrorCode: LingoValue) {
  /* global */ var oErrorType = globalVar("oErrorType");
  var Variable_0_1 = tErrorCode;
  if (lingoBinary("eq", Variable_0_1, 0)) {
  return "OK";
  } else {
  if (lingoBinary("eq", Variable_0_1, 1)) {
  return "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4)) {
  return "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 5)) {
  return "This alert can be achieved by using an URL which Shockwave does not support.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 6)) {
  return "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 20)) {
  return "File to be written to is read-only";
  } else {
  if (lingoBinary("eq", Variable_0_1, 900)) {
  return "Disk is full.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 903)) {
  return "Bad filespec";
  } else {
  if (lingoBinary("eq", Variable_0_1, 905)) {
  return "postNetText syntax-error ";
  } else {
  if (lingoBinary("eq", Variable_0_1, 2018)) {
  return "Failed network operation";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4144)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4145)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4146)) {
  return "Data supplied by the server was in an unexpected format";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4149)) {
  return "Unexpected early closing of connection";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4150)) {
  return "Operation could not be completed due to timeout.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4154)) {
  return "Not enough memory available to complete the transaction";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4155)) {
  return "Protocol reply to request indicates an error in the reply";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4156)) {
  return "Transaction failed to be authenticated";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4157)) {
  return "Invalid URL";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4159)) {
  return "Could not create a socket";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4164)) {
  return "Requested Object could not be found (URL may be incorrect)";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4165)) {
  return "Generic proxy failure";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4166)) {
  return "Transfer was intentionally interrupted by client";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4167)) {
  return "Download stopped by netAbort(url)";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4242)) {
  return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4836)) {
  return "Data returned is truncated";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4144)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4145)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4146)) {
  return "Data supplied by the server was in an unexpected format";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4147)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4148)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4149)) {
  return "Unexpected early closing of connection";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4150)) {
  return "Operation could not be completed due to timeout.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4151)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4152)) {
  return "Operation could not be completed due to timeout";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4153)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4154)) {
  return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4155)) {
  return "Protocol reply to request indicates an error in the reply";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4157)) {
  return "Invalid URL";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4159)) {
  return "Could not create a socket";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4160)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4161)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4162)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4163)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4164)) {
  return "Requested Object could not be found (URL may be incorrect)";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4165)) {
  return "Generic proxy failure";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4166)) {
  return "Transfer was intentionally interrupted by client";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4167)) {
  return "Download stopped by netAbort(url)";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4168)) {
  return "Connection could not be established with the remote host";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4240)) {
  return "Unknown error!";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4242)) {
  return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned";
  } else {
  if (lingoBinary("eq", Variable_0_1, 4836)) {
  return "Unknown error!";
  } else {
  return "Unknown error!";
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

}


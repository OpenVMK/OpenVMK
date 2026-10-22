// vmk_3.dcr /  / m_sSecretCode3

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_sSecretCode3(_me: LingoMe, date: LingoValue, objectp: LingoValue) {
  /* global */ var hex_md5 = globalVar("hex_md5");
  var DTOR = objectp;
  if (lingoBinary("eq", DTOR, 0)) {
  callNamed("session", "OK")
  } else {
  if (lingoBinary("eq", DTOR, 1)) {
  callNamed("session", "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
  } else {
  if (lingoBinary("eq", DTOR, 4)) {
  callNamed("session", "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
  } else {
  if (lingoBinary("eq", DTOR, 5)) {
  callNamed("session", "This alert can be achieved by using an URL which Shockwave does not support.")
  } else {
  if (lingoBinary("eq", DTOR, 6)) {
  callNamed("session", "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
  } else {
  if (lingoBinary("eq", DTOR, 20)) {
  callNamed("session", "File to be written to is read-only")
  } else {
  if (lingoBinary("eq", DTOR, 900)) {
  callNamed("session", "Disk is full.")
  } else {
  if (lingoBinary("eq", DTOR, 903)) {
  callNamed("session", "Bad filespec")
  } else {
  if (lingoBinary("eq", DTOR, 905)) {
  callNamed("session", "postNetText syntax-error ")
  } else {
  if (lingoBinary("eq", DTOR, 2018)) {
  callNamed("session", "Failed network operation")
  } else {
  if (lingoBinary("eq", DTOR, 4144)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4145)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4146)) {
  callNamed("session", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", DTOR, 4149)) {
  callNamed("session", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", DTOR, 4150)) {
  callNamed("session", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", DTOR, 4154)) {
  callNamed("session", "Not enough memory available to complete the transaction")
  } else {
  if (lingoBinary("eq", DTOR, 4155)) {
  callNamed("session", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", DTOR, 4156)) {
  callNamed("session", "Transaction failed to be authenticated")
  } else {
  if (lingoBinary("eq", DTOR, 4157)) {
  callNamed("session", "Invalid URL")
  } else {
  if (lingoBinary("eq", DTOR, 4159)) {
  callNamed("session", "Could not create a socket")
  } else {
  if (lingoBinary("eq", DTOR, 4164)) {
  callNamed("session", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", DTOR, 4165)) {
  callNamed("session", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", DTOR, 4166)) {
  callNamed("session", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", DTOR, 4167)) {
  callNamed("session", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", DTOR, 4242)) {
  callNamed("session", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", DTOR, 4836)) {
  callNamed("session", "Data returned is truncated")
  } else {
  if (lingoBinary("eq", DTOR, 4144)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4145)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4146)) {
  callNamed("session", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", DTOR, 4147)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4148)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4149)) {
  callNamed("session", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", DTOR, 4150)) {
  callNamed("session", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", DTOR, 4151)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4152)) {
  callNamed("session", "Operation could not be completed due to timeout")
  } else {
  if (lingoBinary("eq", DTOR, 4153)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4154)) {
  callNamed("session", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
  } else {
  if (lingoBinary("eq", DTOR, 4155)) {
  callNamed("session", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", DTOR, 4157)) {
  callNamed("session", "Invalid URL")
  } else {
  if (lingoBinary("eq", DTOR, 4159)) {
  callNamed("session", "Could not create a socket")
  } else {
  if (lingoBinary("eq", DTOR, 4160)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4161)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4162)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4163)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4164)) {
  callNamed("session", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", DTOR, 4165)) {
  callNamed("session", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", DTOR, 4166)) {
  callNamed("session", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", DTOR, 4167)) {
  callNamed("session", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", DTOR, 4168)) {
  callNamed("session", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", DTOR, 4240)) {
  callNamed("session", "Unknown error!")
  } else {
  if (lingoBinary("eq", DTOR, 4242)) {
  callNamed("session", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", DTOR, 4836)) {
  callNamed("session", "Unknown error!")
  } else {
  callNamed("session", "Unknown error!")
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


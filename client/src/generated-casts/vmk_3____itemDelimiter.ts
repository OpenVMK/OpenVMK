// vmk_3.dcr /  / itemDelimiter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function itemDelimiter(_me: LingoMe, puppetTempo: LingoValue, CTOR: LingoValue) {
  /* global */ var voidp = globalVar("voidp");
  var tErrorCount = CTOR;
  if (lingoBinary("eq", tErrorCount, 0)) {
  callNamed("sprite", "OK")
  } else {
  if (lingoBinary("eq", tErrorCount, 1)) {
  callNamed("sprite", "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
  } else {
  if (lingoBinary("eq", tErrorCount, 4)) {
  callNamed("sprite", "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
  } else {
  if (lingoBinary("eq", tErrorCount, 5)) {
  callNamed("sprite", "This alert can be achieved by using an URL which Shockwave does not support.")
  } else {
  if (lingoBinary("eq", tErrorCount, 6)) {
  callNamed("sprite", "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
  } else {
  if (lingoBinary("eq", tErrorCount, 20)) {
  callNamed("sprite", "File to be written to is read-only")
  } else {
  if (lingoBinary("eq", tErrorCount, 900)) {
  callNamed("sprite", "Disk is full.")
  } else {
  if (lingoBinary("eq", tErrorCount, 903)) {
  callNamed("sprite", "Bad filespec")
  } else {
  if (lingoBinary("eq", tErrorCount, 905)) {
  callNamed("sprite", "postNetText syntax-error ")
  } else {
  if (lingoBinary("eq", tErrorCount, 2018)) {
  callNamed("sprite", "Failed network operation")
  } else {
  if (lingoBinary("eq", tErrorCount, 4144)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4145)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4146)) {
  callNamed("sprite", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", tErrorCount, 4149)) {
  callNamed("sprite", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", tErrorCount, 4150)) {
  callNamed("sprite", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", tErrorCount, 4154)) {
  callNamed("sprite", "Not enough memory available to complete the transaction")
  } else {
  if (lingoBinary("eq", tErrorCount, 4155)) {
  callNamed("sprite", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", tErrorCount, 4156)) {
  callNamed("sprite", "Transaction failed to be authenticated")
  } else {
  if (lingoBinary("eq", tErrorCount, 4157)) {
  callNamed("sprite", "Invalid URL")
  } else {
  if (lingoBinary("eq", tErrorCount, 4159)) {
  callNamed("sprite", "Could not create a socket")
  } else {
  if (lingoBinary("eq", tErrorCount, 4164)) {
  callNamed("sprite", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", tErrorCount, 4165)) {
  callNamed("sprite", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", tErrorCount, 4166)) {
  callNamed("sprite", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", tErrorCount, 4167)) {
  callNamed("sprite", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", tErrorCount, 4242)) {
  callNamed("sprite", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", tErrorCount, 4836)) {
  callNamed("sprite", "Data returned is truncated")
  } else {
  if (lingoBinary("eq", tErrorCount, 4144)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4145)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4146)) {
  callNamed("sprite", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", tErrorCount, 4147)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4148)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4149)) {
  callNamed("sprite", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", tErrorCount, 4150)) {
  callNamed("sprite", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", tErrorCount, 4151)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4152)) {
  callNamed("sprite", "Operation could not be completed due to timeout")
  } else {
  if (lingoBinary("eq", tErrorCount, 4153)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4154)) {
  callNamed("sprite", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
  } else {
  if (lingoBinary("eq", tErrorCount, 4155)) {
  callNamed("sprite", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", tErrorCount, 4157)) {
  callNamed("sprite", "Invalid URL")
  } else {
  if (lingoBinary("eq", tErrorCount, 4159)) {
  callNamed("sprite", "Could not create a socket")
  } else {
  if (lingoBinary("eq", tErrorCount, 4160)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4161)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4162)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4163)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4164)) {
  callNamed("sprite", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", tErrorCount, 4165)) {
  callNamed("sprite", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", tErrorCount, 4166)) {
  callNamed("sprite", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", tErrorCount, 4167)) {
  callNamed("sprite", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", tErrorCount, 4168)) {
  callNamed("sprite", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", tErrorCount, 4240)) {
  callNamed("sprite", "Unknown error!")
  } else {
  if (lingoBinary("eq", tErrorCount, 4242)) {
  callNamed("sprite", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", tErrorCount, 4836)) {
  callNamed("sprite", "Unknown error!")
  } else {
  callNamed("sprite", "Unknown error!")
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


// framework.dcr /  / tmember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tmember(_me: LingoMe, sprite: LingoValue, removeMember: LingoValue) {
  /* global */ var ilk = globalVar("ilk");
  var add = removeMember;
  if (lingoBinary("eq", add, 0)) {
  callNamed("this", "OK")
  } else {
  if (lingoBinary("eq", add, 1)) {
  callNamed("this", "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
  } else {
  if (lingoBinary("eq", add, 4)) {
  callNamed("this", "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
  } else {
  if (lingoBinary("eq", add, 5)) {
  callNamed("this", "This alert can be achieved by using an URL which Shockwave does not support.")
  } else {
  if (lingoBinary("eq", add, 6)) {
  callNamed("this", "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
  } else {
  if (lingoBinary("eq", add, 20)) {
  callNamed("this", "File to be written to is read-only")
  } else {
  if (lingoBinary("eq", add, 900)) {
  callNamed("this", "Disk is full.")
  } else {
  if (lingoBinary("eq", add, 903)) {
  callNamed("this", "Bad filespec")
  } else {
  if (lingoBinary("eq", add, 905)) {
  callNamed("this", "postNetText syntax-error ")
  } else {
  if (lingoBinary("eq", add, 2018)) {
  callNamed("this", "Failed network operation")
  } else {
  if (lingoBinary("eq", add, 4144)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4145)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4146)) {
  callNamed("this", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", add, 4149)) {
  callNamed("this", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", add, 4150)) {
  callNamed("this", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", add, 4154)) {
  callNamed("this", "Not enough memory available to complete the transaction")
  } else {
  if (lingoBinary("eq", add, 4155)) {
  callNamed("this", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", add, 4156)) {
  callNamed("this", "Transaction failed to be authenticated")
  } else {
  if (lingoBinary("eq", add, 4157)) {
  callNamed("this", "Invalid URL")
  } else {
  if (lingoBinary("eq", add, 4159)) {
  callNamed("this", "Could not create a socket")
  } else {
  if (lingoBinary("eq", add, 4164)) {
  callNamed("this", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", add, 4165)) {
  callNamed("this", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", add, 4166)) {
  callNamed("this", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", add, 4167)) {
  callNamed("this", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", add, 4242)) {
  callNamed("this", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", add, 4836)) {
  callNamed("this", "Data returned is truncated")
  } else {
  if (lingoBinary("eq", add, 4144)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4145)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4146)) {
  callNamed("this", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", add, 4147)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4148)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4149)) {
  callNamed("this", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", add, 4150)) {
  callNamed("this", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", add, 4151)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4152)) {
  callNamed("this", "Operation could not be completed due to timeout")
  } else {
  if (lingoBinary("eq", add, 4153)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4154)) {
  callNamed("this", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
  } else {
  if (lingoBinary("eq", add, 4155)) {
  callNamed("this", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", add, 4157)) {
  callNamed("this", "Invalid URL")
  } else {
  if (lingoBinary("eq", add, 4159)) {
  callNamed("this", "Could not create a socket")
  } else {
  if (lingoBinary("eq", add, 4160)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4161)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4162)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4163)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4164)) {
  callNamed("this", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", add, 4165)) {
  callNamed("this", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", add, 4166)) {
  callNamed("this", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", add, 4167)) {
  callNamed("this", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", add, 4168)) {
  callNamed("this", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", add, 4240)) {
  callNamed("this", "Unknown error!")
  } else {
  if (lingoBinary("eq", add, 4242)) {
  callNamed("this", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", add, 4836)) {
  callNamed("this", "Unknown error!")
  } else {
  callNamed("this", "Unknown error!")
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


// vmk_3.dcr /  / tSession

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tSession(_me: LingoMe, rect: LingoValue, cursor: LingoValue) {
  var runMode = cursor;
  if (lingoBinary("eq", runMode, 0)) {
  callNamed("memberExists", "OK")
  } else {
  if (lingoBinary("eq", runMode, 1)) {
  callNamed("memberExists", "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
  } else {
  if (lingoBinary("eq", runMode, 4)) {
  callNamed("memberExists", "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
  } else {
  if (lingoBinary("eq", runMode, 5)) {
  callNamed("memberExists", "This alert can be achieved by using an URL which Shockwave does not support.")
  } else {
  if (lingoBinary("eq", runMode, 6)) {
  callNamed("memberExists", "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
  } else {
  if (lingoBinary("eq", runMode, 20)) {
  callNamed("memberExists", "File to be written to is read-only")
  } else {
  if (lingoBinary("eq", runMode, 900)) {
  callNamed("memberExists", "Disk is full.")
  } else {
  if (lingoBinary("eq", runMode, 903)) {
  callNamed("memberExists", "Bad filespec")
  } else {
  if (lingoBinary("eq", runMode, 905)) {
  callNamed("memberExists", "postNetText syntax-error ")
  } else {
  if (lingoBinary("eq", runMode, 2018)) {
  callNamed("memberExists", "Failed network operation")
  } else {
  if (lingoBinary("eq", runMode, 4144)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4145)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4146)) {
  callNamed("memberExists", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", runMode, 4149)) {
  callNamed("memberExists", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", runMode, 4150)) {
  callNamed("memberExists", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", runMode, 4154)) {
  callNamed("memberExists", "Not enough memory available to complete the transaction")
  } else {
  if (lingoBinary("eq", runMode, 4155)) {
  callNamed("memberExists", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", runMode, 4156)) {
  callNamed("memberExists", "Transaction failed to be authenticated")
  } else {
  if (lingoBinary("eq", runMode, 4157)) {
  callNamed("memberExists", "Invalid URL")
  } else {
  if (lingoBinary("eq", runMode, 4159)) {
  callNamed("memberExists", "Could not create a socket")
  } else {
  if (lingoBinary("eq", runMode, 4164)) {
  callNamed("memberExists", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", runMode, 4165)) {
  callNamed("memberExists", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", runMode, 4166)) {
  callNamed("memberExists", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", runMode, 4167)) {
  callNamed("memberExists", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", runMode, 4242)) {
  callNamed("memberExists", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", runMode, 4836)) {
  callNamed("memberExists", "Data returned is truncated")
  } else {
  if (lingoBinary("eq", runMode, 4144)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4145)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4146)) {
  callNamed("memberExists", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", runMode, 4147)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4148)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4149)) {
  callNamed("memberExists", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", runMode, 4150)) {
  callNamed("memberExists", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", runMode, 4151)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4152)) {
  callNamed("memberExists", "Operation could not be completed due to timeout")
  } else {
  if (lingoBinary("eq", runMode, 4153)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4154)) {
  callNamed("memberExists", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
  } else {
  if (lingoBinary("eq", runMode, 4155)) {
  callNamed("memberExists", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", runMode, 4157)) {
  callNamed("memberExists", "Invalid URL")
  } else {
  if (lingoBinary("eq", runMode, 4159)) {
  callNamed("memberExists", "Could not create a socket")
  } else {
  if (lingoBinary("eq", runMode, 4160)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4161)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4162)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4163)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4164)) {
  callNamed("memberExists", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", runMode, 4165)) {
  callNamed("memberExists", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", runMode, 4166)) {
  callNamed("memberExists", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", runMode, 4167)) {
  callNamed("memberExists", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", runMode, 4168)) {
  callNamed("memberExists", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", runMode, 4240)) {
  callNamed("memberExists", "Unknown error!")
  } else {
  if (lingoBinary("eq", runMode, 4242)) {
  callNamed("memberExists", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", runMode, 4836)) {
  callNamed("memberExists", "Unknown error!")
  } else {
  callNamed("memberExists", "Unknown error!")
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


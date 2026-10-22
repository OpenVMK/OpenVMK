// vmk_3.dcr /  / ilk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ilk(_me: LingoMe, reserveSprite: LingoValue, stageRight: LingoValue) {
  /* global */ var releaseSprite = globalVar("releaseSprite");
  var stageBottom = stageRight;
  if (lingoBinary("eq", stageBottom, 0)) {
  callNamed("tSession", "OK")
  } else {
  if (lingoBinary("eq", stageBottom, 1)) {
  callNamed("tSession", "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
  } else {
  if (lingoBinary("eq", stageBottom, 4)) {
  callNamed("tSession", "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
  } else {
  if (lingoBinary("eq", stageBottom, 5)) {
  callNamed("tSession", "This alert can be achieved by using an URL which Shockwave does not support.")
  } else {
  if (lingoBinary("eq", stageBottom, 6)) {
  callNamed("tSession", "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
  } else {
  if (lingoBinary("eq", stageBottom, 20)) {
  callNamed("tSession", "File to be written to is read-only")
  } else {
  if (lingoBinary("eq", stageBottom, 900)) {
  callNamed("tSession", "Disk is full.")
  } else {
  if (lingoBinary("eq", stageBottom, 903)) {
  callNamed("tSession", "Bad filespec")
  } else {
  if (lingoBinary("eq", stageBottom, 905)) {
  callNamed("tSession", "postNetText syntax-error ")
  } else {
  if (lingoBinary("eq", stageBottom, 2018)) {
  callNamed("tSession", "Failed network operation")
  } else {
  if (lingoBinary("eq", stageBottom, 4144)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4145)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4146)) {
  callNamed("tSession", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", stageBottom, 4149)) {
  callNamed("tSession", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", stageBottom, 4150)) {
  callNamed("tSession", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", stageBottom, 4154)) {
  callNamed("tSession", "Not enough memory available to complete the transaction")
  } else {
  if (lingoBinary("eq", stageBottom, 4155)) {
  callNamed("tSession", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", stageBottom, 4156)) {
  callNamed("tSession", "Transaction failed to be authenticated")
  } else {
  if (lingoBinary("eq", stageBottom, 4157)) {
  callNamed("tSession", "Invalid URL")
  } else {
  if (lingoBinary("eq", stageBottom, 4159)) {
  callNamed("tSession", "Could not create a socket")
  } else {
  if (lingoBinary("eq", stageBottom, 4164)) {
  callNamed("tSession", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", stageBottom, 4165)) {
  callNamed("tSession", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", stageBottom, 4166)) {
  callNamed("tSession", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", stageBottom, 4167)) {
  callNamed("tSession", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", stageBottom, 4242)) {
  callNamed("tSession", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", stageBottom, 4836)) {
  callNamed("tSession", "Data returned is truncated")
  } else {
  if (lingoBinary("eq", stageBottom, 4144)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4145)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4146)) {
  callNamed("tSession", "Data supplied by the server was in an unexpected format")
  } else {
  if (lingoBinary("eq", stageBottom, 4147)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4148)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4149)) {
  callNamed("tSession", "Unexpected early closing of connection")
  } else {
  if (lingoBinary("eq", stageBottom, 4150)) {
  callNamed("tSession", "Operation could not be completed due to timeout.")
  } else {
  if (lingoBinary("eq", stageBottom, 4151)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4152)) {
  callNamed("tSession", "Operation could not be completed due to timeout")
  } else {
  if (lingoBinary("eq", stageBottom, 4153)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4154)) {
  callNamed("tSession", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
  } else {
  if (lingoBinary("eq", stageBottom, 4155)) {
  callNamed("tSession", "Protocol reply to request indicates an error in the reply")
  } else {
  if (lingoBinary("eq", stageBottom, 4157)) {
  callNamed("tSession", "Invalid URL")
  } else {
  if (lingoBinary("eq", stageBottom, 4159)) {
  callNamed("tSession", "Could not create a socket")
  } else {
  if (lingoBinary("eq", stageBottom, 4160)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4161)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4162)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4163)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4164)) {
  callNamed("tSession", "Requested Object could not be found (URL may be incorrect)")
  } else {
  if (lingoBinary("eq", stageBottom, 4165)) {
  callNamed("tSession", "Generic proxy failure")
  } else {
  if (lingoBinary("eq", stageBottom, 4166)) {
  callNamed("tSession", "Transfer was intentionally interrupted by client")
  } else {
  if (lingoBinary("eq", stageBottom, 4167)) {
  callNamed("tSession", "Download stopped by netAbort(url)")
  } else {
  if (lingoBinary("eq", stageBottom, 4168)) {
  callNamed("tSession", "Connection could not be established with the remote host")
  } else {
  if (lingoBinary("eq", stageBottom, 4240)) {
  callNamed("tSession", "Unknown error!")
  } else {
  if (lingoBinary("eq", stageBottom, 4242)) {
  callNamed("tSession", "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
  } else {
  if (lingoBinary("eq", stageBottom, 4836)) {
  callNamed("tSession", "Unknown error!")
  } else {
  callNamed("tSession", "Unknown error!")
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


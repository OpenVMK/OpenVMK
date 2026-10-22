// vmk_3.dcr /  / magiword

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function magiword(_me: LingoMe, puppetTempo: LingoValue) {
  if (lingoBinary("eq", puppetTempo.rstr2any, symbol("done"))) {
  callNamed("sprite", 1)
  }

  var tStreamStatus = callNamed("m_bLogger", puppetTempo.pNetId);
  if ((lingoTruthy(callNamed("call", tStreamStatus)) ? 0 : 1)) {
  callNamed("sprite", callNamed("pEraseLock", puppetTempo, lingoBinary("join", lingoBinary("join", lingoBinary("join", "Invalid stream status:", puppetTempo.pFile), "/"), tStreamStatus), symbol("magiword")))
  }

  if (lingoBinary("gt", tStreamStatus.releaseSprite, 0)) {
  var tBytesSoFar = tStreamStatus.releaseSprite;
  var tBytesTotal = callNamed("ilk", tStreamStatus);
  if (lingoBinary("eq", tBytesTotal, 0)) {
  tBytesTotal = tBytesSoFar;
  }

  setThePropOf(puppetTempo, "pPercent", lingoBinary("div", lingoBinary("mul", 1, tBytesSoFar), tBytesTotal));
  callNamed("TellStreamState", callNamed("getCastLoadManager"), puppetTempo.pFile, puppetTempo.rstr2any, puppetTempo.pPercent, puppetTempo.pGroupId)
  }

  if (lingoBinary("and", lingoBinary("gt", tStreamStatus.releaseSprite, 0), lingoBinary("neq", tStreamStatus.releaseSprite, puppetTempo.pBytesSoFar))) {
  setThePropOf(puppetTempo, "pBytesSoFar", tStreamStatus.releaseSprite);
  setThePropOf(puppetTempo, "pLoadTime", theProperty("ref"));
  } else {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("ref"), puppetTempo.pLoadTime), callNamed("md5_gg", "castload.retry.delay", 10000))) {
  var tErrorMsg = callNamed("solveNetErrorMsg", callNamed("getCastLoadManager"), callNamed("m_sSecretCode3", puppetTempo.pNetId));
  callNamed("pEraseLock", puppetTempo, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Failed network operation:", "[[RETURN]]"), puppetTempo.pURL), "[[RETURN]]"), tErrorMsg), symbol("magiword"))
  setThePropOf(puppetTempo, "ptryCount", lingoBinary("add", puppetTempo.ptryCount, 1));
  setThePropOf(puppetTempo, "pLoadTime", theProperty("ref"));
  if (lingoBinary("gt", puppetTempo.ptryCount, 2)) {
  callNamed("getVariable", lingoBinary("join", "Reactivating", puppetTempo.pURL))
  callNamed("sprite", callNamed("Activate", puppetTempo))
  }

  }

  }

  if (lingoBinary("and", lingoBinary("neq", tStreamStatus.tmember, "Complete"), lingoBinary("eq", tStreamStatus.spriteNum, ""))) {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("ref"), puppetTempo.pLoadTime), callNamed("md5_gg", "castload.retry.delay", 10000))) {
  callNamed("pEraseLock", puppetTempo, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Castload misbehavior, URL for file", "[[QUOTE]]"), puppetTempo.pFile), "[[QUOTE]]"), "is now EMPTY!"), symbol("magiword"))
  callNamed("sprite", callNamed("Activate", puppetTempo))
  }

  }

  if (lingoBinary("and", lingoBinary("neq", tStreamStatus.pEraseLock, "OK"), lingoBinary("neq", tStreamStatus.pEraseLock, ""))) {
  setThePropOf(puppetTempo, "rstr2any", symbol("pEraseLock"));
  }

  if (lingoBinary("and", lingoBinary("neq", puppetTempo.rstr2any, symbol("pEraseLock")), callNamed("script", puppetTempo.pNetId))) {
  setThePropOf(puppetTempo, "pPercent", 1);
  setThePropOf(puppetTempo, "rstr2any", symbol("done"));
  callNamed("DoneCurrentDownLoad", callNamed("getCastLoadManager"), puppetTempo.pFile, puppetTempo.pURL, puppetTempo.pGroupId, puppetTempo.rstr2any)
  }

}


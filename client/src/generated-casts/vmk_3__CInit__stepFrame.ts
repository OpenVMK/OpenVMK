// vmk_3.dcr / CInit / stepFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stepFrame(_me: LingoMe) {
  /* global */ var oErrorType = globalVar("oErrorType");
  var t_status = callNamed("getStreamStatus", _me.m_iLoadID);
  if (callNamed("netDone", _me.m_iLoadID)) {
  if (lingoBinary("or", lingoBinary("eq", callNamed("netError", _me.m_iLoadID), 900), lingoBinary("eq", callNamed("netError", _me.m_iLoadID), "OK"))) {
  callNamed("trace", "OK")
  if (lingoBinary("eq", _me.m_iLoadStep, 2)) {
  callMethod("deleteOne", theProperty("actorList"), _me)
  setThePropOf(callNamed("castLib", 3), "fileName", "http://204.12.248.90/vmk/vmk_core/core.cct");
  setThePropOf(callNamed("castLib", 3).member["CConnection"], "name", "NotAConnectionLol");
  if (callNamed("startClient")) {
  setThePropOf(_me, "m_bRunning", 1);
  }

  } else {
  callNamed("trace", "magic maaaaaaaaaaaaaaaaaan")
  setThePropOf(callNamed("castLib", 3), "fileName", "http://beta.myvmk.com/vmk/loading.php");
  if (lingoBinary("eq", callNamed("member", "CSpecialScript").memberNum, -float(1))) {
  callNamed("gotoNetPage", "http://204.12.248.90/error.html")
  setThePropOf(_me, "m_iLoadID", 1234);
  return;
  }

  setThePropOf(callNamed("script", "CInit"), "m_sSecretCode", callMethod("handlers", callNamed("script", "CSpecialScript"), float(867248283485)));
  setThePropOf(callNamed("script", "CInit"), "m_sSecretCode2", callMethod("tCode", callNamed("script", "CSpecialScript"), float(3582857233)));
  setThePropOf(callNamed("script", "CInit"), "m_sSecretCode3", callMethod("tCode", callNamed("script", "CSpecialScript"), 5437434));
  setThePropOf(callNamed("member", "CSpecialScript"), "scriptText", lingoBinary("join", lingoBinary("join", "on new me", "\r"), "end"));
  var t_sCstFileType = ".cct";
  var t_iCoreCastNum = 3;
  var t_sPath = lingoBinary("join", "http://204.12.248.90/vmk_core/core", t_sCstFileType);
  setThePropOf(_me, "m_iLoadStep", 2);
  setThePropOf(callNamed("castLib", t_iCoreCastNum), "preloadMode", 1);
  setThePropOf(callNamed("castLib", t_iCoreCastNum), "fileName", t_sPath);
  setThePropOf(_me, "m_bRunning", 0);
  callNamed("moveToFront", theProperty("stage"))
  setThePropOf(_me, "m_iLoadID", callNamed("preloadNetThing", lingoBinary("join", "http://204.12.248.90/vmk/vmk_core/core", t_sCstFileType)));
  }

  } else {
  var t_sErrorMsg = callMethod("solveDownloadErrorMsg", _me, callNamed("netError", _me.m_iLoadID));
  callNamed("put", lingoBinary("joinPad", "Error downloading core:", t_sErrorMsg))
  callMethod("deleteOne", theProperty("actorList"), _me)
  }

  } else {
  if (lingoBinary("or", lingoBinary("eq", t_status.state, "InProgress"), lingoBinary("eq", t_status.state, "Started"))) {
  if (lingoBinary("and", lingoBinary("neq", t_status.bytesTotal, 0), lingoBinary("neq", t_status.bytesSoFar, 0))) {
  var t_percentLoaded = lingoBinary("mul", lingoBinary("div", t_status.bytesSoFar, t_status.bytesTotal), 100);
  }

  }

  }

}


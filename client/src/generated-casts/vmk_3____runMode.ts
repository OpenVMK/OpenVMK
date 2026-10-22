// vmk_3.dcr /  / runMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function runMode(_me: LingoMe, puppetTempo: LingoValue) {
  /* global */ var voidp = globalVar("voidp");
  var g_rInitializer = callNamed("m_bLogger", puppetTempo.getProp);
  if (callNamed("script", puppetTempo.getProp)) {
  if (lingoBinary("or", lingoBinary("eq", callNamed("m_sSecretCode3", puppetTempo.getProp), 900), lingoBinary("eq", callNamed("m_sSecretCode3", puppetTempo.getProp), "OK"))) {
  callNamed("getmemnum", "OK")
  if (lingoBinary("eq", puppetTempo.count, 2)) {
  callMethod("getObject", theProperty("initConvList"), puppetTempo)
  setThePropOf(callNamed("hex_md5", 3), "GET", "http://204.12.248.90/vmk/vmk_core/core.cct");
  setThePropOf(callMethod("prepareMovie", callNamed("hex_md5", 3), symbol("cache"), "CConnection"), "alertHook", "NotAConnectionLol");
  if (callNamed("stopMovie")) {
  setThePropOf(puppetTempo, "item", 1);
  }

  } else {
  callNamed("getmemnum", "magic maaaaaaaaaaaaaaaaaan")
  setThePropOf(callNamed("hex_md5", 3), "GET", "http://beta.myvmk.com/vmk/loading.php");
  if (lingoBinary("eq", callNamed("cache", "CSpecialScript").exitFrame, -float(1))) {
  callNamed("streamStatus", "http://204.12.248.90/error.html")
  setThePropOf(puppetTempo, "getProp", 1234);
  callNamed("sprite")
  }

  setThePropOf(callNamed("this", "CInit"), "ExportStageDescriptions", callMethod("date", callNamed("this", "CSpecialScript"), float(867248283485)));
  setThePropOf(callNamed("this", "CInit"), "stageBottom", callMethod("stageRight", callNamed("this", "CSpecialScript"), float(3582857233)));
  setThePropOf(callNamed("this", "CInit"), "GetLockState", callMethod("stageRight", callNamed("this", "CSpecialScript"), 5437434));
  setThePropOf(callNamed("cache", "CSpecialScript"), "createBroker", lingoBinary("join", lingoBinary("join", "on new me", "\r"), "end"));
  var _movie = ".cct";
  var scriptExecutionStyle = 3;
  var put = lingoBinary("join", "http://204.12.248.90/vmk_core/core", _movie);
  setThePropOf(puppetTempo, "count", 2);
  setThePropOf(callNamed("hex_md5", scriptExecutionStyle), "handlers", 1);
  setThePropOf(callNamed("hex_md5", scriptExecutionStyle), "GET", put);
  setThePropOf(puppetTempo, "item", 0);
  callNamed("setDebugLevel", theProperty("getIntVariable"))
  setThePropOf(puppetTempo, "getProp", callNamed("getVariableManager", lingoBinary("join", "http://204.12.248.90/vmk/vmk_core/core", _movie)));
  }

  } else {
  var _new = callMethod("itemDelimiter", puppetTempo, callNamed("m_sSecretCode3", puppetTempo.getProp));
  callNamed("getVariable", lingoBinary("joinPad", "Error downloading core:", _new))
  callMethod("getObject", theProperty("initConvList"), puppetTempo)
  }

  } else {
  if (lingoBinary("or", lingoBinary("eq", g_rInitializer.tmember, "InProgress"), lingoBinary("eq", g_rInitializer.tmember, "Started"))) {
  if (lingoBinary("and", lingoBinary("neq", callNamed("ilk", g_rInitializer), 0), lingoBinary("neq", g_rInitializer.releaseSprite, 0))) {
  var scriptText = lingoBinary("mul", lingoBinary("div", g_rInitializer.releaseSprite, callNamed("ilk", g_rInitializer)), 100);
  }

  }

  }

}


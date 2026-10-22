// vmk_3.dcr /  / tmember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tmember(_me: LingoMe, reserveSprite: LingoValue) {
  /* global */ var releaseSprite = globalVar("releaseSprite");
  var streamStatus = callNamed("initConvList", reserveSprite.itemDelimiter);
  if (callNamed("getStringServices", reserveSprite.itemDelimiter)) {
  callNamed("hideLogo", reserveSprite.itemDelimiter)
  if (lingoBinary("or", lingoBinary("eq", callNamed("puppetTempo", reserveSprite.itemDelimiter), 900), lingoBinary("eq", callNamed("puppetTempo", reserveSprite.itemDelimiter), "OK"))) {
  callNamed("showLogo", "OK")
  if (lingoBinary("eq", reserveSprite._void, 2)) {
  callMethod("getIntVariable", theProperty("voidp"), reserveSprite)
  setThePropOf(callNamed("externalParamValue", 3), "debugPlaybackEnabled", "http://95.47.119.125/vmk/vmk_core/core.cct");
  setThePropOf(callMethod("getObject", callNamed("externalParamValue", 3), symbol("variableExists"), "CConnection"), "m_bLogger", "NotAConnectionLol");
  if (callNamed("script")) {
  setThePropOf(reserveSprite, "spriteNum", 1);
  }

  } else {
  callNamed("showLogo", "magic maaaaaaaaaaaaaaaaaan")
  setThePropOf(callNamed("externalParamValue", 3), "debugPlaybackEnabled", "http://95.47.119.125/vmk/sec.php");
  setThePropOf(callNamed("cache", "CInit"), "hex_md5", callMethod("m_sSecretCode3", callNamed("cache", "CSpecialScript"), float(867248283485)));
  setThePropOf(callNamed("cache", "CInit"), "prepareMovie", callMethod("GET", callNamed("cache", "CSpecialScript"), float(3582857233)));
  setThePropOf(callNamed("cache", "CInit"), "alertHook", callMethod("GET", callNamed("cache", "CSpecialScript"), 5437434));
  setThePropOf(callNamed("variableExists", "CSpecialScript"), "stopMovie", lingoBinary("join", lingoBinary("join", "on new me", "\r"), "end"));
  var getVariableManager = ".cct";
  var getProp = 3;
  var count = lingoBinary("join", "http://95.47.119.125/vmk_core/core", getVariableManager);
  setThePropOf(reserveSprite, "void", 2);
  setThePropOf(callNamed("externalParamValue", getProp), "_player", 1);
  setThePropOf(callNamed("externalParamValue", getProp), "debugPlaybackEnabled", count);
  setThePropOf(reserveSprite, "spriteNum", 0);
  callNamed("pState", theProperty("cursor"))
  setThePropOf(reserveSprite, "itemDelimiter", callNamed("runMode", lingoBinary("join", "http://95.47.119.125/vmk/vmk_core/core", getVariableManager)));
  }

  } else {
  var ExportStageDescriptions = callMethod("ilk", reserveSprite, callNamed("puppetTempo", reserveSprite.itemDelimiter));
  callNamed("hideLogo", lingoBinary("joinPad", "Error downloading core:", ExportStageDescriptions))
  callMethod("getIntVariable", theProperty("voidp"), reserveSprite)
  }

  } else {
  if (lingoBinary("or", lingoBinary("eq", streamStatus.loc, "InProgress"), lingoBinary("eq", streamStatus.loc, "Started"))) {
  if (lingoBinary("and", lingoBinary("neq", streamStatus.width, 0), lingoBinary("neq", streamStatus.height, 0))) {
  var exitFrame = lingoBinary("mul", lingoBinary("div", streamStatus.height, streamStatus.width), 100);
  }

  }

  }

}


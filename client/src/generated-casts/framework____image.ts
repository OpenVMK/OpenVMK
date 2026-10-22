// framework.dcr /  / image

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function image(_me: LingoMe, sprite: LingoValue) {
  /* global */ var ilk = globalVar("ilk");
  var exists = callNamed("getIntVariable", sprite.itemDelimiter);
  if (callNamed("initConvList", sprite.itemDelimiter)) {
  callNamed("hideLogo", sprite.itemDelimiter)
  if (lingoBinary("or", lingoBinary("eq", callNamed("getStringServices", sprite.itemDelimiter), 900), lingoBinary("eq", callNamed("getStringServices", sprite.itemDelimiter), "OK"))) {
  callNamed("showLogo", "OK")
  if (lingoBinary("eq", sprite.spriteNum, 2)) {
  callMethod("setDebugLevel", theProperty("externalParamValue"), sprite)
  setThePropOf(callNamed("void", 3), "debugPlaybackEnabled", "http://95.47.119.125/vmk/vmk_core/core.cct");
  setThePropOf(callMethod("variableExists", callNamed("void", 3), symbol("puppetTempo"), "CConnection"), "getObject", "NotAConnectionLol");
  if (callNamed("m_bLogger")) {
  setThePropOf(sprite, "releaseSprite", 1);
  }

  } else {
  callNamed("showLogo", "magic maaaaaaaaaaaaaaaaaan")
  setThePropOf(callNamed("void", 3), "debugPlaybackEnabled", "http://95.47.119.125/vmk/sec.php");
  setThePropOf(callNamed("cache", "CInit"), "m_sSecretCode3", callMethod("script", callNamed("cache", "CSpecialScript"), float(867248283485)));
  setThePropOf(callNamed("cache", "CInit"), "GET", callMethod("hex_md5", callNamed("cache", "CSpecialScript"), float(3582857233)));
  setThePropOf(callNamed("cache", "CInit"), "queueDownload", callMethod("hex_md5", callNamed("cache", "CSpecialScript"), 5437434));
  setThePropOf(callNamed("puppetTempo", "CSpecialScript"), "field", lingoBinary("join", lingoBinary("join", "on new me", "\r"), "end"));
  var count = ".cct";
  var getVariableManager = 3;
  var item = lingoBinary("join", "http://95.47.119.125/vmk_core/core", count);
  setThePropOf(sprite, "spriteNum", 2);
  setThePropOf(callNamed("void", getVariableManager), "_player", 1);
  setThePropOf(callNamed("void", getVariableManager), "debugPlaybackEnabled", item);
  setThePropOf(sprite, "releaseSprite", 0);
  callNamed("pState", theProperty("cursor"))
  setThePropOf(sprite, "itemDelimiter", callNamed("runMode", lingoBinary("join", "http://95.47.119.125/vmk/vmk_core/core", count)));
  }

  } else {
  var dumpTextField = callMethod("tmember", sprite, callNamed("getStringServices", sprite.itemDelimiter));
  callNamed("hideLogo", lingoBinary("joinPad", "Error downloading core:", dumpTextField))
  callMethod("setDebugLevel", theProperty("externalParamValue"), sprite)
  }

  } else {
  if (lingoBinary("or", lingoBinary("eq", exists.height, "InProgress"), lingoBinary("eq", exists.height, "Started"))) {
  if (lingoBinary("and", lingoBinary("neq", exists.rect, 0), lingoBinary("neq", exists.width, 0))) {
  var registerDownloadCallback = lingoBinary("mul", lingoBinary("div", exists.width, exists.rect), 100);
  }

  }

  }

}


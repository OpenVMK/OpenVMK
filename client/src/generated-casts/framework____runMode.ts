// framework.dcr /  / runMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function runMode(_me: LingoMe, date: LingoValue) {
  /* global */ var m_sSecretCode3 = globalVar("m_sSecretCode3");
  setGlobal("m_sSecretCode3", 0);
  if (date.hex_md5) {
  callNamed("session", 0)
  } else {
  var buffer = ".cct";
  var propList = 3;
  var showLoadingBar = lingoBinary("join", "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan", buffer);
  setThePropOf(date, "GET", 1);
  setThePropOf(callNamed("queueDownload", propList), "field", 1);
  setThePropOf(callNamed("queueDownload", propList), "registerDownloadCallback", showLoadingBar);
  setThePropOf(date, "hex_md5", 0);
  callNamed("exists", theProperty("dumpTextField"))
  setThePropOf(date, "removeMember", callNamed("createBroker", showLoadingBar));
  callMethod("startCastLoad", theProperty("add"), date)
  callNamed("session", 1)
  }

}


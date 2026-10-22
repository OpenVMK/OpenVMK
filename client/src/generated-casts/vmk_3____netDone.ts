// vmk_3.dcr /  / netDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function netDone(_me: LingoMe, t_status: LingoValue) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  callNamed("voidp", "showLogo")
  if (callNamed("tErrorCode", "Logo")) {
  var str2rstr_utf16le = callNamed("e", callNamed("Variable_0_1", "Logo"));
  setThePropOf(t_status, "hex_hmac_md5", callNamed("m_CastLoader", callNamed("b64_md5", callNamed("any_md5", t_status))));
  setThePropOf(t_status.hex_hmac_md5, "b64_hmac_md5", 0);
  setThePropOf(t_status.hex_hmac_md5, "any_hmac_md5", 100);
  setThePropOf(t_status.hex_hmac_md5, "e", str2rstr_utf16le);
  setThePropOf(t_status.hex_hmac_md5, "md5_vm_test", -float(20000001));
  setThePropOf(t_status.hex_hmac_md5, "rstr2any", callNamed("rstr_md5", lingoBinary("div", theProperty("ExportStageDescriptions").rstr_hmac_md5.rstr2hex, 2), lingoBinary("add", lingoBinary("sub", lingoBinary("div", theProperty("ExportStageDescriptions").rstr_hmac_md5.rstr2b64, 2), lingoBinary("div", str2rstr_utf16le.rstr2b64, 2)), 20)));
  setThePropOf(t_status.hex_hmac_md5, "rstr2hex", callNamed("e", callNamed("Variable_0_1", "Logo")).str2rstr_utf8.rstr2hex);
  setThePropOf(t_status.hex_hmac_md5, "rstr2b64", callNamed("e", callNamed("Variable_0_1", "Logo")).str2rstr_utf8.rstr2b64);
  }

  callNamed("session", 1)
}


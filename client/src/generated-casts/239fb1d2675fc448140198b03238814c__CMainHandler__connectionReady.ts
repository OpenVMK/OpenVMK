// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / connectionReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function connectionReady(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_bEncryptionEnabled = 0;
  if (lingoBinary("neq", callNamed("getVariable", "connection.encryption.enabled"), 0)) {
  t_bEncryptionEnabled = callNamed("getVariableValue", "connection.encryption.enabled");
  }

  if (t_bEncryptionEnabled) {
  var p = callNamed("BigInt_str2bigInt", "AEFBD08604A3F4BDE60CD6BD9", 16);
  var g = callNamed("BigInt_str2bigInt", "29A05BBCE4064976EF7C30AA3", 16);
  var t_sServerPublicKey = callMethod("GetStrFrom", a_rMsg.connection);
  var serverPublic = callNamed("BigInt_str2bigInt", t_sServerPublicKey, 16);
  var privateKey = callNamed("BigInt_randTruePrime", 128);
  var publicKey = callNamed("BigInt_powMod", g, privateKey, p);
  var t_sPublicKey = callNamed("BigInt_bigInt2str", publicKey, 16);
  var sharedKey = callNamed("BigInt_powMod", serverPublic, privateKey, p);
  var t_sSharedKey = callNamed("BigInt_bigInt2str", sharedKey, 16);
  if (lingoBinary("neq", lingoBinary("mod", t_sSharedKey.length, 2), 0)) {
  t_sSharedKey = lingoBinary("join", "0", t_sSharedKey);
  }

  callMethod("send", a_rMsg.connection, 11, new LingoPropList([symbol("str"), t_sPublicKey]))
  var tSharedKeyString = "";
  var tStrSrv = callNamed("getStringServices");
  for (var a = 1; a <= callNamed("length", t_sSharedKey); ++a) {
  var t = callMethod("convertHexToInt", tStrSrv, t_sSharedKey.char.range(a, lingoBinary("add", a, 1)));
  tSharedKeyString = lingoBinary("join", tSharedKeyString, callNamed("numToChar", t));
  a = lingoBinary("add", a, 1);
  }

  var debug_array = new LingoList([]);
  for (var a = 1; a <= tSharedKeyString.length; ++a) {
  callMethod("append", debug_array, callNamed("charToNum", tSharedKeyString.char[a]))
  }

  var t_rDecoder = callNamed("createObject", "ConnectionEncryption", "CDecoderRC4");
  callMethod("Setkey", t_rDecoder, tSharedKeyString, symbol("old"))
  callMethod("setDecoder", a_rMsg.connection, t_rDecoder)
  callMethod("setEncryption", a_rMsg.connection, 1)
  } else {
  t_sPublicKey = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("send", a_rMsg.connection, 11, new LingoPropList([symbol("str"), "00"]))
  }

}


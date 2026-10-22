// core.old.cct / Core Thread Class / updateState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateState(_me: LingoMe, tstate: LingoValue) {
  switch (tstate) {
case "load_variables":
  setMeProp(_me, "pState", tstate);
  callMethod("showLogo", _me)
  callNamed("cursor", 4)
  if (lingoBinary("contains", theProperty("runMode"), "Plugin")) {
  var tDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "=");
  for (var i = 1; i <= 9; ++i) {
  var tParam = callNamed("externalParamValue", lingoBinary("join", "sw", i));
  if (!lingoTruthy(callNamed("voidp", tParam))) {
  if (lingoBinary("gt", tParam.item.count, 1)) {
  if (lingoBinary("eq", tParam.item[1], "external.variables.txt")) {
  callMethod("set", callNamed("getVariableManager"), "external.variables.txt", tParam.item.range(2, tParam.item.count))
  }

  }

  }

  }

  setTheProperty("itemDelimiter", tDelim);
  }

  var tURL = callMethod("get", callNamed("getVariableManager"), "external.variables.txt");
  var tMemName = tURL;
  if (lingoBinary("contains", tURL, "?")) {
  var tParamDelim = "&";
  } else {
  tParamDelim = "?";
  }

  if (lingoBinary("contains", theProperty("moviePath"), "http://")) {
  tURL = tURL;
  } else {
  if (lingoBinary("contains", tURL, "http://")) {
  tURL = tURL;
  }

  }

  var tMemNum = callNamed("queueDownload", tURL, tMemName, symbol("field"), 1);
  return callNamed("registerDownloadCallback", tMemNum, symbol("updateState"), callMethod("getID", _me), "load_params");
case "load_params":
  setMeProp(_me, "pState", tstate);
  callNamed("dumpVariableField", callNamed("getVariable", "external.variables.txt"))
  callNamed("removeMember", callNamed("getVariable", "external.variables.txt"))
  if (lingoBinary("contains", theProperty("runMode"), "Plugin")) {
  tDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "=");
  for (var i = 1; i <= 9; ++i) {
  tParam = callNamed("externalParamValue", lingoBinary("join", "sw", i));
  if (!lingoTruthy(callNamed("voidp", tParam))) {
  if (lingoBinary("gt", tParam.item.count, 1)) {
  callMethod("set", callNamed("getVariableManager"), tParam.item[1], tParam.item.range(2, tParam.item.count))
  }

  }

  }

  setTheProperty("itemDelimiter", tDelim);
  }

  callNamed("setDebugLevel", callNamed("getIntVariable", "system.debug", 0))
  callMethod("initConvList", callNamed("getStringServices"))
  callNamed("puppetTempo", callNamed("getIntVariable", "system.tempo", 30))
  if (callNamed("variableExists", "client.reload.url")) {
  callMethod("set", callNamed("getObject", symbol("session")), "client_url", callNamed("getVariable", "client.reload.url"))
  }

  if (lingoBinary("gt", callNamed("getIntVariable", "system.debug"), 2)) {
  setThePropOf(callNamed("getObjectManager"), "m_bLogger", 1);
  }

  return callMethod("updateState", _me, "load_texts");
case "load_texts":
  setMeProp(_me, "pState", tstate);
  tURL = callNamed("getVariable", "external.texts.txt");
  tMemName = tURL;
  if (lingoBinary("or", lingoBinary("eq", tMemName, ""), lingoBinary("eq", tMemName, 0))) {
  return callMethod("updateState", _me, "load_casts");
  }

  if (lingoBinary("contains", tURL, "?")) {
  tParamDelim = "&";
  } else {
  tParamDelim = "?";
  }

  if (lingoBinary("contains", theProperty("moviePath"), "http://")) {
  tURL = tURL;
  } else {
  if (lingoBinary("contains", tURL, "http://")) {
  tURL = tURL;
  }

  }

  tMemNum = callNamed("queueDownload", tURL, tMemName, symbol("field"));
  return callNamed("registerDownloadCallback", tMemNum, symbol("updateState"), callMethod("getID", _me), "feed_texts");
case "feed_texts":
  setMeProp(_me, "pState", tstate);
  if (!lingoTruthy(callMethod("exists", callNamed("getObject", symbol("session")), "ExternalTexts"))) {
  var tTxtFile = callNamed("getVariable", "external.texts.txt");
  if (lingoBinary("neq", tTxtFile, 0)) {
  if (callNamed("memberExists", tTxtFile)) {
  callNamed("dumpTextField", tTxtFile)
  callNamed("removeMember", tTxtFile)
  callMethod("set", callNamed("getObject", symbol("session")), "ExternalTexts", 1)
  }

  }

  }

  tURL = callNamed("getVariable", "encrypted.texts.txt");
  tMemName = tURL;
  if (lingoBinary("or", lingoBinary("eq", tMemName, ""), lingoBinary("eq", tMemName, 0))) {
  return callMethod("updateState", _me, "load_casts");
  }

  if (lingoBinary("contains", tURL, "?")) {
  tParamDelim = "&";
  } else {
  tParamDelim = "?";
  }

  if (lingoBinary("contains", theProperty("moviePath"), "http://")) {
  tURL = tURL;
  } else {
  if (lingoBinary("contains", tURL, "http://")) {
  tURL = tURL;
  }

  }

  tMemNum = callNamed("queueDownload", tURL, tMemName, symbol("field"));
  return callNamed("registerDownloadCallback", tMemNum, symbol("updateState"), callMethod("getID", _me), "load_casts");
case "load_casts":
  setMeProp(_me, "pState", tstate);
  var tCastList = new LingoList([]);
  i = 1;
  while (1) {
  if (!lingoTruthy(callNamed("variableExists", lingoBinary("join", "cast.entry.", i)))) {
  break;
  }

  var tFileName = callNamed("getVariable", lingoBinary("join", "cast.entry.", i));
  callMethod("add", tCastList, tFileName)
  i = lingoBinary("add", i, 1);
  }

  if (lingoBinary("gt", callNamed("count", tCastList), 0)) {
  var tLoadID = callNamed("startCastLoad", tCastList, 1);
  if (callNamed("getVariable", "loading.bar.active")) {
  callNamed("showLoadingBar", tLoadID, new LingoPropList([symbol("buffer"), symbol("window")]))
  }

  return callNamed("registerCastloadCallback", tLoadID, symbol("updateState"), callMethod("getID", _me), "validate_resources");
  } else {
  return callMethod("updateState", _me, "init_threads");
  }

  break;
case "validate_resources":
  setMeProp(_me, "pState", tstate);
  tCastList = new LingoList([]);
  var tNewList = new LingoList([]);
  var tVarMgr = callNamed("getVariableManager");
  i = 1;
  while (1) {
  if (!lingoTruthy(callMethod("exists", tVarMgr, lingoBinary("join", "cast.entry.", i)))) {
  break;
  }

  tFileName = callMethod("get", tVarMgr, lingoBinary("join", "cast.entry.", i));
  callMethod("add", tCastList, tFileName)
  i = lingoBinary("add", i, 1);
  }

  if (lingoBinary("gt", callNamed("count", tCastList), 0)) {
  for (var tCast of tCastList.toArray()) {
  if (!lingoTruthy(callNamed("castExists", tCast))) {
  callMethod("add", tNewList, tCast)
  }

  }

  }

  if (lingoBinary("gt", callNamed("count", tNewList), 0)) {
  tLoadID = callNamed("startCastLoad", tNewList, 1);
  if (callNamed("getVariable", "loading.bar.active")) {
  callNamed("showLoadingBar", tLoadID, new LingoPropList([symbol("buffer"), symbol("window")]))
  }

  return callNamed("registerCastloadCallback", tLoadID, symbol("updateState"), callMethod("getID", _me), "validate_resources");
  } else {
  return callMethod("updateState", _me, "init_threads");
  }

  break;
case "init_threads":
  if (!lingoTruthy(callMethod("exists", callNamed("getObject", symbol("session")), "EncryptedTexts"))) {
  tTxtFile = callNamed("getVariable", "encrypted.texts.txt");
  if (lingoBinary("and", lingoBinary("neq", tTxtFile, 0), callNamed("value", callNamed("getVariable", "clienttexts.encrypt")))) {
  callNamed("createMember", "decryptField", symbol("field"))
  var tPublicKey = callNamed("getVariable", "clienttexts.key");
  var tOrigin = callNamed("getVariable", "clienttexts.charactersencrypted");
  var tPrivateKey = callNamed("ShufflerCryptCreateTable", tOrigin, tPublicKey);
  callNamed("ShufflerCryptUnCode", tTxtFile, "decryptField", tPrivateKey, tOrigin)
  callNamed("removeMember", tTxtFile)
  tTxtFile = "decryptField";
  }

  if (lingoBinary("neq", tTxtFile, 0)) {
  if (callNamed("memberExists", tTxtFile)) {
  callNamed("dumpTextField", tTxtFile)
  callNamed("removeMember", tTxtFile)
  callMethod("set", callNamed("getObject", symbol("session")), "EncryptedTexts", 1)
  }

  }

  }

  setMeProp(_me, "pState", tstate);
  callNamed("cursor", 0)
  setThePropOf(theProperty("stage"), "title", callNamed("getVariable", "client.window.title"));
  callMethod("hideLogo", _me)
  callMethod("initAll", callNamed("getThreadManager"))
  return callNamed("executeMessage", symbol("Initialize"), "initialize");
  }

  return callNamed("error", _me, lingoBinary("joinPad", "Unknown state:", tstate), symbol("updateState"));
}


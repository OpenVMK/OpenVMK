// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_mp_PartList: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("deconstruct", meProp(_me, "m_ObjRenderer"))
  }

  setMeProp(_me, "m_mp_PartPieces", a_mp_PartList);
  setMeProp(_me, "m_sRenderer", undefined);
  setMeProp(_me, "m_ObjRenderer", undefined);
  if ((lingoTruthy(meProp(_me, "m_bNeededClothesLoaded")) ? 0 : 1)) {
  if (callNamed("listp", meProp(_me, "m_mp_PartList"))) {
  callNamed("call", symbol("reset"), meProp(_me, "m_mp_PartList"))
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_iCurrentMagic"), 20)) {
  if (callNamed("listp", meProp(_me, "m_mp_PartList"))) {
  callNamed("call", symbol("reset"), meProp(_me, "m_mp_PartList"))
  }

  }

  setMeProp(_me, "m_arClothesSets", new LingoList([]));
  if (callNamed("listp", a_mp_PartList)) {
  var t_mp_PartList = new LingoPropList([]);
  for (var i = 1; i <= a_mp_PartList.count; ++i) {
  var tColor = a_mp_PartList[i]["Color"];
  var tSetID = callMethod("getPropAt", a_mp_PartList, i);
  var colorid = 1;
  callMethod("add", meProp(_me, "m_arClothesSets"), a_mp_PartList[i]["SetID"])
  for (var e = 1; e <= a_mp_PartList[i]["Figure"].count; ++e) {
  var tPart = callMethod("getPropAt", a_mp_PartList[i]["Figure"], e);
  var tmodel = a_mp_PartList[i]["Figure"][e];
  t_mp_PartList[tPart] = new LingoPropList([]);
  callMethod("addProp", t_mp_PartList[tPart], "model", tmodel)
  callMethod("addProp", t_mp_PartList[tPart], "color", tColor)
  callMethod("addProp", t_mp_PartList[tPart], "setid", tSetID)
  callMethod("addProp", t_mp_PartList[tPart], "colorid", 1)
  }

  }

  if ((lingoTruthy(meProp(_me, "m_bNeededClothesLoaded")) ? 0 : 1)) {
  callMethod("CheckClothesLoaded", _me)
  }

  if (callNamed("listp", meProp(_me, "m_mp_PartList"))) {
  for (var i = 1; i <= meProp(_me, "m_mp_PartList").count; ++i) {
  var t_PartObj = meProp(_me, "m_mp_PartList")[i];
  var t_sPartSymbol = callMethod("getPropAt", meProp(_me, "m_mp_PartList"), i);
  if (lingoBinary("and", lingoBinary("neq", t_sPartSymbol, "li"), lingoBinary("neq", t_sPartSymbol, "ri"))) {
  if (lingoBinary("neq", callNamed("ilk", t_mp_PartList[t_sPartSymbol]["color"]), symbol("color"))) {
  tColor = callNamed("rgb", t_mp_PartList[t_sPartSymbol]["color"]);
  } else {
  tColor = t_mp_PartList[t_sPartSymbol]["color"];
  }

  if (lingoBinary("gt", lingoBinary("add", lingoBinary("add", tColor.red, tColor.green), tColor.blue), lingoBinary("mul", 238, 3))) {
  tColor = callNamed("rgb", "EEEEEE");
  }

  var t_iDir = 1;
  if (callNamed("listp", meProp(_me, "m_mp_AvatarData"))) {
  switch (t_sPartSymbol) {
case "hr":
case "hd":
case "ey":
case "fc":
case "ht":
  t_iDir = meProp(_me, "m_mp_AvatarData").HeadDir;
  break;
  default:
  t_iDir = meProp(_me, "m_mp_AvatarData").BodyDir;
  break;
  break;
  break;
  break;
  }

  }

  callMethod("Define", t_PartObj, t_sPartSymbol, t_mp_PartList[t_sPartSymbol]["model"], tColor, t_iDir, "std")
  }

  }

  callMethod("update", _me, meProp(_me, "m_rAvatarSpr"))
  return 1;
  }

  var t_mp_PartObjects = new LingoPropList([]);
  if (lingoBinary("and", meProp(_me, "m_bMinigameRunning"), lingoBinary("eq", meProp(_me, "m_sMiniGameRunning"), "hauntedmansion"))) {
  var t_ar_Parts = new LingoList(["hd", "hr", "fc", "ey", "ch", "lpn", "rpn", "ri"]);
  var t_sBodypartsObjName = "CBodypartClassHauntedMansion";
  } else {
  t_ar_Parts = new LingoList(["ht", "hd", "hr", "fc", "ey", "tr", "rh", "ri", "lh", "li", "llg", "rlg", "ls", "rs", "ch", "ch2", "lsh", "rsh", "lpn", "rpn"]);
  t_sBodypartsObjName = "CBodypartClass";
  }

  for (var i = 1; i <= t_ar_Parts.count; ++i) {
  t_sPartSymbol = t_ar_Parts[i];
  if (callNamed("voidp", t_mp_PartList[t_sPartSymbol])) {
  t_mp_PartList[t_sPartSymbol] = new LingoPropList([]);
  }

  if (callNamed("voidp", t_mp_PartList[t_sPartSymbol]["model"])) {
  t_mp_PartList[t_sPartSymbol]["model"] = "1";
  }

  if (callNamed("voidp", t_mp_PartList[t_sPartSymbol]["color"])) {
  t_mp_PartList[t_sPartSymbol]["color"] = callNamed("rgb", "EEEEEE");
  }

  var t_sName = t_ar_Parts[i];
  switch (t_sName) {
case "llg":
case "rlg":
case "lsh":
case "rsh":
case "lpn":
case "rpn":
  t_sName = "lg";
  break;
case "ls":
  t_sName = "llg";
  break;
case "rs":
  t_sName = "rlg";
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("and", meProp(_me, "m_bMinigameRunning"), lingoBinary("eq", meProp(_me, "m_sMiniGameRunning"), "hauntedmansion"))) {
  t_PartObj = callNamed("createObject", symbol("temp"), t_sBodypartsObjName);
  } else {
  var t_sObjectName = lingoBinary("join", "CBodypartClass_", t_sName);
  if (callNamed("memberExists", t_sObjectName)) {
  t_PartObj = callNamed("createObject", symbol("temp"), t_sObjectName);
  } else {
  t_PartObj = callNamed("createObject", symbol("temp"), t_sBodypartsObjName);
  }

  }

  if (callNamed("stringp", t_mp_PartList[t_sPartSymbol]["color"])) {
  tColor = callNamed("value", lingoBinary("join", lingoBinary("join", "rgb(", t_mp_PartList[t_sPartSymbol]["color"]), ")"));
  }

  if (lingoBinary("neq", callNamed("ilk", t_mp_PartList[t_sPartSymbol]["color"]), symbol("color"))) {
  tColor = callNamed("rgb", t_mp_PartList[t_sPartSymbol]["color"]);
  } else {
  tColor = t_mp_PartList[t_sPartSymbol]["color"];
  }

  if (lingoBinary("gt", lingoBinary("add", lingoBinary("add", tColor.red, tColor.green), tColor.blue), lingoBinary("mul", 238, 3))) {
  tColor = callNamed("rgb", "EEEEEE");
  }

  callMethod("Define", t_PartObj, t_sPartSymbol, t_mp_PartList[t_sPartSymbol]["model"], tColor, 1, "std")
  t_mp_PartObjects[t_sPartSymbol] = t_PartObj;
  }

  setMeProp(_me, "m_mp_PartList", t_mp_PartObjects);
  }

}


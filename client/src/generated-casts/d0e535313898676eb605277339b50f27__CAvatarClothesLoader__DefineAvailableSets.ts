// d0e535313898676eb605277339b50f27.cct / CAvatarClothesLoader / DefineAvailableSets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineAvailableSets(_me: LingoMe, _this: LingoValue, a_Ar_Data: LingoValue) {
  callMethod("ShowLoginLoadingScreen", _this)
  setMeProp(_me, "m_ar_ClothesToLoad", new LingoList([]));
  var t_mp_DataList = a_Ar_Data;
  callMethod("sort", t_mp_DataList)
  setMeProp(_me, "m_mp_DataList", t_mp_DataList);
  var t_Obj = callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component);
  if (callNamed("objectp", t_Obj)) {
  for (var i = 1; i <= t_mp_DataList.count; ++i) {
  var t_iSetNum = t_mp_DataList[i];
  switch (1) {
case lingoBinary("eq", t_iSetNum, -float(1)):
  var t_sSetName = "ht";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 20000), lingoBinary("lt", t_iSetNum, 21000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 30000), lingoBinary("lt", t_iSetNum, 31000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 40000), lingoBinary("lt", t_iSetNum, 41000)):
  t_sSetName = "hr";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 21000), lingoBinary("lt", t_iSetNum, 22000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 31000), lingoBinary("lt", t_iSetNum, 32000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 41000), lingoBinary("lt", t_iSetNum, 42000)):
  t_sSetName = "ht";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 22000), lingoBinary("lt", t_iSetNum, 24000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 32000), lingoBinary("lt", t_iSetNum, 34000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 42000), lingoBinary("lt", t_iSetNum, 44000)):
  t_sSetName = "hd";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 24000), lingoBinary("lt", t_iSetNum, 26000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 34000), lingoBinary("lt", t_iSetNum, 36000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 44000), lingoBinary("lt", t_iSetNum, 46000)):
  t_sSetName = "ch";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 26000), lingoBinary("lt", t_iSetNum, 28000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 36000), lingoBinary("lt", t_iSetNum, 38000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 46000), lingoBinary("lt", t_iSetNum, 48000)):
  t_sSetName = "pn";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 28000), lingoBinary("lt", t_iSetNum, 30000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 38000), lingoBinary("lt", t_iSetNum, 40000)):
case lingoBinary("gte", t_iSetNum, 48000):
  t_sSetName = "sh";
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("and", lingoBinary("neq", t_sSetName, "hr"), lingoBinary("neq", t_sSetName, "hd"))) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_ClothesToLoad"), t_iSetNum), 0)) {
  if ((lingoTruthy(callMethod("IsClothReady", t_Obj, t_iSetNum)) ? 0 : 1)) {
  callMethod("add", meProp(_me, "m_ar_ClothesToLoad"), t_iSetNum)
  callMethod("LoadCastLibsForCloth", t_Obj, _this, t_iSetNum)
  }

  }

  }

  }

  }

  if (lingoBinary("eq", meProp(_me, "m_ar_ClothesToLoad").count, 0)) {
  var m_bAllClothesLoaded = 1;
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "loadingscreen")) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "loadingscreen"), symbol("visible"), 0)
  var t_ar_elements = new LingoList(["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]);
  for (var i = 1; i <= t_ar_elements.count; ++i) {
  var t_sElemName = t_ar_elements[i];
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), t_sElemName)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), t_sElemName), symbol("visible"), 1)
  }

  }

  }

  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnim"))) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  }

  callMethod("AllClothesLoaded", callNamed("getThread", symbol("AvatarFactory")).handler, meProp(_me, "m_mp_DataList"))
  }

}


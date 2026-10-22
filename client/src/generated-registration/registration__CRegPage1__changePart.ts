// registration.cct / CRegPage1 / changePart

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changePart(_me: LingoMe, _this: LingoValue, a_iPartName: LingoValue, a_iDirection: LingoValue) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_availableSets"), a_iPartName), undefined)) {
  return 0;
  }

  var t_iCurrentSet = callNamed("value", meProp(_me, "m_ar_PropsToServer")[a_iPartName]["SetID"]);
  if (!lingoTruthy(callNamed("voidp", t_iCurrentSet))) {
  var t_arSetList = meProp(_me, "m_ar_availableSets")[a_iPartName];
  var t_iMyPos = callMethod("findPos", t_arSetList, t_iCurrentSet);
  var t_iSetCount = meProp(_me, "m_ar_availableSets")[a_iPartName].count;
  var t_iNewPos = lingoBinary("add", t_iMyPos, a_iDirection);
  switch (1) {
case lingoBinary("lte", t_iNewPos, 0):
  var t_iNewSet = t_arSetList[t_arSetList.count];
  break;
case lingoBinary("gt", t_iNewPos, t_iSetCount):
  t_iNewSet = t_arSetList[1];
  break;
  default:
  t_iNewSet = t_arSetList[t_iNewPos];
  }

  }

  var t_mpMySet = meProp(_me, "m_mp_AllSets")[a_iPartName][callNamed("string", t_iNewSet)];
  meProp(_me, "m_ar_PropsToServer")[a_iPartName]["SetID"] = t_iNewSet;
  meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Figure"] = t_mpMySet[1];
  meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Color"] = t_mpMySet[2][1];
  if (lingoBinary("eq", a_iPartName, "hr")) {
  if (lingoBinary("neq", meProp(_me, "m_CurrentHairCol"), undefined)) {
  if (callMethod("findPos", t_mpMySet[2], meProp(_me, "m_CurrentHairCol"))) {
  meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Color"] = meProp(_me, "m_CurrentHairCol");
  }

  }

  }

  if (lingoBinary("eq", a_iPartName, "hd")) {
  if (lingoBinary("neq", meProp(_me, "m_CurrentSkinCol"), undefined)) {
  if (callMethod("findPos", t_mpMySet[2], meProp(_me, "m_CurrentSkinCol"))) {
  meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Color"] = meProp(_me, "m_CurrentSkinCol");
  }

  }

  }

  if (lingoBinary("eq", a_iPartName, "hr")) {
  setMeProp(_me, "m_bCanWearHat", callMethod("GetHatList", callNamed("getThread", symbol("AvatarFactory")).component, t_iNewSet));
  if (meProp(_me, "m_bCanWearHat")) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.1"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.-1"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "set.nohats.info"), symbol("blend"), 0)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), symbol("blend"), 30)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.1"), symbol("blend"), 30)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.-1"), symbol("blend"), 30)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "set.nohats.info"), symbol("blend"), 100)
  var tTempPartObj = meProp(_me, "m_ar_BodyPartObjects")["ht"];
  callMethod("Define", tTempPartObj, "ht", 0, 0, 4, "std", _this)
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "m_NoHat_Img")))) {
  var t_Img = callMethod("duplicate", meProp(_me, "m_NoHat_Img"));
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), t_Img)
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_PropsToServer")))) {
  meProp(_me, "m_ar_PropsToServer")["ht"]["SetID"] = -float(1);
  meProp(_me, "m_ar_PropsToServer")["ht"]["Color"] = -float(1);
  meProp(_me, "m_ar_PropsToServer")["ht"]["Figure"] = new LingoPropList(["ht", -float(1)]);
  }

  }

  }

  callMethod("updateFigurePreview", _this)
  callMethod("updateAllPrewIcons", _this)
  for (var i = 1; i <= meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Figure"].count; ++i) {
  var t_mpList = meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Figure"];
  callMethod("setPartModel", _this, callMethod("getPropAt", t_mpList, i), t_mpList[i])
  callMethod("setPartColor", _this, callMethod("getPropAt", t_mpList, i), meProp(_me, "m_ar_PropsToServer")[a_iPartName]["Color"])
  }

  if (lingoBinary("and", lingoBinary("eq", a_iPartName, "ht"), lingoBinary("neq", meProp(_me, "m_ar_PropsToServer")["ht"]["SetID"], -float(1)))) {
  callMethod("CreateFigure", _this)
  }

  return 1;
}


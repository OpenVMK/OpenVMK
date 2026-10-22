// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / changePart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changePart(_me: LingoMe, _this: LingoValue, a_iPartName: LingoValue, a_iDirection: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_ar_availableSets"))) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_availableSets"), a_iPartName), undefined)) {
  return 0;
  }

  var t_iCurrentSet = meProp(_me, "m_ar_MyAvatar")[a_iPartName]["SetID"];
  if ((lingoTruthy(callNamed("voidp", t_iCurrentSet)) ? 0 : 1)) {
  var t_arSetList = meProp(_me, "m_ar_availableSets")[a_iPartName];
  var t_iMyPos = callMethod("findPos", t_arSetList, t_iCurrentSet);
  var t_iSetCount = t_arSetList.count;
  var t_iNewPos = callNamed("integer", lingoBinary("add", t_iMyPos, a_iDirection));
  switch (1) {
case lingoBinary("lte", t_iNewPos, 0):
  t_iNewPos = t_iSetCount;
  break;
case lingoBinary("gt", t_iNewPos, t_iSetCount):
  t_iNewPos = 1;
  break;
  }

  }

  var t_mpMySet = t_arSetList[t_iNewPos];
  var t_iSetID = callMethod("getPropAt", t_arSetList, t_iNewPos);
  meProp(_me, "m_ar_MyAvatar")[a_iPartName]["SetID"] = t_iSetID;
  meProp(_me, "m_ar_MyAvatar")[a_iPartName]["Figure"] = t_mpMySet[1];
  meProp(_me, "m_ar_MyAvatar")[a_iPartName]["Color"] = t_mpMySet[2][1];
  if (lingoBinary("eq", a_iPartName, "hr")) {
  if (lingoBinary("neq", meProp(_me, "m_CurrentHairCol"), undefined)) {
  if (callMethod("findPos", t_mpMySet[2], meProp(_me, "m_CurrentHairCol"))) {
  meProp(_me, "m_ar_MyAvatar")[a_iPartName]["Color"] = meProp(_me, "m_CurrentHairCol");
  }

  }

  }

  if (lingoBinary("eq", a_iPartName, "hd")) {
  if (lingoBinary("neq", meProp(_me, "m_CurrentSkinCol"), undefined)) {
  if (callMethod("findPos", t_mpMySet[2], meProp(_me, "m_CurrentSkinCol"))) {
  meProp(_me, "m_ar_MyAvatar")[a_iPartName]["Color"] = meProp(_me, "m_CurrentSkinCol");
  }

  }

  }

  if (lingoBinary("eq", a_iPartName, "hr")) {
  setMeProp(_me, "m_bCanWearHat", callMethod("GetHatList", callNamed("getThread", symbol("AvatarFactory")).component, t_iSetID));
  if (meProp(_me, "m_bCanWearHat")) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.1"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.-1"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "set.nohats.info"), symbol("blend"), 0)
  }

  } else {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), symbol("blend"), 30)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.1"), symbol("blend"), 30)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "change.ht.-1"), symbol("blend"), 30)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "set.nohats.info"), symbol("blend"), 100)
  }

  var tTempPartObj = meProp(_me, "m_ar_BodyPartObjects")["ht"];
  callMethod("Define", tTempPartObj, "ht", 0, 0, 4, "std", _this)
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_NoHat_Img"))) ? 0 : 1)) {
  var t_Img = callMethod("duplicate", meProp(_me, "m_NoHat_Img"));
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), t_Img)
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_PropsToServer"))) ? 0 : 1)) {
  meProp(_me, "m_ar_PropsToServer")["ht"]["SetID"] = -float(1);
  meProp(_me, "m_ar_PropsToServer")["ht"]["Color"] = -float(1);
  meProp(_me, "m_ar_PropsToServer")["ht"]["Figure"] = new LingoPropList(["ht", -float(1)]);
  }

  }

  }

  callMethod("ShowHideColorChoosers", _this, a_iPartName, t_mpMySet)
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

}


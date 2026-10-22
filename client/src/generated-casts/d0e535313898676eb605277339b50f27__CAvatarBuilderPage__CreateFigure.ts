// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / CreateFigure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateFigure(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  setMeProp(_me, "m_sSlogan", callMethod("get", callNamed("getObject", symbol("session")), "Slogan"));
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "set.myslogan");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, meProp(_me, "m_sSlogan"))
  }

  var tProps = callMethod("getFigureData", _this);
  var m_mp_FlipList = new LingoList([0, 1, 2, 3, 4, 3, 2, 1]);
  setMeProp(_me, "m_ar_BodyPartObjects", new LingoPropList([]));
  var t_mpPartIndex = new LingoPropList(["tr", new LingoPropList([]), "llg", new LingoPropList([]), "lsh", new LingoPropList([]), "lpn", new LingoPropList([]), "rlg", new LingoPropList([]), "rsh", new LingoPropList([]), "rpn", new LingoPropList([]), "lh", new LingoPropList([]), "ls", new LingoPropList([]), "ch", new LingoPropList([]), "ch2", new LingoPropList([]), "rh", new LingoPropList([]), "rs", new LingoPropList([]), "hd", new LingoPropList([]), "fc", new LingoPropList([]), "ey", new LingoPropList([]), "hr", new LingoPropList([]), "ht", new LingoPropList([])]);
  for (var i = 1; i <= tProps.count; ++i) {
  var tDirection = 4;
  var tAction = "std";
  for (var e = 1; e <= tProps[i]["Figure"].count; ++e) {
  var t_sPart = callMethod("getPropAt", tProps[i]["Figure"], e);
  callMethod("addProp", t_mpPartIndex[t_sPart], symbol("figure"), tProps[i]["Figure"][e])
  callMethod("addProp", t_mpPartIndex[t_sPart], symbol("color"), tProps[i]["Color"])
  }

  }

  for (var f = 1; f <= t_mpPartIndex.count; ++f) {
  var tPart = callMethod("getPropAt", t_mpPartIndex, f);
  var tmodel = t_mpPartIndex[f].figure;
  if (lingoBinary("and", lingoBinary("neq", t_mpPartIndex[f].color, -float(1)), lingoBinary("neq", t_mpPartIndex[f].color, undefined))) {
  var tColor = callNamed("rgb", t_mpPartIndex[f].color);
  if (lingoBinary("eq", tPart, "hr")) {
  setMeProp(_me, "m_CurrentHairCol", t_mpPartIndex[f].color);
  }

  if (lingoBinary("eq", tPart, "hd")) {
  setMeProp(_me, "m_CurrentSkinCol", t_mpPartIndex[f].color);
  }

  } else {
  setThePropOf(t_mpPartIndex[f], "color", -float(1));
  }

  var t_sName = tPart;
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

  var t_sObjectName = lingoBinary("join", "CBodypartClass_", t_sName);
  if (callNamed("memberExists", t_sObjectName)) {
  var tTempPartObj = callNamed("createObject", symbol("temp"), t_sObjectName);
  } else {
  tTempPartObj = callNamed("createObject", symbol("temp"), "CBodypartClass");
  }

  callMethod("Define", tTempPartObj, tPart, tmodel, tColor, tDirection, tAction, _this)
  callMethod("addProp", meProp(_me, "m_ar_BodyPartObjects"), tPart, tTempPartObj)
  }

  callMethod("updateFigurePreview", _this)
  callMethod("updateAllPrewIcons", _this)
  return 1;
  }

}


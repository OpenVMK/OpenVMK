// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / updateAllPrewIcons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateAllPrewIcons(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "set.myslogan")) {
  callMethod("setFocus", callMethod("getElement", meProp(_me, "m_rWindow"), "set.myslogan"), 1)
  }

  var t_mpList = new LingoList(["hr", "hd", "ch", "pn", "sh", "ht"]);
  for (var tPart of t_mpList.toArray()) {
  var t_mp_FigureData = callMethod("getFigureData", _this)[tPart];
  if ((lingoTruthy(callNamed("voidp", t_mp_FigureData["Color"])) ? 0 : 1)) {
  callMethod("updatePartColorPreview", _this, tPart, t_mp_FigureData["Color"])
  }

  switch (tPart) {
case "hd":
  var tTemp = new LingoPropList(["hd", t_mp_FigureData["Figure"]["hd"], "ey", t_mp_FigureData["Figure"]["ey"], "fc", t_mp_FigureData["Figure"]["fc"]]);
  callMethod("updatePartPreview", _this, tPart, tTemp)
  break;
case "ch":
  tTemp = new LingoPropList(["ls", t_mp_FigureData["Figure"]["ls"], "ch", t_mp_FigureData["Figure"]["ch"], "rs", t_mp_FigureData["Figure"]["rs"], "ch2", t_mp_FigureData["Figure"]["ch2"]]);
  callMethod("updatePartPreview", _this, tPart, tTemp)
  break;
case "ht":
  if (lingoBinary("eq", t_mp_FigureData["Figure"]["ht"], -float(1))) {
  var t_Img = callMethod("duplicate", meProp(_me, "m_NoHat_Img"));
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "part.ht.preview"), t_Img)
  } else {
  if ((lingoTruthy(callNamed("voidp", t_mp_FigureData["Figure"])) ? 0 : 1)) {
  callMethod("updatePartPreview", _this, tPart, t_mp_FigureData["Figure"])
  }

  }

  var t_sHairSetID = meProp(_me, "m_ar_PropsToServer")["hr"]["SetID"];
  if ((lingoTruthy(callNamed("voidp", t_sHairSetID)) ? 0 : 1)) {
  setMeProp(_me, "m_bCanWearHat", callMethod("GetHatList", callNamed("getThread", symbol("AvatarFactory")).component, t_sHairSetID));
  if (meProp(_me, "m_bCanWearHat")) {
  callMethod("setWindowElementProperty", _this, "part.ht.preview", symbol("blend"), 100)
  callMethod("setWindowElementProperty", _this, "change.ht.1", symbol("blend"), 100)
  callMethod("setWindowElementProperty", _this, "change.ht.-1", symbol("blend"), 100)
  callMethod("setWindowElementProperty", _this, "set.nohats.info", symbol("blend"), 0)
  } else {
  callMethod("setWindowElementProperty", _this, "part.ht.preview", symbol("blend"), 30)
  callMethod("setWindowElementProperty", _this, "change.ht.1", symbol("blend"), 30)
  callMethod("setWindowElementProperty", _this, "change.ht.-1", symbol("blend"), 30)
  callMethod("setWindowElementProperty", _this, "set.nohats.info", symbol("blend"), 100)
  }

  }

  break;
  default:
  if ((lingoTruthy(callNamed("voidp", t_mp_FigureData["Figure"])) ? 0 : 1)) {
  callMethod("updatePartPreview", _this, tPart, t_mp_FigureData["Figure"])
  }

  }

  }

  }

}


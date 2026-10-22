// vmk_steamboat_handler.cct / CSteamBoatComponent / ShowScreen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowScreen(_me: LingoMe, a_iAvatarRef: LingoValue) {
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rContext)) {
  var t_rObj = callMethod("_AccessIndexed", t_rContext, a_iAvatarRef, "avatar");
  var t_ar_OutlookData = callMethod("GetOutlook", callMethod("GetVisual", t_rObj));
  if (callNamed("listp", t_ar_OutlookData)) {
  if (callNamed("objectp", meProp(_me, "m_obj_ScreenDrawObject"))) {
  var t_Img = callMethod("ParseFigure", meProp(_me, "m_obj_ScreenDrawObject"), t_ar_OutlookData);
  } else {
  setMeProp(_me, "m_obj_ScreenDrawObject", callNamed("createObject", symbol("temp"), "CProjectionImage"));
  t_Img = callMethod("ParseFigure", meProp(_me, "m_obj_ScreenDrawObject"), t_ar_OutlookData);
  }

  }

  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("ShowProjection", _me._interface, t_Img)
  } else {
  callNamed("put", "Screen Image missing !!")
  }

  }

}


// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, i_iframeHead: LingoValue) {
  if (meProp(_me, "m_bActive")) {
  setMeProp(_me, "m_i_frameCounter", i_iframeHead);
  callMethod("checkActiveSpriteSpan", _me)
  if (lingoBinary("neq", meProp(_me, "m_i_ActiveSpriteSpan"), 0)) {
  if ((lingoTruthy(meProp(_me, "m_rSprite").visible) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprite"), "visible", 1);
  }

  var t_activeSprite = meProp(_me, "m_ar_sprites")[meProp(_me, "m_i_ActiveSpriteSpan")];
  callMethod("update", t_activeSprite, i_iframeHead)
  var tNewMember = callMethod("GetParam", t_activeSprite, symbol("member"));
  if (lingoBinary("and", lingoBinary("neq", meProp(_me, "m_rSprite").member, tNewMember), lingoBinary("gt", tNewMember._number, 0))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", callMethod("GetParam", t_activeSprite, symbol("member")));
  }

  var t_activeData = callMethod("getFrameData", meProp(_me, "m_ar_sprites")[meProp(_me, "m_i_ActiveSpriteSpan")]);
  if ((lingoTruthy(callNamed("voidp", t_activeData)) ? 0 : 1)) {
  for (var i = 1; i <= t_activeData.count; ++i) {
  var tProp = callMethod("getPropAt", t_activeData, i);
  callMethod("SetParam", t_activeSprite, tProp, t_activeData[i])
  if (lingoBinary("and", (lingoTruthy(lingoBinary("eq", tProp, symbol("locH"))) ? 0 : 1), (lingoTruthy(lingoBinary("eq", tProp, symbol("locV"))) ? 0 : 1))) {
  var tOldVal = callNamed("value", lingoBinary("join", lingoBinary("join", meProp(_me, "m_rSprite"), "."), callNamed("string", tProp)));
  if (lingoBinary("neq", tOldVal, t_activeData[i])) {
  switch (tProp) {
case symbol("width"):
  setThePropOf(meProp(_me, "m_rSprite"), "width", t_activeData[i]);
  break;
case symbol("height"):
  setThePropOf(meProp(_me, "m_rSprite"), "height", t_activeData[i]);
  break;
case symbol("blend"):
  setThePropOf(meProp(_me, "m_rSprite"), "blend", t_activeData[i]);
  break;
case symbol("rotation"):
  setThePropOf(meProp(_me, "m_rSprite"), "rotation", t_activeData[i]);
  break;
case symbol("skew"):
  setThePropOf(meProp(_me, "m_rSprite"), "skew", t_activeData[i]);
  break;
case symbol("blendLevel"):
  setThePropOf(meProp(_me, "m_rSprite"), "blendLevel", t_activeData[i]);
  break;
case symbol("ink"):
  setThePropOf(meProp(_me, "m_rSprite"), "ink", t_activeData[i]);
  break;
case symbol("flipH"):
  setThePropOf(meProp(_me, "m_rSprite"), "flipH", t_activeData[i]);
  break;
case symbol("flipV"):
  setThePropOf(meProp(_me, "m_rSprite"), "flipV", t_activeData[i]);
  break;
case symbol("startFrame"):
case symbol("endFrame"):
  callNamed("nothing")
  break;
case symbol("locZ"):
  callNamed("nothing")
  break;
case symbol("steps"):
  callNamed("nothing")
  break;
case symbol("tweened"):
  callNamed("nothing")
  break;
  break;
  }

  }

  }

  }

  var tLocH = callMethod("getaProp", t_activeData, symbol("locH"));
  if (callNamed("voidp", tLocH)) {
  tLocH = meProp(_me, "m_iLastLocH");
  } else {
  setMeProp(_me, "m_iLastLocH", tLocH);
  }

  var tLocV = callMethod("getaProp", t_activeData, symbol("locV"));
  if (callNamed("voidp", tLocV)) {
  tLocV = meProp(_me, "m_iLastLocV");
  } else {
  setMeProp(_me, "m_iLastLocV", tLocV);
  }

  var tNewPos = callNamed("point", tLocH, tLocV);
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _me));
  var tVersion = callMethod("GetParam", callMethod("getObject", _me), symbol("version"));
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_veLastScr"), t_veScr), lingoBinary("neq", tNewPos, meProp(_me, "m_pLastPos")))) {
  switch (tVersion) {
case "0.1":
  var t_fXs = tNewPos.locH;
  var t_fYs = tNewPos.locV;
  break;
case "0.2":
  t_fXs = tNewPos.locH;
  t_fYs = tNewPos.locV;
  break;
case "0.3":
case "0.4":
  t_fXs = lingoBinary("add", t_veScr.x, tNewPos.locH);
  t_fYs = lingoBinary("add", t_veScr.y, tNewPos.locV);
  break;
  default:
  t_fXs = lingoBinary("add", t_veScr.x, tNewPos.locH);
  t_fYs = lingoBinary("add", t_veScr.y, tNewPos.locV);
  break;
  }

  var t_fZs = lingoBinary("add", t_veScr.z, meProp(_me, "m_iDeltaLocZ"));
  if (lingoBinary("neq", meProp(_me, "m_rSprite").locH, t_fXs)) {
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_fXs);
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprite").locV, t_fYs)) {
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_fYs);
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprite").locZ, t_fZs)) {
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_fZs);
  }

  setMeProp(_me, "m_veLastScr", t_veScr);
  setMeProp(_me, "m_pLastPos", tNewPos);
  }

  }

  } else {
  if (meProp(_me, "m_rSprite").visible) {
  setThePropOf(meProp(_me, "m_rSprite"), "visible", 0);
  }

  }

  }

}


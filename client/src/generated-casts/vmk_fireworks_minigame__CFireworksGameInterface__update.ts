// vmk_fireworks_minigame.cct / CFireworksGameInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_prepared")) {
  switch (1) {
case callNamed("keyPressed", 123):
  var t_direction = -float(1);
  break;
case callNamed("keyPressed", 124):
  t_direction = 1;
  break;
case callNamed("keyPressed", callNamed("space")):
  if (meProp(_me, "m_bExplodeAllActive")) {
  callMethod("activateExplodeAll", _me, 1)
  callNamed("createTimeout", "ExplodeAllTimeout", lingoBinary("mul", 10, 1000), symbol("activateExplodeAll"), callMethod("getID", _me), undefined, 1)
  callMethod("ExplodeVisibleFireworks", _me)
  }

  break;
  default:
  t_direction = 0;
  }

  if (lingoBinary("neq", t_direction, 0)) {
  if ((lingoTruthy(meProp(_me, "m_bKeyIsDown")) ? 0 : 1)) {
  callMethod("HandleKeyDown", _me, t_direction)
  setMeProp(_me, "m_bKeyIsDown", 1);
  }

  } else {
  setMeProp(_me, "m_bKeyIsDown", 0);
  }

  callMethod("ExplodeVisibleFireworks", _me, 1)
  setMeProp(_me, "m_ar_clicks", new LingoList([]));
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[1], "loc", lingoBinary("sub", theProperty("mouseLoc"), callNamed("point", 10, 10)));
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[2], "loc", lingoBinary("sub", theProperty("mouseLoc"), callNamed("point", 10, 10)));
  for (var i = 1; i <= meProp(_me, "m_ar_fwSpritelist").count; ++i) {
  if (meProp(_me, "m_ar_fwSpritelist")[i].visible) {
  var tSpr = meProp(_me, "m_ar_fwSpritelist")[i];
  meProp(_me, "m_ar_pulse")[i] = lingoBinary("add", meProp(_me, "m_ar_pulse")[i], lingoBinary("mul", meProp(_me, "m_ar_vicinityList")[i], float(3)));
  setThePropOf(tSpr, "blend", callNamed("integer", lingoBinary("add", float(49), lingoBinary("mul", float(25), callNamed("sin", meProp(_me, "m_ar_pulse")[i])))));
  var tFlash = meProp(_me, "m_ar_mp_flashList")[i];
  if (lingoBinary("neq", tFlash.frame, 0)) {
  setThePropOf(tFlash.sprite, "loc", tSpr.loc);
  if (lingoBinary("neq", tFlash.sprite.member, meProp(_me, "m_ar_mFlashAnim")[tFlash.frame])) {
  setThePropOf(tFlash.sprite, "member", meProp(_me, "m_ar_mFlashAnim")[tFlash.frame]);
  setThePropOf(tFlash.sprite, "width", tFlash.sprite.member.image.width);
  setThePropOf(tFlash.sprite, "height", tFlash.sprite.member.image.height);
  }

  setThePropOf(tFlash.sprite, "rotation", lingoBinary("mod", callNamed("integer", lingoBinary("add", tFlash.sprite.rotation, 5)), 360));
  continue;
  }

  if ((lingoTruthy(callNamed("voidp", tFlash.sprite.member)) ? 0 : 1)) {
  setThePropOf(tFlash.sprite, "member", undefined);
  }

  }

  }

  for (var tComment of meProp(_me, "m_ar_comments").toArray()) {
  setThePropOf(tComment, "time", lingoBinary("sub", tComment.time, 1));
  if (lingoBinary("lte", tComment.time, 0)) {
  setThePropOf(tComment.sprite, "member", undefined);
  }

  }

  }

}


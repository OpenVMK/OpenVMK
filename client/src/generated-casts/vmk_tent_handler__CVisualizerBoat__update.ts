// vmk_tent_handler.cct / CVisualizerBoat / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  for (var tSprite of meProp(_me, "m_rSprites").toArray()) {
  setThePropOf(tSprite, "member", undefined);
  }

  var t_vPosition = callMethod("GetScrPos", callMethod("getObject", _me));
  var t_sDirection = callMethod("GetParam", callMethod("getObject", _me), "Direction");
  var t_iColor = callMethod("GetParam", callMethod("getObject", _me), "Color");
  var t_bSpotOn = callMethod("GetParam", callMethod("getObject", _me), "SpotOn");
  var t_bAvatarOn = callMethod("GetParam", callMethod("getObject", _me), "AvatarOn");
  var t_fSteer = callMethod("GetParam", callMethod("getObject", _me), "Steer");
  var t_ar_graphics = new LingoList([]);
  var t_ar_canopy = new LingoList([]);
  var t_ar_spot = undefined;
  switch (t_sDirection) {
case "up":
  if (lingoBinary("lte", t_fSteer, -float(0.1))) {
  t_ar_graphics = meProp(_me, "m_ar_graphicsBoatUpLeft");
  t_ar_canopy = meProp(_me, "m_ar_graphicsCanopyUpLeft");
  var t_spot = meProp(_me, "m_graphicsSpotUp");
  } else {
  if (lingoBinary("gte", t_fSteer, 0.1)) {
  t_ar_graphics = meProp(_me, "m_ar_graphicsBoatUpRight");
  t_ar_canopy = meProp(_me, "m_ar_graphicsCanopyUpRight");
  t_spot = meProp(_me, "m_graphicsSpotUp");
  } else {
  t_ar_graphics = meProp(_me, "m_ar_graphicsBoatUpStraight");
  t_ar_canopy = meProp(_me, "m_ar_graphicsCanopyUpStraight");
  t_spot = meProp(_me, "m_graphicsSpotUp");
  }

  }

  break;
case "down":
  if (lingoBinary("lte", t_fSteer, -float(0.1))) {
  t_ar_graphics = meProp(_me, "m_ar_graphicsBoatDownLeft");
  t_ar_canopy = meProp(_me, "m_ar_graphicsCanopyDownLeft");
  t_spot = meProp(_me, "m_graphicsSpotDown");
  } else {
  if (lingoBinary("gte", t_fSteer, 0.1)) {
  t_ar_graphics = meProp(_me, "m_ar_graphicsBoatDownRight");
  t_ar_canopy = meProp(_me, "m_ar_graphicsCanopyDownRight");
  t_spot = meProp(_me, "m_graphicsSpotDown");
  } else {
  t_ar_graphics = meProp(_me, "m_ar_graphicsBoatDownStraight");
  t_ar_canopy = meProp(_me, "m_ar_graphicsCanopyDownStraight");
  t_spot = meProp(_me, "m_graphicsSpotDown");
  }

  }

  break;
  }

  var tStartZ = lingoBinary("sub", lingoBinary("sub", t_vPosition.z, t_ar_graphics.count), 3);
  for (var i = 1; i <= t_ar_graphics.count; ++i) {
  if ((lingoTruthy(callMethod("getaProp", t_ar_graphics[i], symbol("canopy"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[i], "member", t_ar_graphics[i].member);
  setThePropOf(meProp(_me, "m_rSprites")[i], "width", meProp(_me, "m_rSprites")[i].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[i], "height", meProp(_me, "m_rSprites")[i].member.height);
  setThePropOf(meProp(_me, "m_rSprites")[i], "ink", t_ar_graphics[i].ink);
  setThePropOf(meProp(_me, "m_rSprites")[i], "locZ", lingoBinary("add", tStartZ, i));
  setThePropOf(meProp(_me, "m_rSprites")[i], "loc", callNamed("point", t_vPosition.x, t_vPosition.y));
  if (callMethod("getaProp", t_ar_graphics[i], symbol("avata"))) {
  setThePropOf(meProp(_me, "m_rSprites")[i], "width", callNamed("integer", lingoBinary("mul", meProp(_me, "m_rSprites")[i].member.image.width, 0.75)));
  setThePropOf(meProp(_me, "m_rSprites")[i], "height", callNamed("integer", lingoBinary("mul", meProp(_me, "m_rSprites")[i].member.image.height, 0.75)));
  if ((lingoTruthy(t_bAvatarOn) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[i], "member", undefined);
  }

  }

  continue;
  }

  setThePropOf(meProp(_me, "m_rSprites")[i], "member", t_ar_canopy[t_iColor].member);
  setThePropOf(meProp(_me, "m_rSprites")[i], "width", meProp(_me, "m_rSprites")[i].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[i], "height", meProp(_me, "m_rSprites")[i].member.height);
  setThePropOf(meProp(_me, "m_rSprites")[i], "ink", t_ar_canopy[t_iColor].ink);
  setThePropOf(meProp(_me, "m_rSprites")[i], "locZ", lingoBinary("add", tStartZ, i));
  setThePropOf(meProp(_me, "m_rSprites")[i], "loc", callNamed("point", t_vPosition.x, t_vPosition.y));
  }

  if (t_bSpotOn) {
  i = lingoBinary("add", t_ar_graphics.count, 2);
  setThePropOf(meProp(_me, "m_rSprites")[i], "member", t_spot.member);
  setThePropOf(meProp(_me, "m_rSprites")[i], "width", meProp(_me, "m_rSprites")[i].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[i], "height", meProp(_me, "m_rSprites")[i].member.height);
  setThePropOf(meProp(_me, "m_rSprites")[i], "ink", t_spot.ink);
  setThePropOf(meProp(_me, "m_rSprites")[i], "locZ", t_vPosition.z);
  setThePropOf(meProp(_me, "m_rSprites")[i], "loc", callNamed("point", t_vPosition.x, t_vPosition.y));
  }

}


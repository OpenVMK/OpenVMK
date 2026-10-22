// vmk_junglecruise_minigame.cct / CJungleCruiseVisualizerBoat / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_i_FlashBlend", 0);
  var tList = new LingoList(["reflection1", "wake1", "hull1_straight", "hull1_straight_mask", "hull1_left", "hull1_left_mask", "hull1_right", "hull1_right_mask"]);
  for (var tMemName of tList.toArray()) {
  setThePropOf(callNamed("getMember", tMemName), "useAlpha", 1);
  }

  tList = new LingoList(["reflection3", "wake3", "hull3_straight", "hull3_straight_mask", "hull3_left", "hull3_left_mask", "hull3_right", "hull3_right_mask"]);
  for (var tMemName of tList.toArray()) {
  setThePropOf(callNamed("getMember", tMemName), "useAlpha", 1);
  }

  tList = new LingoList(["blue1_straight", "grey1_straight", "yellow1_straight", "red1_straight", "blue1_left", "grey1_left", "yellow1_left", "red1_left", "blue1_right", "grey1_right", "yellow1_right", "red1_right"]);
  for (var tMemName of tList.toArray()) {
  setThePropOf(callNamed("getMember", tMemName), "useAlpha", 1);
  }

  tList = new LingoList(["blue3_straight", "grey3_straight", "yellow3_straight", "red3_straight", "blue3_left", "grey3_left", "yellow3_left", "red3_left", "blue3_right", "grey3_right", "yellow3_right", "red3_right"]);
  for (var tMemName of tList.toArray()) {
  setThePropOf(callNamed("getMember", tMemName), "useAlpha", 1);
  }

  tList = new LingoList(["straight", "left", "right"]);
  for (var tdir of new LingoList([1, 3]).toArray()) {
  for (var tFrame of tList.toArray()) {
  var tHullMem = new LingoPropList([symbol("member"), callNamed("getMember", lingoBinary("join", lingoBinary("join", lingoBinary("join", "hull", tdir), "_"), tFrame))]);
  var tRoofMem = new LingoPropList([symbol("member"), callNamed("getMember", lingoBinary("join", lingoBinary("join", lingoBinary("join", "grey", tdir), "_"), tFrame))]);
  var tUnionList = new LingoList([tHullMem, tRoofMem]);
  var tNewRegpoint = callNamed("point", 0, 0);
  var tImg = callMethod("createUnionImageFromMemberList", _me, tUnionList, tNewRegpoint, new LingoPropList([symbol("createMask"), 1, symbol("fillColor"), callNamed("rgb", "#FF0000")]));
  tMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Boat", tdir), "_"), tFrame), ".red");
  callNamed("createMember", tMemName, symbol("bitmap"))
  var tNuMem = callNamed("getMember", tMemName);
  setThePropOf(tNuMem, "image", tImg);
  setThePropOf(tNuMem, "regPoint", tNewRegpoint);
  }

  }

  setMeProp(_me, "m_ar_graphicsBoatUpStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_straight"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "tempAvatarImage"), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_straight_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "Boat1_straight.red"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsBoatUpLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_left"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "tempAvatarImage"), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_left_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "Boat1_left.red"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsBoatUpRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_right"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "tempAvatarImage"), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_right_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "Boat1_right.red"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyUpStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue1_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey1_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow1_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red1_straight"), symbol("ink"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyUpLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue1_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey1_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow1_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red1_left"), symbol("ink"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyUpRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue1_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey1_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow1_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red1_right"), symbol("ink"), 0])]));
  setMeProp(_me, "m_graphicsSpotUp", new LingoPropList([symbol("member"), callNamed("getMember", "ur_spot"), symbol("ink"), 33]));
  setMeProp(_me, "m_ar_graphicsBoatDownStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_straight"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "tempAvatarImage"), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_straight_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "Boat3_straight.red"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsBoatDownLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_left"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "tempAvatarImage"), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_left_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "Boat3_left.red"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsBoatDownRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_right"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "tempAvatarImage"), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_right_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "Boat3_right.red"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyDownStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue3_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey3_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow3_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red3_straight"), symbol("ink"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyDownLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue3_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey3_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow3_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red3_left"), symbol("ink"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyDownRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue3_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey3_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow3_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red3_right"), symbol("ink"), 0])]));
  setMeProp(_me, "m_graphicsSpotDown", new LingoPropList([symbol("member"), callNamed("getMember", "dr_spot"), symbol("ink"), 33]));
  setMeProp(_me, "m_rSprites", new LingoList([]));
  for (var tmember of meProp(_me, "m_ar_graphicsBoatUpStraight").toArray()) {
  var tSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  callMethod("append", meProp(_me, "m_rSprites"), tSprite)
  }

  callMethod("append", meProp(_me, "m_rSprites"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  callMethod("append", meProp(_me, "m_rSprites"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  for (var i = 1; i <= meProp(_me, "m_rSprites").count; ++i) {
  for (var j = i; j <= meProp(_me, "m_rSprites").count; ++j) {
  if (lingoBinary("gt", meProp(_me, "m_rSprites")[i].spriteNum, meProp(_me, "m_rSprites")[j].spriteNum)) {
  var temp = meProp(_me, "m_rSprites")[i];
  meProp(_me, "m_rSprites")[i] = meProp(_me, "m_rSprites")[j];
  meProp(_me, "m_rSprites")[j] = temp;
  }

  }

  }

  setMeProp(_me, "m_bInitialized", 0);
  return 1;
}


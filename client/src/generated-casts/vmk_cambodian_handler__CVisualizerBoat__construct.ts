// vmk_cambodian_handler.cct / CVisualizerBoat / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setThePropOf(callNamed("getMember", "reflection1"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "wake1"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull1_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull1_straight_mask"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull1_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull1_left_mask"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull1_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull1_right_mask"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "reflection3"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "wake3"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull3_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull3_straight_mask"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull3_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull3_left_mask"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull3_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "hull3_right_mask"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "blue1_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "grey1_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "yellow1_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "red1_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "blue1_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "grey1_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "yellow1_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "red1_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "blue1_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "grey1_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "yellow1_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "red1_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "blue3_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "grey3_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "yellow3_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "red3_straight"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "blue3_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "grey3_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "yellow3_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "red3_left"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "blue3_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "grey3_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "yellow3_right"), "useAlpha", 1);
  setThePropOf(callNamed("getMember", "red3_right"), "useAlpha", 1);
  setMeProp(_me, "m_iMemnumAvatarVisualizer", callNamed("createMember", callNamed("getUniqueID"), symbol("bitmap")));
  setMeProp(_me, "m_ar_graphicsBoatUpStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_straight"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_straight_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1])]));
  setMeProp(_me, "m_ar_graphicsBoatUpLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_left"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_left_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1])]));
  setMeProp(_me, "m_ar_graphicsBoatUpRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake1"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_right"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull1_right_mask"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1])]));
  setMeProp(_me, "m_ar_graphicsCanopyUpStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue1_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey1_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow1_straight"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red1_straight"), symbol("ink"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyUpLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue1_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey1_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow1_left"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red1_left"), symbol("ink"), 0])]));
  setMeProp(_me, "m_ar_graphicsCanopyUpRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "blue1_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "grey1_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "yellow1_right"), symbol("ink"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "red1_right"), symbol("ink"), 0])]));
  setMeProp(_me, "m_graphicsSpotUp", new LingoPropList([symbol("member"), callNamed("getMember", "ur_spot"), symbol("ink"), 33]));
  setMeProp(_me, "m_ar_graphicsBoatDownStraight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_straight"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_straight_mask"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsBoatDownLeft", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_left"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_left_mask"), symbol("ink"), 0, symbol("avata"), 0])]));
  setMeProp(_me, "m_ar_graphicsBoatDownRight", new LingoList([new LingoPropList([symbol("member"), callNamed("getMember", "reflection3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "wake3"), symbol("ink"), 33, symbol("avata"), 0]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_right"), symbol("ink"), 0, symbol("avata"), 0]), new LingoPropList([symbol("member"), undefined, symbol("ink"), undefined, symbol("avata"), 0, symbol("canopy"), 1]), new LingoPropList([symbol("member"), callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), symbol("ink"), 0, symbol("avata"), 1]), new LingoPropList([symbol("member"), callNamed("getMember", "hull3_right_mask"), symbol("ink"), 0, symbol("avata"), 0])]));
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
  return 1;
}


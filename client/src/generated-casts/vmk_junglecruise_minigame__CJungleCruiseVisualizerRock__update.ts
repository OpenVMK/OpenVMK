// vmk_junglecruise_minigame.cct / CJungleCruiseVisualizerRock / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_b_Inited")) ? 0 : 1)) {
  var tPos = callMethod("GetScrPos", callMethod("getObject", _me));
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "jc_hazard_01"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", lingoBinary("sub", tPos.z, 150));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", tPos.x, tPos.y));
  setMeProp(_me, "m_b_Inited", 1);
  }

  var tEntryFrames = callMethod("GetParam", callMethod("getObject", _me), "Entry");
  var tLoopFrames = callMethod("GetParam", callMethod("getObject", _me), "Loop");
  var tLeaveFrames = callMethod("GetParam", callMethod("getObject", _me), "Leave");
  var tFrameNum = callMethod("GetParam", callMethod("getObject", _me), "FrameNum");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  tPos = callMethod("GetScrPos", callMethod("getObject", _me));
  switch (tstate) {
case symbol("entry"):
  if (lingoBinary("gt", tFrameNum, tEntryFrames.count)) {
  tFrameNum = tEntryFrames.count;
  }

  var tNewMember = tEntryFrames[tFrameNum];
  break;
case symbol("loop"):
  if (lingoBinary("gt", tFrameNum, tLoopFrames.count)) {
  tFrameNum = lingoBinary("add", lingoBinary("mod", tFrameNum, tLoopFrames.count), 1);
  }

  tNewMember = tLoopFrames[tFrameNum];
  break;
case symbol("leave"):
  if (lingoBinary("gt", tFrameNum, tLeaveFrames.count)) {
  tFrameNum = tLeaveFrames.count;
  }

  tNewMember = tLeaveFrames[tFrameNum];
  break;
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, tNewMember)) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", tNewMember);
  var tOrgWidth = meProp(_me, "m_rSprite").member.image.width;
  var tOrgHeight = meProp(_me, "m_rSprite").member.image.height;
  setThePropOf(meProp(_me, "m_rSprite"), "width", tOrgWidth);
  setThePropOf(meProp(_me, "m_rSprite"), "height", tOrgHeight);
  }

}


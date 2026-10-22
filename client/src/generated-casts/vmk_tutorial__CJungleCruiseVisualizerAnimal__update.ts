// vmk_tutorial.cct / CJungleCruiseVisualizerAnimal / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tEntryFrames = callMethod("GetParam", callMethod("getObject", _me), "Entry");
  var tLoopFrames = callMethod("GetParam", callMethod("getObject", _me), "Loop");
  var tLeaveFrames = callMethod("GetParam", callMethod("getObject", _me), "Leave");
  var tFrameNum = callMethod("GetParam", callMethod("getObject", _me), "FrameNum");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  var tFlip = callMethod("GetParam", callMethod("getObject", _me), "Flip");
  var tScale = callMethod("GetParam", callMethod("getObject", _me), "Scale");
  var tPos = callMethod("GetScrPos", callMethod("getObject", _me));
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
  }

  var t_veScr = tPos;
  if (lingoBinary("neq", meProp(_me, "m_veLastScr"), t_veScr)) {
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_fXs);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_fYs);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_fZs);
  setMeProp(_me, "m_veLastScr", t_veScr);
  }

  var tOrgWidth = meProp(_me, "m_rSprite").member.image.width;
  var tOrgHeight = meProp(_me, "m_rSprite").member.image.height;
  setThePropOf(meProp(_me, "m_rSprite"), "width", lingoBinary("mul", tOrgWidth, tScale));
  setThePropOf(meProp(_me, "m_rSprite"), "height", lingoBinary("mul", tOrgHeight, tScale));
  setThePropOf(meProp(_me, "m_rSprite"), "flipH", tFlip);
}


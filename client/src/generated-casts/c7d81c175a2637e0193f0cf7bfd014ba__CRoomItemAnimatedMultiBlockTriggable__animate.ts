// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemAnimatedMultiBlockTriggable / animate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function animate(_me: LingoMe, _this: LingoValue, t_iForceFrame: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  if (lingoBinary("or", (lingoTruthy(callNamed("voidp", t_iForceFrame)) ? 0 : 1), lingoBinary("eq", meProp(_me, "m_iDelay"), meProp(_me, "m_iMaxDelay")))) {
  var t_rItem = callMethod("getObject", _this);
  var t_fFloorSize = callNamed("float", callMethod("GetParam", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "TILESIZE"));
  var t_fItemSize = callNamed("float", callMethod("GetParam", t_rItem, "STRUCT")[symbol("param")]["TILESIZE"]);
  if (callNamed("voidp", t_fItemSize)) {
  t_fItemSize = float(32);
  }

  var t_fScaling = undefined;
  if (lingoBinary("neq", t_fItemSize, t_fFloorSize)) {
  t_fScaling = lingoBinary("div", t_fFloorSize, t_fItemSize);
  }

  switch (callNamed("value", callMethod("GetParam", t_rItem, "DIR"))) {
case 1:
  var tFrameList = meProp(_me, "m_mpFrameList")[1];
  break;
case 3:
  tFrameList = meProp(_me, "m_mpFrameList")[2];
  break;
case 5:
  tFrameList = meProp(_me, "m_mpFrameList")[3];
  break;
case 7:
  tFrameList = meProp(_me, "m_mpFrameList")[4];
  break;
  default:
  tFrameList = new LingoList([]);
  }

  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", t_rItem));
  for (var i = 1; i <= t_ar_rBlocks.count; ++i) {
  var t_rBlock = t_ar_rBlocks[i];
  var t_ar_rSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  for (var j = 1; j <= t_ar_rSprites.count; ++j) {
  var t_iMaxFrame = tFrameList[i][j].count;
  if (lingoBinary("gt", t_iMaxFrame, 1)) {
  var t_rSprite = t_ar_rSprites[j];
  if (callNamed("voidp", t_iForceFrame)) {
  var t_iCurFrame = callMethod("getPos", tFrameList[i][j], t_rSprite.member);
  t_iCurFrame = lingoBinary("add", t_iCurFrame, 1);
  if (lingoBinary("gt", t_iCurFrame, t_iMaxFrame)) {
  t_iCurFrame = 2;
  }

  setThePropOf(t_rSprite, "member", tFrameList[i][j][t_iCurFrame]);
  } else {
  setThePropOf(t_rSprite, "member", tFrameList[i][j][t_iForceFrame]);
  }

  if (lingoBinary("neq", t_fScaling, undefined)) {
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rSprite.member.width, t_fScaling));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rSprite.member.height, t_fScaling));
  continue;
  }

  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  }

  }

  }

  setMeProp(_me, "m_iDelay", 1);
  } else {
  setMeProp(_me, "m_iDelay", lingoBinary("add", meProp(_me, "m_iDelay"), 1));
  }

  }

}


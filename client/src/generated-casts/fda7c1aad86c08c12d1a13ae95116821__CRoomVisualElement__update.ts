// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bAnimate")) {
  if ((lingoTruthy(meProp(_me, "m_bLoaded")) ? 0 : 1)) {
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this)));
  for (var t_rBlock of t_ar_rBlocks.toArray()) {
  var t_ar_rSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  if (lingoBinary("gt", t_ar_rSprites.count, 0)) {
  var t_rSprite = t_ar_rSprites[1];
  var t_iCurrent = meProp(_me, "m_ar_loadAnimation")[symbol("current")];
  if (lingoBinary("eq", t_iCurrent, 1)) {
  if (lingoBinary("gt", meProp(_me, "m_ar_loadAnimation").frames.count, 0)) {
  var t_ar_anim = meProp(_me, "m_ar_loadAnimation")[symbol("frames")][1][symbol("sprites")][1];
  var t_ar_frames = t_ar_anim.frames;
  var t_iIndex = t_ar_anim.index;
  var t_rMem = t_ar_frames[t_iIndex];
  if (lingoBinary("neq", t_rMem, t_rSprite.member)) {
  setThePropOf(t_rSprite, "member", t_rMem);
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  }

  t_iIndex = lingoBinary("add", t_iIndex, 1);
  if (lingoBinary("gt", t_iIndex, t_ar_frames.count)) {
  t_iIndex = 1;
  }

  t_ar_anim[symbol("index")] = t_iIndex;
  }

  }

  t_iCurrent = lingoBinary("add", t_iCurrent, 1);
  if (lingoBinary("gt", t_iCurrent, meProp(_me, "m_ar_loadAnimation").delay)) {
  t_iCurrent = 1;
  }

  meProp(_me, "m_ar_loadAnimation")[symbol("current")] = t_iCurrent;
  }

  }

  }

  }

  if (lingoBinary("or", meProp(_me, "m_bSelected"), meProp(_me, "m_bCustomHighlighters"))) {
  callMethod("AdjustHighlighters", _this, meProp(_me, "m_mp_blinkStat").cur)
  setThePropOf(meProp(_me, "m_mp_blinkStat"), "cur", lingoBinary("add", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").inc));
  if (lingoBinary("or", lingoBinary("lte", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").min), lingoBinary("gte", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").max))) {
  setThePropOf(meProp(_me, "m_mp_blinkStat"), "inc", -float(meProp(_me, "m_mp_blinkStat").inc));
  setThePropOf(meProp(_me, "m_mp_blinkStat"), "cur", lingoBinary("add", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").inc));
  }

  }

}


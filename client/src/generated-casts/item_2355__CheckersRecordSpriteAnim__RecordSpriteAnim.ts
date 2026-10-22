// item_2355.cct / CheckersRecordSpriteAnim / RecordSpriteAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RecordSpriteAnim(_me: LingoMe, a_iSprite: LingoValue, a_iStart: LingoValue, a_iEnd: LingoValue, a_ptCenter: LingoValue) {
  var t_iFloatPrec = theProperty("floatPrecision");
  setTheProperty("floatPrecision", 3);
  if (callNamed("voidp", a_ptCenter)) {
  callNamed("go", a_iStart)
  a_ptCenter = callNamed("sprite", a_iSprite).loc;
  }

  var t_ar_rFrames = new LingoList([]);
  var t_ar_sMembers = new LingoList([]);
  for (var t_iFrame = a_iStart; t_iFrame <= a_iEnd; ++t_iFrame) {
  callNamed("go", t_iFrame)
  var t_rSprite = callNamed("sprite", a_iSprite);
  var t_rMember = t_rSprite.member;
  var t_iMember = callMethod("getPos", t_ar_sMembers, t_rMember.name);
  if (lingoBinary("lt", t_iMember, 1)) {
  callMethod("add", t_ar_sMembers, t_rMember.name)
  t_iMember = t_ar_sMembers.count;
  }

  var t_rFrame = new LingoPropList([]);
  callMethod("setaProp", t_rFrame, symbol("member"), t_iMember)
  callMethod("setaProp", t_rFrame, symbol("offset"), lingoBinary("sub", t_rSprite.loc, a_ptCenter))
  callMethod("setaProp", t_rFrame, symbol("blend"), t_rSprite.blend)
  callMethod("setaProp", t_rFrame, symbol("ink"), t_rSprite.ink)
  callMethod("setaProp", t_rFrame, symbol("flipH"), t_rSprite.flipH)
  callMethod("setaProp", t_rFrame, symbol("flipV"), t_rSprite.flipV)
  callMethod("setaProp", t_rFrame, symbol("scale"), new LingoList([lingoBinary("div", callNamed("float", t_rSprite.width), callNamed("float", t_rMember.width)), lingoBinary("div", callNamed("float", t_rSprite.height), callNamed("float", t_rMember.height))]))
  callMethod("add", t_ar_rFrames, t_rFrame)
  }

  var t_rOutput = new LingoPropList([symbol("version"), 0, symbol("members"), t_ar_sMembers, symbol("frames"), t_ar_rFrames]);
  var t_sOutput = callNamed("string", t_rOutput);
  setTheProperty("floatPrecision", t_iFloatPrec);
  return t_sOutput;
}


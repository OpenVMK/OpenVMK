// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualBlock / ChangeHighlighterType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeHighlighterType(_me: LingoMe, _this: LingoValue, a_kType: LingoValue) {
  /*
   * ⚠ FAITHFUL TO THE ORIGINAL: this handler is effectively a NO-OP.
   *
   * The original Lingo (00393_CRoomVisualBlock.ls) has an UNCONDITIONAL
   * `return error(...)` on line 253, BEFORE the fill/setAlpha on lines 254-258 —
   * so in real VMK those lines are DEAD CODE and never execute. The selection
   * highlighter is built ENTIRELY by `CreateHighlighter`; this only computes an
   * (unused) colour and returns.
   *
   * An earlier "fix" here treated the early return as a decompiler artifact and
   * let the body run. That was WRONG: it added a `fill(box) + setAlpha` the
   * original never does, which re-filled the carved highlighter into a solid
   * #EFEFEF BOX (the "white box" glow) whenever that second setAlpha ran against a
   * not-yet-ready mask. Restored to the original so nothing touches the image
   * after CreateHighlighter. See the .ls source.
   */
  var t_rColor;
  switch (a_kType) {
case symbol("select"):
  t_rColor = callNamed("rgb", "#EFEFEF");
  break;
case symbol("teleportpair"):
  t_rColor = callNamed("rgb", "#7070EF");
  break;
  }

  return callNamed("error", _this, lingoBinary("joinPad", "Invalid highlighter type:", a_kType), symbol("ChangeHighlighterType"));
  setThePropOf(meProp(_me, "m_rHighLight"), "type", a_kType);
  var t_rAlpha = callMethod("extractAlpha", meProp(_me, "m_rHighLight").sprite.member.image);
  var t_rImage = meProp(_me, "m_rHighLight").sprite.member.image;
  callMethod("fill", t_rImage, t_rImage.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), t_rColor]))
  callMethod("setAlpha", t_rImage, t_rAlpha)
}


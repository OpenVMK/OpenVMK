// core.old.cct / CMgrResource / registerMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerMember(_me: LingoMe, tMemName: LingoValue, tMemberNum: LingoValue) {
  if (callNamed("voidp", tMemberNum)) {
  tMemberNum = callNamed("member", tMemName)._number;
  }

  if (lingoBinary("lt", tMemberNum, 1)) {
  return 0;
  }

  /*
   * ⚠ HAND-CORRECTED: a duplicate NAME resolves to the LOWEST member number.
   *
   * `pAllMemNumList` is what `getmemnum` (and rooms placing sprites by
   * MEMBER="name") read. The original overwrote unconditionally, so when a cast
   * carries two same-named members the LAST registered won — and casts carry
   * EMPTY duplicate members that then shadowed the real art. MEASURED: Shipwreck
   * has `sunken_ship_bg` as member 7 (the 1.8 MB backdrop) and an empty member 17
   * (0-byte BITD/ALFA); last-wins registered 17, the room placed the empty member
   * and the whole underwater backdrop rendered BLACK. Director resolves a
   * duplicate name to the lowest member number, so keep the lowest here too.
   * Dynamic members go through createMember (direct set) and carry unique
   * per-instance names, so they are unaffected. See [[room-sound-wrong-cast-clobber]].
   */
  /*
   * ⚠ …THAT HAS CONTENT (2026-09-29), the rule `preIndexMembers` uses: an empty
   * bitmap or an empty text member is an extraction artifact and never beats a
   * real one. `vmk_tiki`'s 0-byte `tiki.stage1.xml` shadowed the Jungle
   * Cruise's real stage and crashed the game entering Tiki.
   */
  const hasContent = (m: { kind?: string; imagePath?: string; text?: unknown } | null): boolean => {
    if (!m) return true;
    if (m.kind === "bitmap") return String(m.imagePath ?? "") !== "";
    if (m.kind === "text" || m.kind === "field") return String(m.text ?? "") !== "";
    return true;
  };
  var tExisting = meProp(_me, "pAllMemNumList")[tMemName];
  if (callNamed("voidp", tExisting)) {
  meProp(_me, "pAllMemNumList")[tMemName] = tMemberNum;
  } else {
  const tNewFull = hasContent(callNamed("member", tMemberNum) as { kind?: string; imagePath?: string; text?: unknown } | null);
  const tOldFull = hasContent(callNamed("member", tExisting) as { kind?: string; imagePath?: string; text?: unknown } | null);
  if ((tNewFull && !tOldFull) || (tNewFull === tOldFull && lingoTruthy(lingoBinary("lt", tMemberNum, tExisting)))) {
  meProp(_me, "pAllMemNumList")[tMemName] = tMemberNum;
  }
  }

  return tMemberNum;
}


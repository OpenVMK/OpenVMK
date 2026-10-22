// core.old.cct / CMgrResource / preIndexMembers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function preIndexMembers(_me: LingoMe, tCastNum: LingoValue) {
  if (callNamed("integerp", tCastNum)) {
  var tFirstCast = tCastNum;
  var tLastCast = tCastNum;
  } else {
  setMeProp(_me, "pAllMemNumList", new LingoPropList([]));
  callMethod("sort", meProp(_me, "pAllMemNumList"))
  tFirstCast = 1;
  tLastCast = theProperty("number of castLibs");
  }

  var tNameAlertFlag = callNamed("getIntVariable", "duplicate.name.alert");
  for (var tCastLib = tFirstCast; tCastLib <= tLastCast; ++tCastLib) {
  var tMemberCount = thePropOf(callNamed("castLib", tCastLib), "number of castMembers");
  for (var i = 1; i <= tMemberCount; ++i) {
  var tmember = callNamed("member", i, tCastLib);
  if (lingoBinary("gt", callNamed("length", tmember.name), 0)) {
  if (tNameAlertFlag) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pAllMemNumList")[tmember.name]))) {
  if (lingoBinary("eq", callMethod("getPos", meProp(_me, "pLegalDuplicates"), tmember.name), 0)) {
  if (lingoBinary("neq", meProp(_me, "pAllMemNumList")[tmember.name], tmember._number)) {
  var tMemA = callNamed("member", meProp(_me, "pAllMemNumList")[tmember.name]);
  var tMemB = tmember;
  if (lingoBinary("and", lingoBinary("neq", tMemA.name, ""), lingoBinary("neq", tMemB.name, ""))) {
  var tLibA = callNamed("castLib", tMemA.castLibNum).name;
  var tLibB = callNamed("castLib", tMemB.castLibNum).name;
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Duplicate member names:", tmember.name), "/"), tLibA), "/"), tLibB), symbol("preIndexMembers"))
  }

  }

  }

  }

  }

  /*
   * ⚠ HAND-CORRECTED: a duplicate NAME resolves to the LOWEST member number
   * THAT HAS ART.
   *
   * This unconditional set was LAST-WINS: a later same-named member overwrote an
   * earlier one, so an EMPTY duplicate shadowed the real art. `pAllMemNumList` is
   * what `getmemnum` reads and what rooms use to place sprites by MEMBER="name".
   * Lowest-wins alone broke both ways, because the empty duplicate can be EITHER
   * side of the real one:
   *   - Shipwreck `sunken_ship_bg`: real member 7, empty member 17 — lowest (7)
   *     is already right.
   *   - Nautilus `nautilus_bg`: empty members 187/202/231, real member 233 —
   *     lowest (187) is EMPTY and the whole submarine backdrop rendered BLACK.
   * The empties are an extraction artifact: upstream those duplicate BITD chunks
   * are nameless, so Director never sees them; our extractor named all four, so
   * we must skip the ones without a decoded image. Prefer a member with art, then
   * the lowest of those. (`CastLib.indexName` carries the same rule; both agree.)
   * See [[member-by-name-lowest-wins]], [[room-sound-wrong-cast-clobber]].
   */
  /*
   * ⚠ TEXT COUNTS TOO (2026-09-29): an EMPTY text member is the same artifact.
   * `vmk_tiki` (room cast 11 of the Jungle Cruise) carries 0-byte
   * `tiki.stage1/2/3.xml` placeholders that shadowed the real stages in
   * `vmk_junglecruise_stages` — `CStage.LoadXML` got "" ("Given XML document
   * is invalid!") and the game crashed entering Tiki.
   */
  const hasContent = (m: { kind?: string; imagePath?: string; text?: unknown } | null): boolean => {
    if (!m) return true;
    if (m.kind === "bitmap") return String(m.imagePath ?? "") !== "";
    if (m.kind === "text" || m.kind === "field") return String(m.text ?? "") !== "";
    return true;
  };
  var tPrev = meProp(_me, "pAllMemNumList")[tmember.name];
  if (lingoTruthy(callNamed("voidp", tPrev))) {
  meProp(_me, "pAllMemNumList")[tmember.name] = tmember._number;
  } else {
  const tPrevMem = callNamed("member", tPrev) as { kind?: string; imagePath?: string; text?: unknown } | null;
  const tMemArt = hasContent(tmember as { kind?: string; imagePath?: string; text?: unknown });
  const tPrevArt = hasContent(tPrevMem);
  if ((tMemArt && !tPrevArt)
    || (tMemArt === tPrevArt && Number(tmember._number) < Number(tPrev))) {
  meProp(_me, "pAllMemNumList")[tmember.name] = tmember._number;
  }
  }
  }

  }

  var tVarIndex = callNamed("getVariable", "props.index.field");
  if (lingoBinary("gt", callNamed("member", tVarIndex, tCastLib)._number, 0)) {
  callMethod("dump", callNamed("getVariableManager"), callNamed("member", tVarIndex, tCastLib)._number)
  }

  var tAliasIndex = callNamed("getVariable", "alias.index.field");
  if (lingoBinary("gt", callNamed("member", tAliasIndex, tCastLib)._number, 0)) {
  var tAliasList = callNamed("field", tAliasIndex, tCastLib);
  var tItemDeLim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "=");
  var t_iLineCount = tAliasList.line.count;
  for (var i = 1; i <= t_iLineCount; ++i) {
  var tLine = chunkOf(tAliasList, "line", i, 0);
  if (lingoBinary("gt", callNamed("length", tLine), 2)) {
  var tName = chunkOf(tLine, "item", 2, chunkCount(tLine, "item"));
  if (lingoBinary("eq", lastChunk(tName, "char"), "*")) {
  tName = tName.char.range(1, lingoBinary("sub", callNamed("length", tName), 1));
  var tNumber = meProp(_me, "pAllMemNumList")[tName];
  if (lingoBinary("gt", tNumber, 0)) {
  var tReplacingNum = -float(tNumber);
  } else {
  tReplacingNum = tNumber;
  }

  } else {
  tNumber = meProp(_me, "pAllMemNumList")[tName];
  tReplacingNum = tNumber;
  }

  if (lingoBinary("gt", tNumber, 0)) {
  var tMemName = chunkOf(tLine, "item", 1, 0);
  meProp(_me, "pAllMemNumList")[tMemName] = tReplacingNum;
  }

  }

  }

  setTheProperty("itemDelimiter", tItemDeLim);
  }

  var tClsIndex = callNamed("getVariable", "class.index.field");
  if (lingoBinary("gt", callNamed("member", tClsIndex, tCastLib)._number, 0)) {
  callMethod("dump", callNamed("getObject", symbol("classes")), callNamed("member", tClsIndex, tCastLib)._number)
  }

  }

  return 1;
}


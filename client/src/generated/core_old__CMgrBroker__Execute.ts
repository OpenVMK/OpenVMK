// core.old.cct / CMgrBroker / Execute

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Execute(_me: LingoMe, tMessage: LingoValue, tArgA: LingoValue, tArgB: LingoValue, tArgC: LingoValue) {
  var tList = _me.pItemList[tMessage];
  if (callNamed("voidp", tList)) {
  return 0;
  }

  for (var i = tList.count; i >= 1; --i) {
  var tID = callMethod("getPropAt", tList, i);
  var tMethod = tList[i];
  var tObject = callMethod("get", callNamed("getObjectManager"), tID);
  if (lingoBinary("eq", tObject, 0)) {
  callMethod("unregister", _me, tMessage, tID)
  continue;
  }

  /*
   * ⚠ HAND-CORRECTED — DIAGNOSTIC ONLY. Control flow is UNCHANGED: the error is
   * re-thrown, so a throwing subscriber still aborts the rest exactly as before.
   * ⚠ RE-APPLY THIS AFTER ANY REGENERATION of client/src/generated.
   *
   * This loop walks subscribers in REVERSE (`for i = count down to 1`, so the
   * LAST registered runs FIRST) and calls each with no guard. One that throws
   * therefore takes every remaining subscriber with it — and at `room_ready`
   * the list is
   *
   *   1 #room_interface … 8 AnimationManager  9 SoundTracker
   *   10 <room>handler_component  11 <room>handler_component
   *
   * so a fault in a ROOM HANDLER silently costs the room its ambience AND its
   * animations, with nothing in the log naming the culprit. MEASURED: tiki and
   * cambodian both came up silent and static this way, and finding the reason
   * cost most of a session precisely because the thrown message named only the
   * failing call (`LoadXML on number []`) and not the subscriber it came from.
   *
   * Naming the subscriber in the message is what makes this self-diagnosing —
   * the same reasoning as every other "the client reports its own errors" site.
   */
  try {
    callNamed("call", tMethod, tObject, tArgA, tArgB, tArgC)
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    const failure = new Error(
      `${detail}  [executeMessage(${String(tMessage)}) -> ${String(tID)}.${String(tMethod)}]`,
    );
    if (cause instanceof Error && cause.stack) failure.stack = cause.stack;
    throw failure;
  }
  }

  return 1;
}


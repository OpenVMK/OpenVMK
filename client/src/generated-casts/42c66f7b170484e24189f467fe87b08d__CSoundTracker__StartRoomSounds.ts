// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / StartRoomSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartRoomSounds(_me: LingoMe, a_sRoomName: LingoValue) {
  // HAND-CORRECTED (argument coercion only; handler body is verbatim VMK).
  // CSoundTracker.construct registers this handler against BOTH "LoadRoomSound"
  // and #room_ready, and VMK broadcasts LoadRoomSound from three places:
  //   CSoundStart.construct        -> executeMessage("LoadRoomSound", "main_street_")
  //   CLoadingWindow.DeleteWindow  -> executeMessage("LoadRoomSound")   [no arg]
  //   CLoadingWindow.StopLoadingSound -> executeMessage("LoadRoomSound") [no arg]
  // and room_ready as executeMessage("room_ready", m_rContext).
  // Only the first argument is a room-name PREFIX. The others are not names at
  // all, and Director handles that by itself: `VOID & "sound.xml"` is
  // "sound.xml", and an object stringifies to something like
  // `<offspring "CRoomContext" 2 3d0a1c>` which concatenates into a member name
  // that cannot exist. Either way the prefixed lookup misses and the handler
  // falls through to its generic `Sound.xml` / `Tracker.xml` branch — which is
  // exactly how the 129 sound casts that carry NO CSoundStart are meant to work.
  //
  // ⚠ DO NOT "HELPFULLY" REUSE `m_sRoomName` HERE. Tried it, and it played the
  // WRONG ROOM'S MUSIC: once Main Street had been visited the remembered
  // "main_street_" won every later room_ready, its sound cast was still
  // attached so `main_street_sound.xml` still resolved, and the Emporium came
  // up playing MS-ambience-mono-loop and MS-car with the tracker reporting
  // m_sRoomName "main_street_" and Main Street's 21 cues.
  if (typeof a_sRoomName !== "string") a_sRoomName = "";

  // ⚠ AND A CALL WITH NOTHING TO PARSE MUST NOT WIPE THE TIMELINE.
  //
  // The body below resets m_mpSoundData / m_mp_SoundProperties / m_mpEndTime
  // BEFORE it looks for a document, so a call that then finds neither
  // `<prefix>sound.xml` nor `Sound.xml` destroys a working timeline and puts
  // nothing back. Main Street hits exactly that: its sound cast is one of the
  // six carrying a `CSoundStart`, which broadcasts LoadRoomSound("main_street_")
  // when the cast attaches, and the room_ready that follows carries a
  // CRoomContext — no prefix — while the cast holds only
  // `main_street_sound.xml` and no generic `Sound.xml`. MEASURED: 21 cues and
  // endTime 60.2 replaced by 0 cues and VOID, leaving the already-started
  // ambience looping over a dead tracker.
  //
  // Nothing is lost by returning: the handler's whole effect is to reparse.
  if (
    !lingoTruthy(callNamed("memberExists", lingoBinary("join", a_sRoomName, "sound.xml")))
    && !lingoTruthy(callNamed("memberExists", "Sound.xml"))
    && !lingoTruthy(callNamed("memberExists", lingoBinary("join", lingoBinary("join", a_sRoomName, "Tracker"), ".xml")))
    && !lingoTruthy(callNamed("memberExists", "Tracker.xml"))
  ) {
    return 1;
  }
  if (lingoBinary("eq", meProp(_me, "m_iVolume"), 0)) {
  callMethod("StopRoomSounds", _me)
  } else {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_bFx"), 0), lingoBinary("eq", meProp(_me, "m_bMusic"), 0))) {
  callMethod("StopRoomSounds", _me)
  } else {
  setMeProp(_me, "m_TmrTracker", "trackerTimer");
  setMeProp(_me, "m_CurrentTime", float(0));
  setMeProp(_me, "m_PanCounter", 0);
  setMeProp(_me, "m_mpSoundData", new LingoPropList([]));
  setMeProp(_me, "m_mp_SoundProperties", new LingoPropList([]));
  setMeProp(_me, "m_mp_SndTypes", new LingoPropList([]));
  setMeProp(_me, "m_mpEndTime", undefined);
  setMeProp(_me, "m_arLoopChannels", undefined);
  setMeProp(_me, "m_sRoomName", a_sRoomName);
  if (callNamed("timeoutExists", meProp(_me, "m_TmrTracker"))) {
  callNamed("removeTimeout", meProp(_me, "m_TmrTracker"))
  }

  if (callNamed("memberExists", lingoBinary("join", a_sRoomName, "sound.xml"))) {
  callMethod("ParseSounds", _me, lingoBinary("join", a_sRoomName, "sound.xml"))
  } else {
  if (callNamed("memberExists", "Sound.xml")) {
  callMethod("ParseSounds", _me, "Sound.xml")
  }

  }

  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", a_sRoomName, "Tracker"), ".xml"))) {
  callMethod("parseTrackerData", _me, lingoBinary("join", lingoBinary("join", a_sRoomName, "Tracker"), ".xml"))
  } else {
  if (callNamed("memberExists", "Tracker.xml")) {
  callMethod("parseTrackerData", _me, "Tracker.xml")
  }

  }

  /*
   * ⚠ HAND-CORRECTED — DIAGNOSTIC ONLY, no behaviour change.
   * ⚠ RE-APPLY THIS AFTER ANY REGENERATION of client/src/generated-casts.
   *
   * A room is silent for several different reasons that all LOOK the same from
   * outside, and the tracker keeps no record of which one happened:
   *
   *   - this handler never ran at all              (m_sRoomName stays VOID)
   *   - it ran and the guard sent it home early    (documents not resolvable yet)
   *   - it parsed but found no cues                (0 sounds, 0 cue times)
   *   - it parsed fine and the members came back empty (see ParseSounds)
   *
   * MEASURED: the VMK Gallery ends with 2 sound properties and 1 cue time but an
   * EMPTY member, while Blue Bayou ends with 0 properties and a clock that never
   * advances — two different faults presenting identically as "no music".
   * Printing the outcome here is what tells them apart on the next room entry
   * instead of after the fact, when the state has already settled and lies.
   */
  var t_sTrace = lingoBinary("joinPad", "SNDTRACE sounds=", meProp(_me, "m_mp_SoundProperties").count);
  t_sTrace = lingoBinary("joinPad", t_sTrace, lingoBinary("joinPad", "cueTimes=", meProp(_me, "m_mpSoundData").count));
  t_sTrace = lingoBinary("joinPad", t_sTrace, lingoBinary("joinPad", "endTime=", meProp(_me, "m_mpEndTime")));
  callNamed("put", t_sTrace)

  }

  }

}


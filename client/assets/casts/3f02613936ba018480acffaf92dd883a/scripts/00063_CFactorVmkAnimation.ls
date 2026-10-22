-- Movie Script
property m_ar_rSounds
property m_ar_rEvents
property m_ar_rMarkers

on construct me
  m_ar_rSounds = [:]
  m_ar_rEvents = [:]
  return 1
end
on deconstruct me
  return 1
end
on setEvents me, t_ar_Events
  m_ar_rMarkers = [:]
  m_ar_rEvents = [:]
  repeat with i = 1 to t_ar_Events.count
    t_sFrame = t_ar_Events.getPropAt(i)
    t_sEvent = t_ar_Events[i]
    t_sCurrentEvent = t_sEvent.word[1]
    t_iEventNameLength = t_sCurrentEvent.length + 2
    case t_sCurrentEvent of
      "marker", "Marker", "MARKER":
        t_sName = t_sEvent.char[t_iEventNameLength..t_sEvent.length]
        m_ar_rMarkers[t_sName] = integer(t_sFrame)
      otherwise:
        m_ar_rEvents[t_sFrame] = t_sEvent

    end case
  end repeat
end
on setSounds me, t_ar_Sounds
  m_ar_rSounds = t_ar_Sounds
end
on gotomarker me, a_sMarkerName, i_offset
  t_iFrame = m_ar_rMarkers[a_sMarkerName]
  if integerp(t_iFrame) then
    me.getObject().SetParam("FRAMECOUNTER", t_iFrame)
    me.getObject().SetParam("ANIMATIONSTATE", #play)
  end if
end
on update me
  t_bState = me.getObject().GetParam("ANIMATIONSTATE")
  t_iFrameCounter = me.getObject().GetParam("FRAMECOUNTER")
  if t_bState = #play or t_bState = #freeze then
    me.PlaySound(t_iFrameCounter)
    me.playEvent(t_iFrameCounter)
    if t_iFrameCounter = me.getObject().GetParam("FRAMECOUNTER") then
      t_iFrameCounter = t_iFrameCounter + 1
    else
      t_iFrameCounter = me.getObject().GetParam("FRAMECOUNTER")
    end if
    t_iLastFrame = me.getObject().GetParam("LASTFRAME")
    if t_iFrameCounter > t_iLastFrame then
      t_iFrameCounter = 1
      if t_bState = #freeze then
        executeMessage(#animation_freezed, me.getObject().GetParam("ANIMATIONID"))
        me.getObject().SetParam("ANIMATIONSTATE", #stop)
      end if
    end if
    me.getObject().GetVisual().UpdateVisual()
    me.getObject().SetParam("FRAMECOUNTER", t_iFrameCounter)
  end if
end
on PlaySound me, t_iFrameCounter
  t_ar_CurrentSounds = m_ar_rSounds.getaProp(string(t_iFrameCounter))
  if listp(t_ar_CurrentSounds) then
    repeat with t_sCurrentSound in t_ar_CurrentSounds
      executeMessage("PlayFxSound", t_sCurrentSound)
    end repeat
  end if
end
on playEvent me, t_iFrameCounter
  t_sCurrentMarker = m_ar_rEvents.getaProp(string(t_iFrameCounter))
  if not voidp(t_sCurrentMarker) then
    t_sCurrentEvent = t_sCurrentMarker.word[1]
    t_iEventNameLength = t_sCurrentEvent.length + 2
    case t_sCurrentEvent of
      "stop", "Stop", "STOP":
        me.getObject().SetParam("FRAMECOUNTER", 1)
        me.getObject().SetParam("ANIMATIONSTATE", #stop)
        executeMessage(#animation_state_changed, #stop, me.getObject().GetParam("ANIMATIONID"))
      "pause", "Pause", "PAUSE":
        executeMessage(#animation_state_changed, #pause, me.getObject().GetParam("ANIMATIONID"))
        me.getObject().SetParam("ANIMATIONSTATE", #pause)
      "remove", "Remove", "REMOVE":
        t_sName = me.getObject().GetParam("ANIMATIONID")
        if getObject("AnimationManager") <> 0 then
          getObject("AnimationManager").RemoveAnimation(t_sName)
        end if
      "gotoframe", "GOTOFRAME", "GoToFrame", "goto", "GOTO", "Goto":
        t_sFrame = t_sCurrentMarker.char[t_iEventNameLength..t_sCurrentMarker.length]
        t_iFrame = integer(t_sFrame)
        if integerp(t_iFrame) then
          me.getObject().SetParam("FRAMECOUNTER", t_iFrame)
        else
          if stringp(t_sFrame) then
            me.gotomarker(t_sFrame)
          end if
        end if
      otherwise:
        executeMessage(t_sCurrentEvent)

    end case
  end if
end
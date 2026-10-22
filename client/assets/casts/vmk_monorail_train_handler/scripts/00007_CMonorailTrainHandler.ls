-- Script
property m_mp_PossibleStops
property m_currentStop

on construct me
  m_mp_PossibleStops = [20: "Main Street", 21: "Adventureland", 22: "Frontierland", 23: "Fantasyland", 24: "Tomorrowland", 92: "New Orleans Square"]
  m_currentStop = EMPTY
  me.regMsgList(1)
  if not variableExists("MonorailState") then
    createVariable("MonorailState", 1)
  end if
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on MonorailEvent me, a_rMsg
  tEvent = a_rMsg.connection.GetIntFrom()
  setVariable("MonorailState", tEvent)
  case tEvent of
    0:
      if me.getInterface().GetTrainMusicAllowed() then
        executeMessage("PlayInterfaceSound", "MRVO-allaboard")
      end if
      case m_currentStop of
        "Main Street":
          me.getInterface().playMusic("MR-music-1")
        "Adventureland":
          me.getInterface().playMusic("MR-music-2")
        "Frontierland":
          me.getInterface().playMusic("MR-music-3")
        "Fantasyland":
          me.getInterface().playMusic("MR-music-4")
        "Tomorrowland":
          me.getInterface().playMusic("MR-music-5")
        "New Orleans Square":
          me.getInterface().playMusic("MR-music-5")
        otherwise:
          put "Received monorail-event, type" && tEvent && "but we don't have a station" && m_currentStop
          me.getInterface().playMusic("MR-music-1")

      end case
      t_sText = "Stand clear of the doors"
      me.getInterface().displayText(t_sText)
      createTimeout(#executeOnce & the milliSeconds, 2000, #TrainLeave, me.getInterface().getID(), VOID, 1)
      createTimeout(#executeOnce & the milliSeconds + 1, 10000, #displayNextStop, me.getInterface().getID(), m_currentStop, 1)
    1:
      if m_currentStop = "New Orleans Square" then
        t_sText = m_currentStop & " $"
      else
        t_sText = m_currentStop & "  $"
      end if
      me.getInterface().displayText(t_sText)
      me.getInterface().TrainStop()
    2:
      me.getInterface().TrainBetweenStations()
    10:
      t_sText = "Now approaching:" && m_currentStop
      me.getInterface().displayText(t_sText)
      me.getInterface().TrainArrive()

  end case
  me.getInterface().m_bInited = 1
end
on NextMonorailStop me, a_rMsg
  t_stop = a_rMsg.connection.GetIntFrom()
  m_currentStop = m_mp_PossibleStops[string(t_stop)]
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2730, #MonorailEvent)
  tMsgs.setaProp(2731, #NextMonorailStop)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end
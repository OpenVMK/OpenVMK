-- Script
property m_mp_parameters
property m_mp_participants

on construct me
  m_mp_participants = [:]
  m_mp_parameters = [:]
  return 1
end
on deconstruct me
  repeat with tParticipant in m_mp_participants
    removeObject(tParticipant.getID())
  end repeat
  m_mp_participants = [:]
  m_mp_parameters = [:]
  return 1
end
on GetParticipants me
  return m_mp_participants
end
on GetParameterList me
  tOut = [:]
  repeat with i = 1 to m_mp_parameters.count
    tID = m_mp_parameters.getPropAt(i)
    tEntry = m_mp_parameters.getaProp(tID)
    tOut.setaProp(tID, tEntry.description)
  end repeat
  return tOut
end
on GetParameterValue me, i_ID
  tEntry = m_mp_parameters.getaProp(i_ID)
  if not voidp(tEntry) then
    return the value of tEntry
  else
    return VOID
  end if
end
on GetParameterDescription me, i_ID
  tEntry = m_mp_parameters.getaProp(i_ID)
  if not voidp(tEntry) then
    return the description of tEntry
  else
    return VOID
  end if
end
on SetParameter me, i_ID, i_value, i_sDescription
  tEntry = m_mp_parameters.getaProp(i_ID)
  if voidp(i_sDescription) then
    tOldDescription = EMPTY
    if not voidp(tEntry) then
      tOldDescription = tEntry.description
    end if
    tEntry = [#value: i_value, #description: tOldDescription]
  else
    tEntry = [#value: i_value, #description: i_sDescription]
  end if
  m_mp_parameters.setaProp(i_ID, tEntry)
end
on UpdateParameters me
  tGameID = m_mp_parameters.getaProp("GameID")
  getThread("lobby").getHandler().SendSetGameData(tGameID.value, m_mp_parameters)
end
on ParticipantExists me, a_iParticipantRef
  return not voidp(m_mp_participants.getaProp(a_iParticipantRef))
end
on GetParticipant me, a_iParticipantRef
  return m_mp_participants.getaProp(a_iParticipantRef)
end
on AddParticipant me, i_iParticipantRef
  t_rParticipant = createObject("Game" & the milliSeconds & "Participant:" & i_iParticipantRef, "CGameParticipantContainer")
  if t_rParticipant = 0 then
    return VOID
  end if
  m_mp_participants.addProp(i_iParticipantRef, t_rParticipant)
  return m_mp_participants.getaProp(i_iParticipantRef)
end
on RemoveParticipant me, i_iParticipantRef
  tParticipant = m_mp_participants.getaProp(i_iParticipantRef)
  if not voidp(tParticipant) then
    m_mp_participants.deleteProp(i_iParticipantRef)
    removeObject(tParticipant.getID())
  end if
end
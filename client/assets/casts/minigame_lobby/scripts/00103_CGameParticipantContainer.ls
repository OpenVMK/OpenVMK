-- Script
property m_mp_parameters

on construct me
  m_mp_parameters = [:]
  return 1
end
on deconstruct me
  m_mp_parameters = [:]
  return 1
end
on GetParameterList me
  tOut = [:]
  repeat with i = 1 to m_mp_parameters.count
    tID = m_mp_parameters.getPropAt(i)
    tEntry = m_mp_parameters[i]
    tOut.setaProp(tID, tEntry)
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
    tOldDesc = EMPTY
    if not voidp(tEntry) then
      tOldDesc = tEntry.description
    end if
    tEntry = [#value: i_value, #description: tOldDesc]
  else
    tEntry = [#value: i_value, #description: i_sDescription]
  end if
  m_mp_parameters.setaProp(i_ID, tEntry)
end
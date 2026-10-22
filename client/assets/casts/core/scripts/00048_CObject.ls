-- Script
property id
property valid
property delays

on construct me
  valid = 1
  delays = [:]
  return 1
end
on deconstruct me
  if count(delays) > 0 then
    repeat with i = 1 to count(delays)
      timeout(delays.getPropAt(i)).forget()
    end repeat
  end if
  delays = [:]
  return 1
end
on setID this, a_sID
  if voidp(id) then
    id = a_sID
  else
    error(this, "Attempted to redefine object's ID:" & RETURN & this.id && "->" && a_sID, #setID)
  end if
end
on getID this
  return id
end
on delay me, tTime, tMethod, tArgument
  if not integerp(tTime) then
    return error(me, "Integer expected:" && tTime, #delay)
  end if
  if not symbolp(tMethod) then
    return error(me, "Symbol expected:" && tMethod, #delay)
  end if
  tUniqueId = "Delay" && me.getID() && the milliSeconds
  timeout(tUniqueId).new(tTime, #executeDelay, me)
  tList = [#method: tMethod, #argument: tArgument]
  me.delays[tUniqueId] = tList
  return tUniqueId
end
on cancel this, a_sDelayID
  if voidp(this.delays[a_sDelayID]) then
    return 0
  end if
  timeout(a_sDelayID).forget()
  return the delays of this.deleteProp(a_sDelayID)
end
on getRefCount this
  return integer(string(this).word[the count of the word of string(param(1)) - 1]) - 3
end
on print this
  put this
end
on executeDelay this, a_rTimeout
  t_sID = a_rTimeout.name
  t_rTask = delays[t_sID]
  this.cancel(t_sID)
  call(t_rTask[#method], this, t_rTask[#argument])
end
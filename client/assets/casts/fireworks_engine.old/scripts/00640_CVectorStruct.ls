-- Script
property ancestor

on new me, a_ar_list
  me.ancestor = []
  if listp(a_ar_list) then
    repeat with i = 1 to a_ar_list.count
      me.push(a_ar_list[i])
    end repeat
  end if
  return me
end
on deconstruct me
  me.ancestor = []
  me = VOID
  return me
end
on top me
  if not me.isEmpty() then
    return me[the count of me]
  end if
  return VOID
end
on pop me
  if not me.isEmpty() then
    t_rdata = me[me.count]
    me.deleteAt(me.count)
    return t_rdata
  end if
  return VOID
end
on push me, t_rdata
  me.append(t_rdata)
end
on isEmpty me
  return the count of me = 0
end
on units me
  return the count of me
end
on Shift me
  if not me.isEmpty() then
    t_rdata = me[1]
    me.deleteAt(1)
    return t_rdata
  end if
  return VOID
end
on unshift me, t_rdata
  me.addAt(1, t_rdata)
  return the count of me
end
on rotateClockwise me
  me.push(me.Shift())
end
on rotateAntiClockwise me
  me.unshift(me.pop())
end
on flush me
  me.deleteAll()
end
on toString me
  return the ancestor of me
end
-- Script
on construct me
  return 1
end
on deconstruct me
  return 1
end
on IsRemovable me
  if me.getObject().GetParam("Age") > 10 then
    return 1
  else
    return 0
  end if
end
on update me
  tAge = me.getObject().GetParam("Age")
  tAge = tAge + 1
  me.getObject().SetParam("Age", tAge)
end
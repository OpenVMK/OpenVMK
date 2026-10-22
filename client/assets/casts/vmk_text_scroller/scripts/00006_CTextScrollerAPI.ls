-- Behavior
on createTextScroller
  if the paramCount < 1 then
    return 0
  end if
  t_sContent = param(1)
  return getThread("TextScroller").getComponent().CreateNewTextScroller(t_sContent)
end
on RemoveFontPage t_sID
end
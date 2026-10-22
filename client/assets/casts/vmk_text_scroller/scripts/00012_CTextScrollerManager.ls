-- Parent Script
property m_pTextScrollers

on construct me
  m_pTextScrollers = [:]
  return 1
end
on CreateNewTextScroller me, t_Content
  tTextScroller = createObject(getUniqueID(), "CTextScroller")
  if tTextScroller <> 0 then
    tTextScroller.Init(t_Content)
  end if
  return tTextScroller
end
on deconstruct me
  return 1
end
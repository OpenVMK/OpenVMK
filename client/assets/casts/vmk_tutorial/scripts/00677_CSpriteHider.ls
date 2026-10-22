-- Script
property m_ar_hideables

on construct me
  m_ar_hideables = []
  return 1
end
on deconstruct me
  return 1
end
on AddHideable me, i_iChannel
  m_ar_hideables.append(i_iChannel)
end
on RemoveHideable me, i_iChannel
  m_ar_hideables.deleteOne(i_iChannel)
end
on ClearHideables me
  m_ar_hideables = []
end
on HideSprites me
  repeat with tChannel in m_ar_hideables
    sprite(tChannel).visible = 0
  end repeat
end
on ShowSprites me
  repeat with tChannel in m_ar_hideables
    sprite(tChannel).visible = 1
  end repeat
end
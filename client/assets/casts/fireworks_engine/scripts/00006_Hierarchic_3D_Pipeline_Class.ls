-- Behavior
property m_pView

on new me
  return me
end
on setView me, p_pView
  m_pView = p_pView
end
on getView me
  return m_pView
end
on Process me, p_pRootObject
  t_mp_Output = [:]
  t_rootMtx = new(script("Matrix Class"), 4, 4)
  t_rootMtx.loadIdentity()
  p_pRootObject.transformMeAndChildren(t_mp_Output, t_rootMtx)
  t_mp_projected = [:]
  repeat with i = 1 to t_mp_Output.count()
    t_sObjectName = t_mp_Output.getPropAt(i)
    t_ar_worldCoordinates = t_mp_Output[t_sObjectName]
    t_ar_projected = []
    t_ar_viewSpace = []
    if t_ar_worldCoordinates.count() > 0 then
      t_ar_viewSpace.addAt(t_ar_worldCoordinates.count(), 0)
    end if
    repeat with j = 1 to t_ar_worldCoordinates.count()
      t_ar_viewSpace[j] = m_pView.transformToViewSpace(t_ar_worldCoordinates[j])
      if m_pView.testClip(t_ar_viewSpace[j]) then
        t_ar_projected.append(m_pView.transformToProjected(t_ar_viewSpace[j]))
      end if
    end repeat
    t_mp_projected[t_sObjectName] = t_ar_projected
  end repeat
  return t_mp_projected
end
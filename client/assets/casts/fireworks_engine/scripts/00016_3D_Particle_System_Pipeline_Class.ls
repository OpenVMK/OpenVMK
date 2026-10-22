-- Script
property view

on new me
  view = script("Simple 3D View Class").new()
  return me
end
on setView me, t_view
  view = t_view
end
on getView me
  return view
end
on Process me, t_data
  t_lOutput = []
  repeat with i = 1 to t_data.count()
    t_viewSpace = view.transformToViewSpace(t_data[i].getPosition())
    if view.testClip(t_viewSpace) then
      t_lOutput.append([t_data[i].getSpriteRef(), view.transformToProjected(t_viewSpace)])
    end if
  end repeat
  return t_lOutput
end
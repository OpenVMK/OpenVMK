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
  repeat with tVertex in t_data
    t_viewSpace = view.transformToViewSpace(tVertex)
    if view.testClip(t_viewSpace) then
      t_lOutput.append(view.transformToProjected(t_viewSpace))
    end if
  end repeat
  return t_lOutput
end
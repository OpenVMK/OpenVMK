-- Score Script
property viewMatrix
property fViewTheta
property fViewOmega
property fViewMu
property fViewNearClip
property fViewFarClip
property fProjectionPD

on new me, a, b, mu, ppd
  if not ilk(a, #number) or not ilk(b, #number) or not ilk(mu, #number) or not ilk(ppd, #number) then
    fViewTheta = 0.0
    fViewOmega = 0.0
    fViewMu = 10.0
    fProjectionPD = 500.0
    fViewNearClip = 1.32499992847443
    fViewFarClip = 200.0
  else
    fViewTheta = a
    fViewOmega = b
    fViewMu = mu
    fProjectionPD = ppd
    fViewNearClip = 1.32499992847443
    fViewFarClip = 200.0
  end if
  viewMatrix = me.buildViewMatrix(fViewTheta, fViewOmega, fViewMu)
  return me
end
on setViewplaneDistance me, u
  fViewMu = u
  viewMatrix = me.buildViewMatrix(fViewTheta, fViewOmega, fViewMu)
end
on setViewAngle me, a, b
  fViewTheta = a
  fViewOmega = b
  viewMatrix = me.buildViewMatrix(fViewTheta, fViewOmega, fViewMu)
end
on setNearClipDistance me, d
  fViewNearClip = d
end
on setFarClipDistance me, d
  fViewFarClip = d
end
on transformToViewSpace me, t_vector
  return viewMatrix.transform(t_vector)
end
on transformToProjected me, t_vector
  if t_vector.z = 0 then
    put "3D View Class : transformToProjected() : can't handle z = 0, please reset near clipping plane to > 0"
    return VOID
  end if
  return vector(the x of t_vector / (the z of t_vector / fProjectionPD), the y of t_vector / (the z of t_vector / fProjectionPD), the z of t_vector)
end
on testClip me, t_vector
  if t_vector.z < fViewNearClip or t_vector.z > fViewFarClip then
    return 0
  else
    return 1
  end if
end
on buildViewMatrix me, theta, omega, mu
  t_sinTheta = sin(theta)
  t_cosTheta = cos(theta)
  t_sinOmega = sin(omega)
  t_cosOmega = cos(omega)
  t_matrixData = []
  t_matrixData[1] = [-t_sinTheta, -t_cosTheta * t_cosOmega, -t_cosTheta * t_sinOmega, 0]
  t_matrixData[2] = [t_cosTheta, -t_sinTheta * t_cosOmega, -t_sinTheta * t_sinOmega, 0]
  t_matrixData[3] = [0, t_sinTheta, -t_cosOmega, 0]
  t_matrixData[4] = [0, 0, mu, 1]
  t_viewMatrix = script("Matrix Class").new(4, 4, t_matrixData)
  t_viewMatrix.orthonormalize(#right)
  return t_viewMatrix
end
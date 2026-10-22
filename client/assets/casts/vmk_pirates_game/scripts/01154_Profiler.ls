-- Behavior
global g_profShipFactorAcc
global g_profCannonballFactorAcc
global g_profCloudFactorAcc
global g_profShipVisualizerAcc
global g_profCannonballVisualizerAcc
global g_profCloudVisualizerAcc
global g_profComponent
global g_profInterface
global g_profShipFactor
global g_profCannonballFactor
global g_profCloudFactor
global g_profShipVisualizer
global g_profCannonballVisualizer
global g_profCloudVisualizer
global g_profCollisionAcc
global g_profCollision

on ProfilerReset
  g_profShipFactor = g_profShipFactorAcc
  g_profCannonballFactor = g_profCannonballFactorAcc
  g_profCloudFactor = g_profCloudFactorAcc
  g_profShipVisualizer = g_profShipVisualizerAcc
  g_profCannonballVisualizer = g_profCannonballVisualizerAcc
  g_profCloudVisualizer = g_profCloudVisualizerAcc
  g_profCollision = g_profCollisionAcc
  g_profShipFactorAcc = 0
  g_profCannonballFactorAcc = 0
  g_profCloudFactorAcc = 0
  g_profShipVisualizerAcc = 0
  g_profCannonballVisualizerAcc = 0
  g_profCloudVisualizerAcc = 0
  g_profCollisionAcc = 0
end
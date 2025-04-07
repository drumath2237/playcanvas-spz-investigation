import type { GaussianCloud } from "@spz-loader/core"
import {
  type GraphicsDevice,
  GSplatData, GSplatResource
} from "playcanvas"

const parse = (gs: GaussianCloud, device: GraphicsDevice) => {
  const f32arr = () => new Float32Array(gs.numPoints)

  const sPos = [f32arr(), f32arr(), f32arr()]
  const sCol = [f32arr(), f32arr(), f32arr(), f32arr()]
  const sScale = [f32arr(), f32arr(), f32arr(),]
  const sRot = [f32arr(), f32arr(), f32arr(), f32arr(),]

  for (let i = 0; i < gs.numPoints; i++) {
    sPos[0][i] = gs.positions[i * 3 + 0]
    sPos[1][i] = gs.positions[i * 3 + 1]
    sPos[2][i] = gs.positions[i * 3 + 2]

    sCol[0][i] = gs.colors[i * 3 + 0]
    sCol[1][i] = gs.colors[i * 3 + 1]
    sCol[2][i] = gs.colors[i * 3 + 2]
    sCol[3][i] = gs.alphas[i]

    sScale[0][i] = gs.scales[i * 3 + 0]
    sScale[1][i] = gs.scales[i * 3 + 1]
    sScale[2][i] = gs.scales[i * 3 + 2]

    sRot[0][i] = gs.rotations[i * 4 + 0]
    sRot[1][i] = gs.rotations[i * 4 + 1]
    sRot[2][i] = gs.rotations[i * 4 + 2]
    sRot[3][i] = gs.rotations[i * 4 + 3]
  }

  const gsData = new GSplatData([{
    name: "vertex",
    count: gs.numPoints,
    properties: [
      {
        name: "x",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sPos[0]
      },
      {
        name: "y",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sPos[1]
      },
      {
        name: "z",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sPos[2]
      },
      {
        name: "f_dc_0",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sCol[0]
      },
      {
        name: "f_dc_1",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sCol[1]
      },
      {
        name: "f_dc_2",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sCol[2]
      },
      {
        name: "opacity",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sCol[3]
      },
      {
        name: "scale_0",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sScale[0]
      },
      {
        name: "scale_1",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sScale[1]
      },
      {
        name: "scale_2",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sScale[2]
      },
      {
        name: "rot_0",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sRot[0]
      },
      {
        name: "rot_1",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sRot[1]
      },
      {
        name: "rot_2",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sRot[2]
      },
      {
        name: "rot_3",
        type: "float",
        byteSize: Float32Array.BYTES_PER_ELEMENT,
        storage: sRot[3]
      },
    ]
  }])

  const gsResource = new GSplatResource(device, gsData, [])
  return gsResource
}

export { parse }
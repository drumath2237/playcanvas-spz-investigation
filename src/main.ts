import "./style.css";

import {
  Application,
  Entity,
  Color,
  FILLMODE_FILL_WINDOW,
  RESOLUTION_AUTO
} from 'playcanvas';

// @ts-ignore
import { CameraControls } from "playcanvas/scripts/esm/camera-controls.mjs"

import { loadSpz } from "@spz-loader/core"

import splatUrl from "../assets/pizza.spz?url"
import { parse } from "./parse";

const main = async () => {

  const canvas = document.querySelector<HTMLCanvasElement>('#renderCanvas');
  if (!canvas) {
    throw new Error("Canvas element with id 'renderCanvas' not found");
  }

  const app = new Application(canvas, {
    graphicsDeviceOptions: {
      alpha: false
    }
  });
  app.start();

  app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(RESOLUTION_AUTO);
  window.addEventListener('resize', () => app.resizeCanvas());

  const camera = new Entity('camera');
  camera.addComponent('camera', {
    clearColor: new Color(0.2, 0.2, 0.2)
  });
  camera.translate(0, 0.3, 0.7);
  camera.addComponent("script")
  camera.script?.create(CameraControls)
  app.root.addChild(camera);

  // const light = new Entity('light');
  // light.addComponent('light', {
  //   type: 'directional',
  // });
  // light.setEulerAngles(15, 30, 0);
  // app.root.addChild(light);

  // const box = new Entity('cube');
  // box.addComponent('model', {
  //   type: 'box'
  // });
  // app.root.addChild(box);

  const spzBuffer = await fetch(splatUrl).then(res => res.arrayBuffer())
  const gsCloud = await loadSpz(new Uint8Array(spzBuffer), { colorScaleFactor: 1.0 })
  const resource = parse(gsCloud, app.graphicsDevice)
  const spzEntity = resource.instantiate()
  spzEntity.rotate(180, 0, 0)
  app.root.addChild(spzEntity)

}

main()
import { Application } from 'pixi.js';
import { useAdvancedParticles } from './useAdvancedParticles.js';

/*
  usePixiApp
  - 目的是包装 Pixi `Application` 的创建与销毁，并初始化 `useAdvancedParticles` 粒子系统。
  - init(container): 异步初始化 Pixi，并将 canvas 挂载到传入的 DOM 容器上。
      返回对象包含 `morphToShapes` 控制函数用于触发粒子变形。
  - destroy(): 销毁粒子系统与 Pixi 实例，清理资源。
*/

let app = null;
let particles = null;

export function usePixiApp() {
  // 在 init 后将被赋值为 particles.morphToShapes，供外部触发粒子变形
  let exposedMorphToShapes = null;

  const init = async (container) => {
    if (app) return { morphToShapes: exposedMorphToShapes };

    app = new Application();
    await app.init({
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundAlpha: 0,
      resizeTo: container,
      antialias: true,
      preference: 'webgl',
    });

    container.appendChild(app.canvas);

    // 初始化并启动高级粒子系统（内部基于 app.screen 进行布局）
    particles = useAdvancedParticles(app);
    particles.init();

    exposedMorphToShapes = particles.morphToShapes;
    return { morphToShapes: exposedMorphToShapes };
  };

  const destroy = () => {
    if (particles) { particles.destroy(); particles = null; }
    if (app) { app.destroy(true, { children: true, texture: true, basePath: true }); app = null; }
    exposedMorphToShapes = null;
  };

  return { init, destroy };
}

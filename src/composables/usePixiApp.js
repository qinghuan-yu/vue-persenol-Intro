import { Application, Graphics } from 'pixi.js';

export function usePixiApp() {
  let app;
  const particles = [];
  const graphics = new Graphics();
  
  // --- 参数配置 ---
  const PARTICLE_COUNT = 300;        
  const CONNECTION_DISTANCE = 180;   
  const LINE_COLOR = 0x61b1d6;       
  const SCREEN_PADDING = 150; 
  
  // 新增：渐显速度 (0.01 代表每帧增加 1% 透明度，约 1.5秒完全显示)
  const FADE_IN_SPEED = 0.015; 

  const COLOR_ACCENT = 0x61b1d6; 
  const COLOR_DARK_1 = 0x333333;
  const COLOR_DARK_2 = 0x555555;

  class Particle {
    constructor(w, h) {
      this.init(w, h, true); // true = 首次初始化
    }

    init(w, h, initial = false) {
      // 1. 运动属性
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      
      // 2. 颜色属性
      const rand = Math.random();
      if (rand > 0.9) {
        this.baseColor = COLOR_ACCENT;
        this.baseAlpha = 0.9;
      } else if (rand > 0.6) {
        this.baseColor = COLOR_DARK_1;
        this.baseAlpha = 0.5;
      } else {
        this.baseColor = COLOR_DARK_2;
        this.baseAlpha = 0.4;
      }

      // 3. 位置与渐显状态
      this.x = Math.random() * w;
      this.y = Math.random() * h;

      if (initial) {
        // 首次加载：直接完全显示，避免开局黑屏
        this.fadeInFactor = 1;
      } else {
        // 后续重生：从 0 开始慢慢显现
        this.fadeInFactor = 0;
      }

      this.currentAlpha = 0;
    }

    update(w, h) {
      this.x += this.vx;
      this.y += this.vy;

      // --- A. 渐显逻辑 (Fade In) ---
      if (this.fadeInFactor < 1) {
        this.fadeInFactor += FADE_IN_SPEED;
        if (this.fadeInFactor > 1) this.fadeInFactor = 1;
      }

      // --- B. 边界检查与重置 (Respawn) ---
      const isDead = 
        this.x < -SCREEN_PADDING || 
        this.x > w + SCREEN_PADDING || 
        this.y < -SCREEN_PADDING || 
        this.y > h + SCREEN_PADDING;

      if (isDead) {
        this.init(w, h, false); // 重生，initial = false
        return;
      }

      // --- C. 边界渐隐逻辑 (Fade Out at Edges) ---
      let edgeFadeFactor = 1;

      if (this.x < 0) edgeFadeFactor = Math.min(edgeFadeFactor, 1 - Math.abs(this.x) / SCREEN_PADDING);
      else if (this.x > w) edgeFadeFactor = Math.min(edgeFadeFactor, 1 - (this.x - w) / SCREEN_PADDING);

      if (this.y < 0) edgeFadeFactor = Math.min(edgeFadeFactor, 1 - Math.abs(this.y) / SCREEN_PADDING);
      else if (this.y > h) edgeFadeFactor = Math.min(edgeFadeFactor, 1 - (this.y - h) / SCREEN_PADDING);

      // --- D. 综合计算最终透明度 ---
      // 最终Alpha = 基础Alpha * 边缘渐隐(FadeOut) * 出生渐显(FadeIn)
      this.currentAlpha = this.baseAlpha * edgeFadeFactor * this.fadeInFactor;
    }
  }

  function createParticles(width, height) {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(width, height));
    }
  }

  function animate() {
    if (!app || !app.renderer) return;
    
    graphics.clear();
    const w = app.screen.width;
    const h = app.screen.height;

    // 1. 绘制粒子
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update(w, h);

      if (p.currentAlpha <= 0.01) continue;

      graphics.circle(p.x, p.y, p.radius)
              .fill({ color: p.baseColor, alpha: p.currentAlpha });
    }

    // 2. 绘制连线
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      if (p1.currentAlpha <= 0.01) continue;

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        if (p2.currentAlpha <= 0.01) continue;
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        
        if (Math.abs(dx) > CONNECTION_DISTANCE || Math.abs(dy) > CONNECTION_DISTANCE) continue;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const distAlpha = 1 - (dist / CONNECTION_DISTANCE);
          
          // 连线透明度也受两端粒子的渐显状态影响
          const finalAlpha = distAlpha * Math.min(p1.currentAlpha, p2.currentAlpha);

          if (finalAlpha > 0.05) {
             graphics.moveTo(p1.x, p1.y)
                     .lineTo(p2.x, p2.y)
                     .stroke({ 
                        width: 1, 
                        color: LINE_COLOR, 
                        alpha: finalAlpha * 0.8 
                     });
          }
        }
      }
    }
  }

  const init = async (container) => {
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
    app.stage.addChild(graphics);

    createParticles(app.screen.width, app.screen.height);
    
    app.renderer.on('resize', () => {
       createParticles(app.screen.width, app.screen.height);
    });

    app.ticker.add(animate);
  };

  const destroy = () => {
    if (app) {
      app.destroy(true, { children: true, texture: true, basePath: true });
    }
  };

  return {
    init,
    destroy,
  };
}
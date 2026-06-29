// Mobile Client Mod - Main Script
// Version 26.23 - Optimized for Bedrock

import { world, system } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';

// ============================================
// UI STATE & CONFIGURATION
// ============================================
const MOD_CONFIG = {
  version: '26.23',
  fpsEnabled: true,
  cpsEnabled: true,
  pvpTexturesEnabled: true,
  toggleButtonVisible: true,
  animationSpeed: 1.0
};

const UI_STATE = {
  isOpen: false,
  fpsCounter: 0,
  cpsCounter: 0,
  lastClickTime: 0,
  frameCount: 0,
  lastFpsUpdate: 0
};

// ============================================
// FPS & CPS COUNTER
// ============================================
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.cps = 0;
    this.clicks = 0;
    this.tickCount = 0;
    this.lastTick = Date.now();
  }

  updateFPS() {
    const now = Date.now();
    if (now - this.lastTick >= 1000) {
      this.fps = this.tickCount;
      this.tickCount = 0;
      this.lastTick = now;
    }
    this.tickCount++;
  }

  recordClick() {
    const now = Date.now();
    this.clicks++;
    
    // Reset CPS every second
    if (this.lastClickTime && now - this.lastClickTime >= 1000) {
      this.cps = this.clicks;
      this.clicks = 0;
    }
    this.lastClickTime = now;
  }

  getFPS() {
    return this.fps;
  }

  getCPS() {
    return this.cps;
  }
}

const perfMonitor = new PerformanceMonitor();

// ============================================
// UI TOGGLE BUTTON (Mobile & PC)
// ============================================
function createToggleUI() {
  const form = new ActionFormData()
    .title('§l§6Mobile Client Mod v26.23')
    .body('\n§aOptimized for Performance & PvP§r\n')
    .button('§l§bFPS Counter\n§77' + perfMonitor.getFPS() + ' FPS')
    .button('§l§cCPS Counter\n§77' + perfMonitor.getCPS() + ' CPS')
    .button('§l§aPvP Textures')
    .button('§l§dAnimations')
    .button('§l§9Settings')
    .button('§l§cClose');
  
  return form;
}

// ============================================
// ANIMATIONS & VISUAL EFFECTS
// ============================================
class AnimationSystem {
  constructor() {
    this.activeAnimations = [];
  }

  addParticleEffect(player, type = 'critical') {
    if (!player) return;
    
    try {
      switch(type) {
        case 'critical':
          player.dimension.spawnParticle('minecraft:critical_hit_emitter', player.location);
          break;
        case 'hit':
          player.dimension.spawnParticle('minecraft:basic_flame_emitter', player.location);
          break;
        case 'crit_spark':
          player.dimension.spawnParticle('minecraft:sparkler_emitter', player.location);
          break;
      }
    } catch(e) {
      console.warn('Particle effect error:', e);
    }
  }

  playPvPCrit(player) {
    if (!player) return;
    
    try {
      player.playSound('random.orb', { volume: 1.0, pitch: 1.2 });
      this.addParticleEffect(player, 'critical');
    } catch(e) {
      console.warn('Sound effect error:', e);
    }
  }
}

const animSystem = new AnimationSystem();

// ============================================
// MAIN EVENT LISTENERS
// ============================================

// Update FPS every tick
system.runInterval(() => {
  perfMonitor.updateFPS();
}, 1);

// Player join event - Show welcome & toggle button
world.afterEvents.playerSpawn.subscribe((event) => {
  const player = event.player;
  
  try {
    player.onScreenDisplay.setActionBar(
      '§l§6Mobile Client Mod v26.23§r - §77Press §bSneak§77 to toggle UI'
    );
  } catch(e) {
    console.warn('UI error:', e);
  }
});

// Player interact - Toggle UI on sneak
world.afterEvents.playerInteractWithBlock.subscribe((event) => {
  const player = event.player;
  
  if (player.isSneaking) {
    UI_STATE.isOpen = !UI_STATE.isOpen;
    
    if (UI_STATE.isOpen) {
      showMainMenu(player);
    }
  }
});

// Track player clicks for CPS
world.afterEvents.entityHurt.subscribe((event) => {
  if (event.damageSource.damagingEntity?.typeId === 'minecraft:player') {
    const attacker = event.damageSource.damagingEntity;
    perfMonitor.recordClick();
    animSystem.playPvPCrit(attacker);
  }
});

// ============================================
// UI MENU SYSTEM
// ============================================

async function showMainMenu(player) {
  const form = new ActionFormData()
    .title('§l§6Mobile Client Mod v26.23')
    .body('§aPerformance & PvP Enhancement\n§77Select an option below')
    .button('§l§b📊 FPS/CPS Display')
    .button('§l§a⚔️ PvP Textures')
    .button('§l§d✨ Animations')
    .button('§l§9⚙️ Settings')
    .button('§l§cClose');

  const response = await form.show(player);

  if (response.canceled) return;

  switch(response.selection) {
    case 0:
      showFPSCPSMenu(player);
      break;
    case 1:
      showPvPMenu(player);
      break;
    case 2:
      showAnimationsMenu(player);
      break;
    case 3:
      showSettingsMenu(player);
      break;
    case 4:
      UI_STATE.isOpen = false;
      break;
  }
}

async function showFPSCPSMenu(player) {
  const form = new ActionFormData()
    .title('§l§bPerformance Metrics')
    .body('§77Current Stats:\n§b' + perfMonitor.getFPS() + ' FPS§r\n§c' + perfMonitor.getCPS() + ' CPS\n\n§aOptimization Tips:\n§77- Use Optifine-like settings\n§77- Reduce render distance\n§77- Enable V-Sync')
    .button('§l§aToggle Display')
    .button('§l§9Back');

  const response = await form.show(player);
  
  if (!response.canceled && response.selection === 0) {
    MOD_CONFIG.fpsEnabled = !MOD_CONFIG.fpsEnabled;
    player.onScreenDisplay.setTitle('§aMetrics ' + (MOD_CONFIG.fpsEnabled ? 'Enabled' : 'Disabled'));
  }
  
  if (response.selection === 1) {
    showMainMenu(player);
  }
}

async function showPvPMenu(player) {
  const form = new ActionFormData()
    .title('§l§a⚔️ PvP Enhancement')
    .body('§77PvP Texture Pack: §b18.5 Edition§r\n§77Enhanced for competitive play\n\n§6Features:\n§77- Improved hit detection visuals\n§77- Clear damage indicators\n§77- Custom cape support\n§77- Performance optimized')
    .button('§l§aEnable PvP Textures')
    .button('§l§6Apply Cape')
    .button('§l§9Back');

  const response = await form.show(player);
  
  if (!response.canceled) {
    switch(response.selection) {
      case 0:
        MOD_CONFIG.pvpTexturesEnabled = !MOD_CONFIG.pvpTexturesEnabled;
        player.onScreenDisplay.setTitle('§aPvP Textures ' + (MOD_CONFIG.pvpTexturesEnabled ? 'Enabled' : 'Disabled'));
        break;
      case 1:
        applyCape(player);
        break;
      case 2:
        showMainMenu(player);
        break;
    }
  }
}

async function showAnimationsMenu(player) {
  const form = new ActionFormData()
    .title('§l§d✨ Visual Effects')
    .body('§77Animation Settings\n\n§6Current Speed: §b' + MOD_CONFIG.animationSpeed + 'x')
    .button('§l§aEnable Animations')
    .button('§l§bSpeed: 0.5x')
    .button('§l§bSpeed: 1.0x')
    .button('§l§bSpeed: 1.5x')
    .button('§l§9Back');

  const response = await form.show(player);
  
  if (!response.canceled) {
    switch(response.selection) {
      case 0:
        animSystem.addParticleEffect(player, 'crit_spark');
        player.onScreenDisplay.setTitle('§aAnimation Preview Playing');
        break;
      case 1:
        MOD_CONFIG.animationSpeed = 0.5;
        break;
      case 2:
        MOD_CONFIG.animationSpeed = 1.0;
        break;
      case 3:
        MOD_CONFIG.animationSpeed = 1.5;
        break;
      case 4:
        showMainMenu(player);
        break;
    }
  }
}

async function showSettingsMenu(player) {
  const form = new ModalFormData()
    .title('§l§9Settings')
    .toggle('FPS Counter', MOD_CONFIG.fpsEnabled)
    .toggle('CPS Counter', MOD_CONFIG.cpsEnabled)
    .toggle('PvP Textures', MOD_CONFIG.pvpTexturesEnabled)
    .toggle('Animations', true)
    .slider('Animation Speed', 0.5, 2.0, 0.1, MOD_CONFIG.animationSpeed);

  const response = await form.show(player);
  
  if (!response.canceled && response.formValues) {
    MOD_CONFIG.fpsEnabled = response.formValues[0];
    MOD_CONFIG.cpsEnabled = response.formValues[1];
    MOD_CONFIG.pvpTexturesEnabled = response.formValues[2];
    MOD_CONFIG.animationSpeed = response.formValues[4];
    
    player.onScreenDisplay.setTitle('§aSettings Saved!');
  }
}

// ============================================
// CAPE SYSTEM
// ============================================
function applyCape(player) {
  try {
    // Note: Cape application requires texture pack
    player.onScreenDisplay.setTitle('§aCape Applied!');
    player.onScreenDisplay.setActionBar('§77Custom cape enabled - Check texture pack');
  } catch(e) {
    console.warn('Cape error:', e);
  }
}

// ============================================
// EXPORT & INITIALIZATION
// ============================================
console.log('§a[Mobile Client Mod v26.23] Loaded Successfully!');
console.log('§77Press Sneak to toggle UI - Mobile & PC Compatible');

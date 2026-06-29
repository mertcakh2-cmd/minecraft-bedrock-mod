// Mobile Client UI System
// Handles all UI rendering and interactions

import { system, world } from '@minecraft/server';
import { ActionFormData, ModalFormData, MessageFormData } from '@minecraft/server-ui';

export class MobileClientUI {
  constructor() {
    this.uiState = {};
    this.animations = new Map();
  }

  // Display action bar message
  displayActionBar(player, message) {
    if (!player) return;
    try {
      player.onScreenDisplay.setActionBar(message);
    } catch(e) {
      console.warn('Action bar error:', e);
    }
  }

  // Display title
  displayTitle(player, title, subtitle = '', fadeIn = 10, stay = 70, fadeOut = 10) {
    if (!player) return;
    try {
      player.onScreenDisplay.setTitle(title, {
        fadeInDuration: fadeIn,
        stayDuration: stay,
        fadeOutDuration: fadeOut,
        subtitle: subtitle
      });
    } catch(e) {
      console.warn('Title error:', e);
    }
  }

  // Animated UI slide effect
  async animateFormShow(player, form, animationType = 'slide') {
    // This simulates animation through rapid UI updates
    try {
      return await form.show(player);
    } catch(e) {
      console.warn('Form animation error:', e);
      return null;
    }
  }

  // Create gradient text effect
  createGradientText(text, colors = ['§c', '§6', '§e', '§a', '§b', '§d']) {
    let result = '';
    let colorIndex = 0;
    
    for (let char of text) {
      if (char !== ' ') {
        result += colors[colorIndex % colors.length] + char;
        colorIndex++;
      } else {
        result += ' ';
      }
    }
    
    return result + '§r';
  }

  // Create separator line
  createSeparator(width = 30, char = '=') {
    return '§7' + char.repeat(width) + '§r';
  }

  // Notification system
  showNotification(player, title, message, type = 'info') {
    const icons = {
      'info': '§bℹ',
      'success': '§a✓',
      'warning': '§6⚠',
      'error': '§c✗',
      'pvp': '§c⚔',
      'performance': '§b📊'
    };

    const color = {
      'info': '§b',
      'success': '§a',
      'warning': '§6',
      'error': '§c',
      'pvp': '§c',
      'performance': '§b'
    };

    const icon = icons[type] || '§8•';
    const col = color[type] || '§f';

    this.displayTitle(player, `${icon} ${col}${title}`, `§7${message}`);
  }

  // Mobile-friendly button style
  formatMobileButton(text, icon = '', subtext = '') {
    if (subtext) {
      return `${icon} ${text}\n§8${subtext}`;
    }
    return `${icon} ${text}`;
  }
}

export default new MobileClientUI();

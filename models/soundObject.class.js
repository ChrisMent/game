/**
 * Manages sound effects and music for the game.
 * Allows for adding sounds to a centralized manager and muting or unmuting all sounds.
 */
class SoundManager {
  /**
   * A static array holding all sounds added to the SoundManager.
   * @type {HTMLAudioElement[]}
   */
  static sounds = [];

  /**
   * Adds a sound to the SoundManager's sound array.
   * @param {HTMLAudioElement} sound - The sound to add to the manager.
   */
  static addSound(sound) {
    SoundManager.sounds.push(sound);
  }

  /**
   * Toggles the mute state for all managed sounds.
   * @param {boolean} isMuted - Whether the sounds should be muted or not.
   */
  static toggleMute(isMuted) {
    SoundManager.sounds.forEach((sound) => {
      sound.muted = isMuted;
    });
  }
}

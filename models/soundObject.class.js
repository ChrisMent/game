/**
 * Statischer Manager für Soundeffekte im Spiel.
 * Verwaltet eine zentrale Sammlung aller Soundeffekte und bietet Methoden zur Steuerung dieser Sounds.
 * 
 * @property {HTMLAudioElement[]} sounds - Ein statisches Array zur Speicherung aller Soundeffekte.
 */
class SoundManager {
    static sounds = [];

    /**
     * Fügt einen neuen Soundeffekt zum Sound-Manager hinzu.
     * 
     * @param {HTMLAudioElement} sound - Der hinzuzufügende Soundeffekt.
     */
    static addSound(sound) {
        SoundManager.sounds.push(sound); // Fügt den Sound zum Array hinzu
    }

    /**
     * Schaltet die Stummschaltung aller Sounds im Sound-Manager um.
     * 
     * @param {boolean} isMuted - Gibt an, ob die Sounds stummgeschaltet werden sollen.
     */
    static toggleMute(isMuted) {
        SoundManager.sounds.forEach(sound => {
            sound.muted = isMuted; // Setzt die muted-Eigenschaft aller Sounds
        });
    }
}





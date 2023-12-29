class SoundManager {
    static sounds = [];

    static addSound(sound) {
        SoundManager.sounds.push(sound);
    }

    static toggleMute(isMuted) {
        SoundManager.sounds.forEach(sound => {
            sound.muted = isMuted;
        });
    }

    // static debugSounds() {
    //     console.log("Registrierte Sounds:");
    //     SoundManager.sounds.forEach((sound, index) => {
    //         console.log(`Sound ${index + 1}: ${sound.src}`);
    //     });
    // }
}



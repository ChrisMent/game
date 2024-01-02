class SoundManager {
    static sounds = []; // Ein statisches Array zur Speicherung aller Soundeffekte

    // Methode zum Hinzufügen eines Soundeffekts zum Sound-Manager.  Diese Methode erlaubt es, einen neuen Soundeffekt zur zentralen Sammlung von Soundeffekten hinzuzufügen. 
    static addSound(sound) {
        SoundManager.sounds.push(sound); // Fügt den übergebenen Sound zum Array hinzu
    }

    // Methode zum Umschalten der Stummschaltung aller Sounds
    static toggleMute(isMuted) {
        SoundManager.sounds.forEach(sound => {
            sound.muted = isMuted; // Setzt die muted-Eigenschaft aller Sounds
        });
    }

    // Methode zur Debug-Ausgabe aller registrierten Sounds (auskommentiert)
    // static debugSounds() {
    //     console.log("Registrierte Sounds:");
    //     SoundManager.sounds.forEach((sound, index) => {
    //         console.log(`Sound ${index + 1}: ${sound.src}`);
    //     });
    // }
}




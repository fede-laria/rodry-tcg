import {
    imgDrask, imgHivebreed, imgKoraiKan, imgThavensol, imgNingunaFaccion,
    imgIconoDrask, imgIconoHivebreed, imgIconoKoraiKan, imgIconoThavensol, imgIconoNingunaFaccion,
    imgLineaDrask, imgLineaHivebreed, imgLineaKoraiKan, imgLineaThavensol, imgLineaNingunaFaccion,
    imgTramaDrask, imgTramaHivebreed, imgTramaKoraiKan, imgTramaThavensol, imgTramaNingunaFaccion,
    imgTramaNegativoDrask, imgTramaNegativoHivebreed, imgTramaNegativoKoraiKan, imgTramaNegativoThavensol, imgTramaNegativoNingunaFaccion,
    imgVida, imgMana, imgAtaque, imgDefensa, imgVelocidad, imgPunteria,
    imgTierra, imgFuego, imgAgua, imgAire, imgTrueno, imgHielo,
    imgMarcoCriatura, imgMarcoConjuro, imgMarcoMaldicion, imgMarcoAccion, imgMarcoEquipamiento, imgMarcoToken, imgMarcoLocacion,
    imgInfoFondoCriatura, imgInfoFondoConjuro, imgInfoFondoEquipamiento,
    imgRazaBestia, imgRazaHumano, imgRazaInsectoide, imgRazaReptiliano,
    imgClaseGuerrero, imgClaseAsesino, imgClaseBerserker, imgClaseMago, imgClaseSupport, imgClaseTanque
} from './assets/images'

export const cData = {
    // Tipos de cartas
    tiposCarta: {
        criatura: {
            img: imgMarcoCriatura,
            imgInfoFondo: imgInfoFondoCriatura,
            color: "#a81414"
        },
        conjuro: {
            img: imgMarcoConjuro,
            imgInfoFondo: imgInfoFondoConjuro,
            color: "#1c2dc9"
        },
        maldicion: {
            img: imgMarcoMaldicion,
            imgInfoFondo: imgInfoFondoConjuro,
            color: "#111770",
            shownName: "Maldición"
        },
        accion: {
            img: imgMarcoAccion,
            imgInfoFondo: imgInfoFondoEquipamiento,
            color: "#eb9311",
            shownName: "Acción"
        },
        equipamiento: {
            img: imgMarcoEquipamiento,
            imgInfoFondo: imgInfoFondoEquipamiento,
            color: "#e9cb24"
        },
        token: {
            img: imgMarcoToken,
            imgInfoFondo: imgInfoFondoEquipamiento,
            color: "#fae898"
        },
        locacion: {
            img: imgMarcoLocacion,
            imgInfoFondo: imgInfoFondoEquipamiento,
            color: "#3fb978",
            shownName: "Locación"
        }
    },
    // Stats
    stats: {
        vida: {
            img: imgVida,
            color: "#ca1622",
            keyword: "VIDA",
            shownName: "VIDA",
            exclusiveTo: ["criatura"]
        },
        mana: {
            img: imgMana,
            color: "#5fc4df",
            keyword: "MANA",
            shownName: "MANÁ",
            exclusiveTo: ["criatura", "conjuro", "maldicion"]
        },
        ataque: {
            img: imgAtaque,
            color: "#c11b1f",
            keyword: "ATK",
            shownName: "ATK",
            exclusiveTo: ["criatura"]
        },
        defensa: {
            img: imgDefensa,
            color: "#878786",
            shownName: "DEF",
            exclusiveTo: ["criatura"]
        },
        velocidad: {
            img: imgVelocidad,
            color: "#6ebe93",
            shownName: "VEL",
            exclusiveTo: ["criatura"]
        },
        punteria: {
            img: imgPunteria,
            color: "#b65ea1",
            shownName: "PUN",
            exclusiveTo: ["criatura"]
        }
    },
    // Elementos
    elementos: {
        tierra: {
            img: imgTierra,
            color: "#976f4a"
        },
        fuego: {
            img: imgFuego,
            color: "#c25744"
        },
        agua: {
            img: imgAgua,
            color: "#266acf"
        },
        aire: {
            img: imgAire,
            color: "#e6c63c"
        },
        trueno: {
            img: imgTrueno,
            color: "#4eb17f"
        },
        hielo: {
            img: imgHielo,
            color: "#8dbfe0"
        }
    },
    // Atributos de conjuros / maldiciones
    cAtributos: {
        rapido: {
            color: "#ffc477"
        },
        ofensivo: {
            color: "#db5f40"
        },
        restrictivo: {
            color: "#9b6bf5"
        },
        unico: {
            color: "#fdff81"
        }
    },
    // Facciones
    facciones: {
        drask: {
            img: imgIconoDrask,
            imgCarta: imgDrask,
            imgLinea: imgLineaDrask,
            imgTrama: imgTramaDrask,
            imgTramaN: imgTramaNegativoDrask,
            color: "#46c22d"
        },
        hivebreed: {
            img: imgIconoHivebreed,
            imgCarta: imgHivebreed,
            imgLinea: imgLineaHivebreed,
            imgTrama: imgTramaHivebreed,
            imgTramaN: imgTramaNegativoHivebreed,
            color: "#f0d457"
        },
        koraiKan: {
            img: imgIconoKoraiKan,
            imgCarta: imgKoraiKan,
            imgLinea: imgLineaKoraiKan,
            imgTrama: imgTramaKoraiKan,
            imgTramaN: imgTramaNegativoKoraiKan,
            color: "#da3535",
            shownName: "Korai-Kan"
        },
        thavensol: {
            img: imgIconoThavensol,
            imgCarta: imgThavensol,
            imgLinea: imgLineaThavensol,
            imgTrama: imgTramaThavensol,
            imgTramaN: imgTramaNegativoThavensol,
            color: "#3244eb"
        },
        ninguna: {
            img: imgIconoNingunaFaccion,
            imgCarta: imgNingunaFaccion,
            imgLinea: imgLineaNingunaFaccion,
            imgTrama: imgTramaNingunaFaccion,
            imgTramaN: imgTramaNegativoNingunaFaccion,
            color: "#faeeb8"
        }
    },
    // Razas
    razas: {
        humano: {
            img: imgRazaHumano,
            color: "#eaecc3"
        },
        bestia: {
            img: imgRazaBestia,
            color: "#e95353"
        },
        insectoide: {
            img: imgRazaInsectoide,
            color: "#64ca5b"
        },
        reptiliano: {
            img: imgRazaReptiliano,
            color: "#e4be9b"
        }
    },
    // Clases
    clases: {
        guerrero: {
            img: imgClaseGuerrero,
            color: "#c7bbb0"
        },
        asesino: {
            img: imgClaseAsesino,
            color: "#c752c1"
        },
        berserker: {
            img: imgClaseBerserker,
            color: "#ec5752"
        },
        mago: {
            img: imgClaseMago,
            color: "#4845eb"
        },
        support: {
            img: imgClaseSupport,
            color: "#4eb17f"
        },
        tanque: {
            img: imgClaseTanque,
            color: "#c0865f"
        }
    }
}

export function getBgUrl(v) {
    return "url(" + v + ")";
}
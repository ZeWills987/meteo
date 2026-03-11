const weatherDescriptions = {
    jour: {
        degage: { 0: "Soleil", 1: "Peu nuageux" },
        nuages: { 2: "Ciel voilé", 3: "Nuageux", 4: "Très nuageux", 5: "Couvert" },
        brouillard: { 6: "Brouillard", 7: "Brouillard givrant" },
        bruine: { 16: "Bruine", 235: "Averses de grêle" },
        pluie: {
            10: "Pluie faible", 11: "Pluie modérée", 12: "Pluie forte",
            13: "Pluie faible verglaçante", 14: "Pluie modérée verglaçante", 15: "Pluie forte verglaçante",
            40: "Averses locales faibles", 41: "Averses locales", 42: "Averses locales fortes",
            43: "Averses faibles", 44: "Averses de pluie", 45: "Averses fortes",
            46: "Averses faibles fréquentes", 47: "Averses fréquentes", 48: "Averses fortes fréquentes",
            210: "Pluie faible intermittente", 211: "Pluie modérée intermittente", 212: "Pluie forte intermittente"
        },
        neige: {
            20: "Neige faible", 21: "Neige modérée", 22: "Neige forte",
            60: "Averses neige localisées faibles", 61: "Averses neige localisées", 62: "Averses neige localisées fortes",
            63: "Averses neige faibles", 64: "Averses de neige", 65: "Averses neige fortes",
            66: "Averses neige faibles fréquentes", 67: "Averses neige fréquentes", 68: "Averses neige fortes fréquentes",
            220: "Neige faible intermittente", 221: "Neige modérée intermittente", 222: "Neige forte intermittente",
            230: "Pluie et neige mêlées", 231: "Pluie et neige mêlées", 232: "Pluie et neige mêlées"
        },
        orage: {
            100: "Orages faibles et locaux", 101: "Orages locaux", 102: "Orages forts et locaux",
            103: "Orages faibles", 104: "Orages", 105: "Orages forts",
            106: "Orages faibles fréquents", 107: "Orages fréquents", 108: "Orages forts fréquents",
            120: "Orages de neige faibles", 121: "Orages de neige locaux", 122: "Orages de neige locaux",
            130: "Orages pluie/neige faibles", 131: "Orages pluie/neige locaux", 132: "Orages pluie/neige forts",
            140: "Pluies orageuses", 141: "Pluie et neige orageuses", 142: "Neige orageuse"
        }
    },
    nuit: {
        degage: { 0: "Ciel dégagé", 1: "Peu nuageux" },
        nuages: { 2: "Ciel voilé", 3: "Nuageux", 4: "Très nuageux", 5: "Couvert" },
        brouillard: { 6: "Brouillard", 7: "Brouillard givrant" },
        bruine: { 16: "Bruine", 235: "Averses de grêle" },
        pluie: {
            10: "Pluie faible", 11: "Pluie modérée", 12: "Pluie forte",
            13: "Pluie faible verglaçante", 14: "Pluie modérée verglaçante", 15: "Pluie forte verglaçante",
            40: "Averses locales faibles", 41: "Averses locales", 42: "Averses locales fortes",
            43: "Averses faibles", 44: "Averses de pluie", 45: "Averses fortes",
            46: "Averses faibles fréquentes", 47: "Averses fréquentes", 48: "Averses fortes fréquentes",
            210: "Pluie faible intermittente", 211: "Pluie modérée intermittente", 212: "Pluie forte intermittente"
        },
        neige: {
            20: "Neige faible", 21: "Neige modérée", 22: "Neige forte",
            60: "Averses neige localisées faibles", 61: "Averses neige localisées", 62: "Averses neige localisées fortes",
            63: "Averses neige faibles", 64: "Averses de neige", 65: "Averses neige fortes",
            220: "Neige faible intermittente", 221: "Neige modérée intermittente", 222: "Neige forte intermittente",
            230: "Pluie et neige mêlées", 231: "Pluie et neige mêlées", 232: "Pluie et neige mêlées"
        },
        orage: {
            100: "Orages faibles et locaux", 101: "Orages locaux", 102: "Orages forts et locaux",
            103: "Orages faibles", 104: "Orages", 105: "Orages forts",
            106: "Orages faibles fréquents", 107: "Orages fréquents", 108: "Orages forts fréquents",
            140: "Pluies orageuses", 141: "Pluie et neige orageuses", 142: "Neige orageuse"
        }
    }
};

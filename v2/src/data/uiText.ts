export type Lang = 'en' | 'it' | 'es';
export type Theme = 'dark' | 'light';

export const uiText = {
    en: {
        nav: { home: 'Home', expertise: 'Expertise', projects: 'Projects', contact: 'Contact', theme: 'Theme', language: 'Language' },
        hero: {
            badge: 'Available for new opportunities in 2026',
            titleTop: 'Architecting',
            titleBottom: 'Intelligence',
            description: "I'm Fausto Saccoccio, a specialized AI Engineer building production-grade multi-agent systems, RAG pipelines, and highly scalable full-stack solutions.",
            ctaPrimary: 'Explore Systems',
            ctaSecondary: 'Deploy Contact'
        },
        expertise: {
            titleTop: 'Built for',
            titleBottom: 'Scale.',
            description: "I don't just write scripts. I architect end-to-end production systems - from async Python APIs to multi-agent TypeScript orchestration, bound by secure JWT auth and vectorized databases."
        },
        projects: {
            headingTop: 'Featured',
            headingBottom: 'Engineering',
            sub: 'Hover over the cards to explore the technical architecture and statistics behind my open-source intelligence platforms.',
            techSpecs: 'Technical Specifications',
            stars: 'Stars',
            viewSource: 'View Source'
        },
        contact: {
            titleTop: "Let's build something",
            titleBottom: 'extraordinary.',
            sub: "Currently looking for new opportunities as an AI Engineer or Full Stack Developer. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
            hello: 'Say Hello',
            builtWith: 'Built with React & Tailwind.'
        },
        chat: {
            initialSystem: 'Connection established to FaustoOS v2.0... (Powered by Gemini 3.1 Pro)',
            initialModel: "Hello! I'm a specialized AI agent designed to answer questions about Fausto Saccoccio's engineering capabilities. To get started, please click the Settings icon (⚙️) above to paste your Gemini API key!",
            clear: 'Clear',
            searchOn: 'Search ON',
            searchOff: 'Search OFF',
            saveKey: 'Save Key',
            keyPlaceholder: 'Paste Gemini API Key (Optional)...',
            getFreeKey: 'Get a free API Key on AI Studio →',
            inputPlaceholder: 'Ask about my tech stack...'
        }
    },
    it: {
        nav: { home: 'Home', expertise: 'Competenze', projects: 'Progetti', contact: 'Contatti', theme: 'Tema', language: 'Lingua' },
        hero: {
            badge: 'Disponibile per nuove opportunita nel 2026',
            titleTop: 'Progettare',
            titleBottom: 'Intelligenza',
            description: 'Sono Fausto Saccoccio, AI Engineer specializzato nella costruzione di sistemi multi-agente production-grade, pipeline RAG e soluzioni full-stack altamente scalabili.',
            ctaPrimary: 'Esplora i Sistemi',
            ctaSecondary: 'Contattami'
        },
        expertise: {
            titleTop: 'Progettato per',
            titleBottom: 'Scalare.',
            description: 'Non scrivo solo script. Progetto sistemi end-to-end in produzione: dalle API Python asincrone all orchestrazione multi-agente in TypeScript, con autenticazione JWT sicura e database vettoriali.'
        },
        projects: {
            headingTop: 'Ingegneria',
            headingBottom: 'in Evidenza',
            sub: 'Passa sulle card per esplorare architettura tecnica e metriche delle mie piattaforme open-source.',
            techSpecs: 'Specifiche Tecniche',
            stars: 'Stelle',
            viewSource: 'Vedi Codice'
        },
        contact: {
            titleTop: 'Costruiamo qualcosa di',
            titleBottom: 'straordinario.',
            sub: 'Attualmente cerco nuove opportunita come AI Engineer o Full Stack Developer. Se hai una domanda o vuoi semplicemente salutarmi, ti rispondero al piu presto.',
            hello: 'Scrivimi',
            builtWith: 'Realizzato con React e Tailwind.'
        },
        chat: {
            initialSystem: 'Connessione stabilita a FaustoOS v2.0... (Powered by Gemini 3.1 Pro)',
            initialModel: 'Ciao! Sono un agente AI specializzato nel rispondere sulle competenze ingegneristiche di Fausto Saccoccio. Per iniziare, clicca l icona Impostazioni (⚙️) e inserisci la tua Gemini API key.',
            clear: 'Pulisci',
            searchOn: 'Ricerca ON',
            searchOff: 'Ricerca OFF',
            saveKey: 'Salva Key',
            keyPlaceholder: 'Incolla Gemini API Key (Opzionale)...',
            getFreeKey: 'Ottieni una API Key gratuita su AI Studio →',
            inputPlaceholder: 'Chiedi del mio stack tecnico...'
        }
    },
    es: {
        nav: { home: 'Inicio', expertise: 'Especialidad', projects: 'Proyectos', contact: 'Contacto', theme: 'Tema', language: 'Idioma' },
        hero: {
            badge: 'Disponible para nuevas oportunidades en 2026',
            titleTop: 'Arquitectando',
            titleBottom: 'Inteligencia',
            description: 'Soy Fausto Saccoccio, AI Engineer especializado en sistemas multiagente production-grade, pipelines RAG y soluciones full-stack altamente escalables.',
            ctaPrimary: 'Explorar Sistemas',
            ctaSecondary: 'Contacto'
        },
        expertise: {
            titleTop: 'Construido para',
            titleBottom: 'Escalar.',
            description: 'No solo escribo scripts. Diseno sistemas end-to-end en produccion: desde APIs Python asincronas hasta orquestacion multiagente en TypeScript, con JWT seguro y bases vectoriales.'
        },
        projects: {
            headingTop: 'Ingenieria',
            headingBottom: 'Destacada',
            sub: 'Pasa por las tarjetas para explorar la arquitectura tecnica y metricas de mis plataformas open-source.',
            techSpecs: 'Especificaciones Tecnicas',
            stars: 'Estrellas',
            viewSource: 'Ver Codigo'
        },
        contact: {
            titleTop: 'Construyamos algo',
            titleBottom: 'extraordinario.',
            sub: 'Actualmente busco nuevas oportunidades como AI Engineer o Full Stack Developer. Si tienes una pregunta o solo quieres saludar, te respondere lo antes posible.',
            hello: 'Saludar',
            builtWith: 'Hecho con React y Tailwind.'
        },
        chat: {
            initialSystem: 'Conexion establecida a FaustoOS v2.0... (Powered by Gemini 3.1 Pro)',
            initialModel: 'Hola! Soy un agente AI especializado en responder sobre las capacidades de ingenieria de Fausto Saccoccio. Para empezar, haz clic en Configuracion (⚙️) y pega tu Gemini API key.',
            clear: 'Limpiar',
            searchOn: 'Busqueda ON',
            searchOff: 'Busqueda OFF',
            saveKey: 'Guardar Key',
            keyPlaceholder: 'Pega Gemini API Key (Opcional)...',
            getFreeKey: 'Obtener API Key gratis en AI Studio →',
            inputPlaceholder: 'Pregunta por mi stack tecnico...'
        }
    }
} as const;

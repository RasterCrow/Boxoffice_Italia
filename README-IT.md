# BoxOffice Italia WebApp
<p align="center">
  <img height="400" src="https://i.imgur.com/V4BOjFa.jpg" />
</p>

Codice sorgente di BoxOffice Italia, WebApp che ho sviluppato per facilitare la visione degli incassi al botthegino dei film in uscita nei cinema italiani.

La WebApp è stata creata per uso privato, ma è disponibile una demo pubblica [qui]([https://boxoffice-demo-37179.web.app/](https://boxoffice-demo.rastercrow.me/)).

UPDATE 2023 : L'app è stata una dei miei primi big progetti. Dovendo modificare alcune cose ora dopo anni mi rendo conto di quanto il codice sia incasinato e quanto js senza type sia problematico da toccare. Siete stati avvisati!

# Struttura
Il lato client di BoxOffice Italia è stato svilupatto in React Framework, hostato su Firebase Hosting.

Dal lato server BoxOffice Italia è stato sviluppato con Express, hostato su Heroku.

I dati del BoxOffice sono hostati su un DB NOSQL MongoDB, hostato in seguito su MongoDB Atlas.

Il recupero dei dati è gestito tramite uno script hostato hostato su AWS Lambda, schedulizzato con AWS Event Bridge.

Inoltre BoxOffice Italia fa uso delle API offerte da TMDB per recuperare informazioni extra sui film come attori, copertina, descrizione ecc...

# Motivi sulla creazione
Mi piace speculare e seguire questi tipi di dati e siccome all'estero sono disponibile diversi siti per farlo, ho pensato di ideare qualcosa di simile per i dati in Italia.

La maggior parte dei siti in italia tengono conto soltanto delle ultime due settimane, cosi ho ideato BoxOffice Italia per tenere conto dei dati di sempre.

Inizialmente avevo una versione più basilare sviluppata in PHP e hostata su con Apache sul mio Raspberry. Volevo migliorare però le mie skill da WebDev ho deciso di creare una versione più aggiornata e moderna a livello di tecnologie.

La versione completa é per il momento è disponibile solo per uso mio privato.

# Funzionalità
<p align="center">
  <img height="400" src="https://i.imgur.com/DEnJkwK.jpg" />
</p>

BoxOffice Italia permette agli utenti di visionare in maniera rapida ma comunque precisa gli incassi dei film in uscita al cinema in Italia, sulla falsa riga di BoxOffice Mojo o The Numbers.

Questi dati sono visionabili per giorno, weekend e anno, oppure anche per film specifico.

Sono disponibili inoltre differenza in percentuale degli incassi e alert per i film appena usciti.

Non sono disponibili tutti gli incassi, in quanto ho iniziato a tenere conto di questi solo dalla fine del 2019; é comunque disponibile una sezione con i maggiori incassi di sempre.

# Privacy
La WebApp non memorizza nessun dato dell'utente.

La WebApp non utilizza cookies ne dati di sessione.

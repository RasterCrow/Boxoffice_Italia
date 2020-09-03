# BoxOffice Italia WebApp
<p align="center">
  <img height="400" src="https://i.imgur.com/V4BOjFa.jpg" />
</p>

Codice sorgente di BoxOffice Italia, WebApp che ho sviluppato per facilitare la visione degli incassi al botthegino dei film in uscita nei cinema italiani.

La WebApp è stata creata per uso privato, ma una versione demo è possibile usare una versione demo su [boxoffice.rastercrow.me](https://boxoffice.rastercrow.me/).

# Struttura
Il lato client di BoxOffice Italia è stato svilupatto in React Framework, hostato su Firebase Hosting.

Dal lato server BoxOffice Italia è stato sviluppato con Express, hostato su Heroku.

I dati del BoxOffice sono hostati su un DB NOSQL MongoDB, hostato in seguito su MongoDB Atlas.

Il recupero dei dati è gestito tramite uno script hostato hostato su AWS Lambda, schedulizzato con AWS Event Bridge.

Inoltre BoxOffice Italia fa uso delle API offerte da TMDB per recuperare informazioni extra sui film come attori, copertina, descrizione ecc...

# Motivi sulla creazione
Mi piace speculare e seguire questi tipi di dati e siccome all'estero sono disponibile diversi siti per farlo, ho pensato di ideare qualcosa di simile per i dati in Italia.

La maggior parte dei siti in italia tengono conto soltanto delle ultime due settimane, cosi ho ideato BoxOffice Italia per tenere conto dei dati di sempre.

Per il momento è disponibile solo per uso mio privato, in quanto non voglio condividere i dati del boxoffice che salvo pubblicamente.

E' comunque disponibile una versione demo su [boxoffice.rastercrow.me] per farsi una idea del progetto.

Se siete interessati e vorreste avere accesso completo alla webapp contattatemi per email al seguente indirizzo : alexsandries@outlook.com

# Funzionalità
<p align="center">
  <img height="400" src="https://i.imgur.com/DEnJkwK.jpg" />
</p>

BoxOffice Italia permette agli utenti di visionare in maniera rapida ma comunque precisa gli incassi dei film in uscita al cinema in Italia, sulla falsa riga di BoxOffice Mojo o The Numbers.

Questi dati sono visionaibili per giorno, weekend e anno, oppure anche per film specifico.

Sono disponibili inoltre differenza in percentuale degli incassi e alert per i film appena usciti.

Non sono disponibili tutti gli incassi, in quanto ho iniziato a tenere conto di questi solo dalla fine del 2019; é comunque disponibile una sezione con i maggiori incassi di sempre.

# Privacy
La WebApp non memorizza nessun dato dell'utente.

La WebApp non utilizza cookies ne dati di sessione.

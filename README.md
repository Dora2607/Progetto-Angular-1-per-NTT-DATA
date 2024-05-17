# CityGuard

CityGuard è un'applicazione gratuita che mira a migliorare la vita delle persone nei centri urbani. L'applicazione consente agli utenti di condividere le proprie idee e segnalazioni per contribuire a proteggere e salvaguardare il patrimonio culturale e naturale della città e supportare i legami positivi, sociali e ambientali, tra aree urbane.

## Funzionalità

Dopo aver effettuato l'autenticazione, gli utenti possono accedere alla sezione dove è possibile vedere la lista degli utenti, con la possibilità di svolgere una ricerca per nome o email. È possibile creare o eliminare un nuovo utente.

Gli utenti possono aprire la scheda di un utente, dove vengono mostrati i suoi dettagli, visualizzare i suoi post e quindi inserire dei commenti.

È presente una seconda funzionalità in cui l’utente visualizza tutti i post, può effettuare delle ricerche e, una volta individuato il post di interesse, può visualizzare i commenti e inserirne di nuovi. In questa sezione l’utente può inserire dei nuovi post.

## Tecnologie utilizzate

L'applicazione è stata sviluppata utilizzando il framework Angular, Angular Material per la modellazione dei componenti e la libreria NgRx per la gestione dello stato dell'applicazione.

## Configurazione e prova in locale

Per configurare e testare l'applicazione in locale, segui questi passaggi:

1. Clona il repository sul tuo computer locale.
2. Naviga nella directory del progetto e installa le dipendenze con `npm install`.
3. Avvia il server di sviluppo con `ng serve`. Naviga su `http://localhost:4200/`. L'applicazione si ricaricherà automaticamente se modifichi uno dei file sorgente.

## Panoramica delle Componenti e dei Servizi

In questa sezione, esploreremo le componenti principali e i servizi utilizzati in CityGuard. Questi elementi costituiscono il cuore della nostra applicazione e ci permettono di fornire un'esperienza utente fluida e reattiva.

### Autenticazione e Gestione dello Stato

L'autenticazione è una parte fondamentale di CityGuard. Utilizziamo un modulo di login e registrazione per autenticare gli utenti. I moduli di login e registrazione sono gestiti dal componente `LoginComponent`, che utilizza un `FormGroup` per gestire i dati del modulo. Quando un utente invia il modulo, se i dati sono validi, viene eseguita l'azione di login o registrazione.

Le azioni di login, logout e registrazione sono definite nel file `auth.actions.ts` utilizzando la funzione `createAction` di NgRx. Quando un utente si registra o effettua l'accesso, le informazioni dell'utente vengono salvate nello stato dell'applicazione e nel `localStorage`. Queste informazioni vengono utilizzate per determinare se un utente è autenticato e per mantenere le informazioni dell'utente tra le sessioni.

La gestione dello stato dell'autenticazione è gestita utilizzando NgRx, una libreria di gestione dello stato reattiva per Angular. Il file `auth.reducer.ts` definisce come lo stato dell'applicazione cambia in risposta alle azioni di login, logout e registrazione.

Il file `auth.effects.ts` definisce gli effetti laterali delle azioni di login, logout e registrazione. Quando un utente si registra, effettua l'accesso o si disconnette, l'applicazione naviga rispettivamente alla pagina home o alla pagina di login.

Infine, utilizziamo un `AuthGuard` per proteggere le rotte che richiedono l'autenticazione. Se un utente non autenticato tenta di accedere a una di queste rotte, verrà reindirizzato alla pagina di login.

In questo contesto, viene definito quando la componente `app-header` sarà visibile o meno. In pratica, se l'utente non è autenticato e quindi non ha un token di autenticazione, l'header non sarà visibile. Se l'utente è autenticato, l'header sarà visibile.


### HeaderComponent
`app-header` è una barra degli strumenti che contiene un menu per navigare tra le diverse componenti dell'applicazione, un componente logo e un pulsante che attiva la barra di ricerca. Quando il pulsante di ricerca viene cliccato, viene chiamato il metodo `toggleSearchBar()` che mostra la barra di ricerca. 
#### Approfondimento della SearchBarComponent contenuta nella HeaderComponent

La **SearchBarComponent** fornisce una barra di ricerca per trovare gli utenti per nome o email. Quando un termine di ricerca viene inserito e inviato, il metodo `searchUsers()` viene chiamato per filtrare gli utenti visualizzati in base al termine di ricerca. C'è anche un pulsante per terminare la ricerca, che nasconde la barra di ricerca e ripristina l'elenco degli utenti visualizzati.


### HomeComponent

`HomeComponent` è il cuore dell'applicazione CityGuard. Questo componente gestisce la visualizzazione degli utenti e fornisce un'interfaccia per interagire con l'elenco degli utenti. Include due elementi principali: `app-users-view` e `router-outlet`.

`app-users-view` gestisce la visualizzazione degli utenti. Include filtri per visualizzare gli utenti in base allo stato online/offline/tutti, il numero di utenti da visualizzare e fornisce bottoni per aggiungere o rimuovere utenti.

`router-outlet` è un segnaposto che Angular riempie dinamicamente in base allo stato del router. Permette di visualizzare diversi componenti in base alla rotta corrente.

In `HomeComponent`, vengono gestiti gli eventi di modifica dello stato e del conteggio degli utenti. Questi eventi sono emessi dal componente `app-users-view` e gestiti in `HomeComponent`. Inoltre, `HomeComponent` si iscrive ai cambiamenti degli utenti e degli utenti visualizzati utilizzando `UserDataService`. Quando gli utenti o gli utenti visualizzati cambiano, `HomeComponent` aggiorna i suoi dati di conseguenza. Infine, `HomeComponent` gestisce la navigazione alla pagina di aggiunta di un nuovo utente quando il pulsante di aggiunta utente viene cliccato.

#### UsersViewComponent

`UsersViewComponent` è un componente chiave utilizzato in `HomeComponent` per gestire la visualizzazione e l'interazione con l'elenco degli utenti.

Il template di `UsersViewComponent` include una serie di elementi interattivi:

- Un menu per filtrare gli utenti in base allo stato (tutti, online, offline).
- Un menu per selezionare il numero di utenti da visualizzare.
- Due pulsanti per aggiungere o rimuovere utenti.

In `UsersViewComponent` vengono gestiti gli eventi di modifica dello stato e del conteggio degli utenti. Questi eventi sono emessi dal componente e gestiti in `HomeComponent`.

Inoltre, `UsersViewComponent` fornisce metodi per aggiornare lo stato e il conteggio degli utenti, che vengono chiamati quando l'utente interagisce con i menu o i pulsanti nel template.

### UsersListComponent

`UsersListComponent` è un componente chiave che gestisce la visualizzazione e l'interazione con l'elenco degli utenti. Questo componente utilizza il servizio `UsersService` per ottenere tutti gli utenti e il servizio `UserDataService` per gestire i dati degli utenti.

Nel template HTML del componente, viene utilizzato un ciclo `*ngFor` per iterare su ogni utente nell'array `displayedUsers` e visualizzare i loro dettagli. Ogni utente viene visualizzato come un elemento di lista con un'icona di stato (verde per attivo, rosso per inattivo), il nome dell'utente e l'email dell'utente.

Il componente fornisce anche un pulsante di eliminazione per ogni utente, che viene visualizzato solo quando la variabile `deleteButton` è `true`. Quando questo pulsante viene cliccato, viene chiamato il metodo `activeDeleteUser()`, che chiede conferma all'utente e, se confermato, elimina l'utente utilizzando il servizio `UsersService`.

Infine, c'è un pulsante "Indietro" che, quando cliccato, chiama il metodo `goToPreviousPage()`. Questo metodo imposta la variabile `deleteButton` a `false`, nascondendo così il pulsante di eliminazione.

Nel metodo `ngOnInit()`, il componente si iscrive a vari Observable forniti da `UserDataService` per rimanere sincronizzato con i cambiamenti agli utenti e agli utenti visualizzati, nonché allo stato del pulsante di eliminazione. Inoltre, viene chiamato il metodo `getAllUser()` per ottenere tutti gli utenti all'avvio del componente.

### AddUserComponent

`AddUserComponent` è un componente che fornisce un modulo per aggiungere un nuovo utente. Questo componente utilizza il servizio `UsersService` per aggiungere un nuovo utente e il servizio `UserDataService` per gestire i dati degli utenti.

Nel template HTML del componente, viene fornito un modulo con campi per il nome, cognome, genere e email dell'utente. Ogni campo del modulo è controllato da un `FormControl` all'interno del `FormGroup` `addUserForm`, che viene inizializzato nel metodo `ngOnInit()` del componente.

Il componente fornisce due pulsanti: uno per inviare il modulo e aggiungere un nuovo utente, e uno per tornare alla lista degli utenti. Il pulsante di invio è disabilitato finché il modulo non è valido.

Quando il modulo viene inviato, viene chiamato il metodo `newUser()`. Questo metodo crea un nuovo oggetto utente con i dati del modulo, genera uno stato casuale per l'utente e chiama il metodo `addUser()` del servizio `UsersService` per aggiungere l'utente. Se l'aggiunta dell'utente ha successo, l'utente viene aggiunto all'array `users` nel servizio `UserDataService` e viene mostrato un messaggio di successo.

Il metodo `goBack()` viene chiamato quando viene cliccato il pulsante "Indietro". Questo metodo naviga alla pagina della lista degli utenti.


### CommentsComponent

Il `CommentsComponent` è un componente chiave dell'applicazione che gestisce la visualizzazione e l'aggiunta di commenti per un post specifico. Questo componente riceve l'ID del post come input e utilizza il servizio `UsersService` per ottenere tutti i commenti per quel post. I commenti vengono quindi memorizzati nel servizio `CommentsService` per essere utilizzati in seguito.

Quando il componente viene inizializzato, controlla se è la prima volta che il componente dei commenti viene visitato. Se è la prima volta, richiede tutti i commenti per il post specifico. Altrimenti, recupera i commenti visualizzati precedentemente dal servizio `CommentsService`.

Il componente si sottoscrive agli Observable `commentsChanged` e `displayedCommentsChanged` del servizio `CommentsService` per essere notificato quando i commenti o i commenti visualizzati cambiano.

Infine, il componente implementa il metodo `ngOnDestroy` per annullare le sottoscrizioni quando il componente viene distrutto, prevenendo così eventuali perdite di memoria.


## Service

### UsersService

`UsersService` è un servizio che fornisce metodi per interagire con l'API degli utenti. Questo servizio utilizza il modulo `HttpClient` di Angular per eseguire richieste HTTP.

Il metodo `getUsers()` esegue una richiesta GET all'URL degli utenti e restituisce un Observable che emette un array di utenti.

Il metodo `addUser(user: newUser)` esegue una richiesta POST all'URL degli utenti per aggiungere un nuovo utente. Questo metodo richiede un oggetto `user` come parametro, che rappresenta il nuovo utente da aggiungere. La richiesta POST include un header di autorizzazione con un token di accesso recuperato dal `localStorage`.

Il metodo `deleteUser(userId: number)` esegue una richiesta DELETE all'URL degli utenti per eliminare un utente esistente. Questo metodo richiede un `userId` come parametro, che rappresenta l'ID dell'utente da eliminare. Come per il metodo `addUser()`, la richiesta DELETE include un header di autorizzazione con un token di accesso recuperato dal `localStorage`.

### UserDataService

`UserDataService` è un servizio che gestisce i dati degli utenti all'interno dell'applicazione. Questo servizio mantiene due array di utenti: `users`, che contiene tutti gli utenti, e `displayedUsers`, che contiene gli utenti attualmente visualizzati.

Questo servizio fornisce vari Observable per notificare i cambiamenti negli array di utenti e nello stato dei pulsanti di eliminazione e aggiunta utente.

Fornisce inoltre vari metodi per aggiornare gli array di utenti e gli utenti visualizzati. Questi includono metodi per impostare gli array di utenti e utenti visualizzati, aggiornare gli utenti visualizzati in base allo stato o al conteggio, aggiungere un nuovo utente agli array di utenti e utenti visualizzati, ottenere una copia degli utenti visualizzati e rimuovere un utente dagli array di utenti e utenti visualizzati.


## Testing

Per eseguire i test dell'applicazione, utilizza il comando `ng test` nella riga di comando. Questo avvierà Karma, che eseguirà i test e fornirà un rapporto sulla loro riuscita.

I test sono scritti usando il framework di testing Jasmine. Ogni componente e servizio ha un file di test associato che verifica il suo comportamento.

Per generare un report sulla coverage del codice, puoi utilizzare il comando `ng test --code-coverage`. Questo genererà una directory `coverage` nel tuo progetto con un report HTML sulla coverage del tuo codice.

## Ulteriori informazioni

Per ulteriori informazioni su Angular CLI, utilizza `ng help` o consulta la pagina di riferimento dei comandi di Angular CLI.


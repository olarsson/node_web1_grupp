Projekt: Bilbokningen
Klass: YHJUST16
Grupp: 1
Deltagare: Olof Larsson, Andreas Östlund, Johan Zetterquis
Github repo: https://github.com/olarsson/node_web1_grupp
Målbetyg: VG

<b>Om projektet</b>
Projektets mål var att skapa en backend+frontend lösning node.js där användare ska kunna hyra bilar.

<b>Hur funkar det</b>
I vår lösning är första steget att registrera sig som en kund. Man skapar ett konto som sedan används för att logga in i systemet. Alla bilar som bokas registreras således till den inloggade användaren. Vi har även en backend för admin där man kan lägga in nya bilar och editera/ta bort dom existerande. Vi använder tre olika scheman: cars, bookings och users.

<b>Kravspecifikation</b>
Krav: "I systemet ska man kunna boka en bil mellan två datum."
Lösning: Man väljer intervall mellan två datum i date-boxes. Väljer man datum i fel ordning eller bokat intervall får man ett felmedelande.

Krav: "Namnet och kontaktinformation på den som bokar ska lagras i samband med bokningen."
Lösning: Alla bokningar är kopplade till den användaren som gör den. En bokning kan alltid härledas till en användare.

Krav: "Man ska kunna se om en bil redan är bokad ett visst datum."
Lösning: Vid försök att boka under en period där en bokning redan finns får användaren ett felmedelande.

Krav: "Man ska kunna avboka en bil."
Lösning: Användaren avbokar en bil genom att trycka på "Avboka" under "min sida".

Krav: "Man ska kunna välja mellan minst 3 olika sorters bilar i olika storleksklasser."
Lösning: Fyra olika sorters bilar finns i fem olika storlekar. Även andra attribut finns.

Krav: "I systemet ska man även kunna välja en bil med en viss egenskap, t.ex. med växellåda men utan takräcke."
Lösning: Ja, det finns

<b>Tekniska krav för G</b>
Krav: "Ni ska använda ExpressJS för att sätta upp din backend"
Lösning: Ja

Krav: "Du ska använda MongoDB som databas. Här får ni välja om ni kör via Mongoose eller om ni kopplar in er direkt via MongoDB-driver."
Lösning: Ja, vi använder mlab och kör via Mongoose.

Krav: "Applikationen ska klara av att uppdatera resurserna i databasen enligt HTTPs CRUD-metoder: GET, POST, PATCH, DELETE. Man ska kunna visa, lägga till, ta bort editera bilarna genom att ankalla serverns REST-API."
Lösning: Alla metoderna används i projektet.

Krav: "Man ska kunna sortera efter en bils olika egenskaper, detta kan ske antingen client-side eller server-side."
Lösning: Användare kan sortera i frontenden på headings i table på sidorna "min sida" och under "boka en bil".

Krav: "Kunden har minst 15 olika bilar av olika typer i sitt lager. Ni får lägga till fler."
Lösning: 20 olika bilar med blandade attribut finns i lager.

Krav: "Ni enhetstestar de viktigaste endpointsen i er applikation med ett testramverk som Mocha_ eller Supertest"
Lösning: Ja, enhetstestning finns i katalogen "test".

Krav: "Ni versionshanterar ert projekt via git samt via GitHub."
Lösning: Vårt github repo finns på: https://github.com/olarsson/node_web1_grupp

Krav: "Ni för individuell dokumentation på vad ni gör för delar av applikationen. Detta kan göras i en separat md-fil som ni skickar med i projektet när ni lämnar in. Detta kommer att användas i samband med er versionshantering för att se att alla har bidrat till projektet."
Lösning: Redovisas individuellt.

<b>Tekniska krav för VG</b>
Krav: "Ni har ett enklare loginsystem så att man kan logga in och spara sina uppgifter."
Lösning: Ja, detta är implementerat och krävs för att kunna boka en bil.

Krav: "Ni ska använda MongoDBs aggregation för att visa upp aggregerade resultat från databasen, t.ex. hämta ut antalet bilar av en specifik typ."
Lösning: Ja, vi användre aggregate i "booking.js" för att kontrollera om en bokning finns under ett datumintervall. Vi använder det även i "home.js" på rad 57 för att visa bokningarna den inloggade användaren har gjort på "min sida".


<b>Viktiga URLs</b>
Login och signup: http://localhost:3000/
Administrering av bilar: http://localhost:3000/admin

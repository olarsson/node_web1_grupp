Projekt: Bilbokningen<br>
Klass: YHJUST16<br>
Grupp: 1<br>
Deltagare: Olof Larsson, Andreas Östlund, Johan Zetterquis<br>
Github repo: https://github.com/olarsson/node_web1_grupp<br>
Målbetyg: VG<br>
<br>
<b>Om projektet</b><br>
Projektets mål var att skapa en backend+frontend lösning node.js där användare ska kunna hyra bilar.<br>
<br>
<b>Hur funkar det</b><br>
I vår lösning är första steget att registrera sig som en kund. Man skapar ett konto som sedan används för att logga in i systemet. Alla bilar som bokas registreras således till den inloggade användaren. Vi har även en backend för admin där man kan lägga in nya bilar och editera/ta bort dom existerande. Vi använder tre olika scheman: cars, bookings och users.<br>
<br>
<b>Kravspecifikation</b><br>
Krav: "I systemet ska man kunna boka en bil mellan två datum."<br>
Lösning: Man väljer intervall mellan två datum i date-boxes. Väljer man datum i fel ordning eller bokat intervall får man ett felmedelande.<br>
<br>
Krav: "Namnet och kontaktinformation på den som bokar ska lagras i samband med bokningen."<br>
Lösning: Alla bokningar är kopplade till den användaren som gör den. En bokning kan alltid härledas till en användare.<br>
<br>
Krav: "Man ska kunna se om en bil redan är bokad ett visst datum."<br>
Lösning: Vid försök att boka under en period där en bokning redan finns får användaren ett felmedelande.<br>
<br>
Krav: "Man ska kunna avboka en bil."<br>
Lösning: Användaren avbokar en bil genom att trycka på "Avboka" under "min sida".<br>
<br>
Krav: "Man ska kunna välja mellan minst 3 olika sorters bilar i olika storleksklasser."<br>
Lösning: Fyra olika sorters bilar finns i fem olika storlekar. Även andra attribut finns.<br>
<br>
Krav: "I systemet ska man även kunna välja en bil med en viss egenskap, t.ex. med växellåda men utan takräcke."<br>
Lösning: Ja, det finns<br>
<br>
<b>Tekniska krav för G</b><br>
Krav: "Ni ska använda ExpressJS för att sätta upp din backend"<br>
Lösning: Ja<br>
<br>
Krav: "Du ska använda MongoDB som databas. Här får ni välja om ni kör via Mongoose eller om ni kopplar in er direkt via MongoDB-driver."<br>
Lösning: Ja, vi använder mlab och kör via Mongoose.<br>
<br>
Krav: "Applikationen ska klara av att uppdatera resurserna i databasen enligt HTTPs CRUD-metoder: GET, POST, PATCH, DELETE. Man ska kunna visa, lägga till, ta bort editera bilarna genom att ankalla serverns REST-API."<br>
Lösning: Alla metoderna används i projektet.<br>
<br>
Krav: "Man ska kunna sortera efter en bils olika egenskaper, detta kan ske antingen client-side eller server-side."<br>
Lösning: Användare kan sortera i frontenden på headings i table på sidorna "min sida" och under "boka en bil".<br>
<br>
Krav: "Kunden har minst 15 olika bilar av olika typer i sitt lager. Ni får lägga till fler."<br>
Lösning: 20 olika bilar med blandade attribut finns i lager.<br>
<br>
Krav: "Ni enhetstestar de viktigaste endpointsen i er applikation med ett testramverk som Mocha_ eller Supertest"<br>
Lösning: Ja, enhetstestning finns i katalogen "test".<br>
<br>
Krav: "Ni versionshanterar ert projekt via git samt via GitHub."<br>
Lösning: Vårt github repo finns på: https://github.com/olarsson/node_web1_grupp<br>
<br>
Krav: "Ni för individuell dokumentation på vad ni gör för delar av applikationen. Detta kan göras i en separat md-fil som ni skickar med i projektet när ni lämnar in. Detta kommer att användas i samband med er versionshantering för att se att alla har bidrat till projektet."<br>
Lösning: Redovisas individuellt.<br>
<br>
<b>Tekniska krav för VG</b><br>
Krav: "Ni har ett enklare loginsystem så att man kan logga in och spara sina uppgifter."<br>
Lösning: Ja, detta är implementerat och krävs för att kunna boka en bil.<br>
<br>
Krav: "Ni ska använda MongoDBs aggregation för att visa upp aggregerade resultat från databasen, t.ex. hämta ut antalet bilar av en specifik typ."<br>
Lösning: Ja, vi användre aggregate i "booking.js" för att kontrollera om en bokning finns under ett datumintervall. Vi använder det även i "home.js" på rad 57 för att visa bokningarna den inloggade användaren har gjort på "min sida".<br>
<br><br>
<b>Viktiga URLs</b><br>
Login och signup: http://localhost:3000/<br>
Administrering av bilar: http://localhost:3000/admin<br>

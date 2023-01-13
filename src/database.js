import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, query, where
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtFyMlzcPnf8JwNIYULjLxGHCqMOwLz90",
    authDomain: "reinstyrdb.firebaseapp.com",
    projectId: "reinstyrdb",
    storageBucket: "reinstyrdb.appspot.com",
    messagingSenderId: "480675186582",
    appId: "1:480675186582:web:71688fc65253394508bfb7"
};


initializeApp(firebaseConfig)

const db = getFirestore()



const colRefEier = collection(db, 'eier')




getDocs(colRefEier)

    .then((snapshot) => {

        let eiere = []

        snapshot.docs.forEach((doc) => {

            eiere.push({ ...doc.data(), id: doc.id })

        })

        console.log(eiere);

    }).catch(err => {

        console.log(err);

    })



const search = document.querySelector(".søkefelt");

const output = document.querySelector(".output")



search.addEventListener('submit', e => {



    e.preventDefault();



    let reinSøk = search.search.value;



    search.reset();



    DBsearch(reinSøk);



});





const reinDB = collection(db, 'reinsdyr');

const flokkDB = collection(db, 'flokk');

const eierDB = collection(db, "eier")

const beiteDB = collection(db, "beiteområde")




const reinDoc = ['flokk', 'Fødselsdato', 'navn', 'Serienummer'];

const flokkDoc = ['beiteområde', 'buenavn', 'eier', 'flokknavn', 'serieindeling'];

const eierDoc = ["kontaktspråk", "navn", "personnummer", "telefonnummer"];

const beiteDoc = ["Fylke", "område"];



async function DBsearch(input) {

    output.innerHTML = "";

    for (let i = 0; i < reinDoc.length; i++) {

        const q = query(reinDB, where(reinDoc[i], '==', input));

        const searchQ = await getDocs(q);

        searchQ.forEach((doc) => {

            output.innerHTML += `

            <div class="searchRes">

            <h4>${doc.data().navn}</h4>

            <p>Født: ${doc.data().Fødselsdato}</p>

            <p class="serienummer" id="${doc.data().flokk}">Flokk: ${doc.data().flokk}</p>

            <p>Serienummer: ${doc.data().Serienummer}</p>

            </div>

            `

        });

    };

    for (let i = 0; i < flokkDoc.length; i++) {

        const q = query(flokkDB, where(flokkDoc[i], '==', input));

        const searchQ = await getDocs(q);

        searchQ.forEach((doc) => {

            output.innerHTML += `

            <div class="searchRes">

            <h4>${doc.data().flokknavn}</h4>

            <p class="serienummer eier" id="${doc.data().eier}">Eier: ${doc.data().eier}</p>

            <p>Serieinndeling: ${doc.data().serieindeling}</p>

            <p>Beiteområde: ${doc.data().beiteområde}</p>

            <p>Buemerke: ${doc.data().buenavn}</p>

            </div>

            `

        });

    };

    for (let i = 0; i < eierDoc.length; i++) {

        const q = query(eierDB, where(eierDoc[i], '==', input));

        const searchQ = await getDocs(q);

        searchQ.forEach((doc) => {

            output.innerHTML += `

            <div class="searchRes">

            <h4>${doc.data().navn}</h4>

            <p>Kontatkspråk: ${doc.data().kontaktspråk}</p>

            <p>Navn: ${doc.data().navn}</p>

            <p>Telefonnummer: ${doc.data().telefonnummer}</p>

            <p>Personnummer: ${doc.data().personnummer}</p>

            </div>

            `

        });

    };

    for (let i = 0; i < beiteDoc.length; i++) {

        const q = query(beiteDB, where(beiteDoc[i], '==', input));

        const searchQ = await getDocs(q);

        searchQ.forEach((doc) => {

            output.innerHTML += `

            <div class="searchRes">

            <h4> ${doc.data().område}</h4>

            <p>Fylke: ${doc.data().Fylke}</p>

            </div>

            `

        });

    };



};
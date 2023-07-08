const songList = [{
    songName: "Firefly",
    artistName: ["Drax Project", "Fetty Wap"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3tKAcRdlXq74YXotYDBZAa?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Pop", "R&B", "Hip-hop"],
    country: ["New Zealand", "United States"]
},
{
    songName: "Eung Freestyle",
    artistName: ["Sik-k", "Punchnello", "Owen Ovadoz", "Flowsik"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/1eyY8771G9pLhyQM7dt1ct?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Rap", "Hip-hop"],
    country: ["South Korea"]
},
{
    songName: "Essa mina e louca",
    artistName: ["Anitta", "Jhama"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5Bn6W4bwH7Bw5nMvn8V4xF?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Pop", "Latin Pop"],
    country: ["Brazil"]
},

{
    songName: "Rara Vez",
    artistName: ["Taiu", "Milo j"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7MVIfkyzuUmQ716j8U7yGR?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Rap", "Latin Pop"],
    country: ["Argentina"]
},

{
    songName: "Essence",
    artistName: ["Wizkid", "Tems"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5FG7Tl93LdH117jEKYl3Cm?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Afrobeat", "R&B"],
    country: ["Nigeria"]
},

{
    songName: "Many Moons",
    artistName: ["Janelle Monae"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/2iry2lk41ck4AX3laA3rub?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Alternative R&B", "Progressive Soul", "R&B"],
    country: ["United States of America"]
},
{
    songName: "Bad Blood",
    artistName: ["Nao"],
    songFile: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4Iam3vZMJCMltFkK9mNruw?utm_source=generator" width="80%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    songPhoto: "Drax_Project-Firefly.jpeg",
    genres: ["Soul", "Avant-Soul", "R&B"],
    country: ["United Kingom"]
}


]
// const countryList = songList.country.map(place => `<li>${place}</li>`).join("");

var songOutput = document.getElementById("song1");
// songOutput.innerHTML =  `
// <h2><ul>
//     ${countryList}
// </ul></h2>
// Song Name: ${songList.songName} <br> 
// Artist: ${songList.artistName} <br> <br> 
// ${songList.songFile} <br> 
// ${songList.genres}`;

const results = songList.map(((obj)=>{
    let countryList = obj.country.map(place => `<li>${place}</li>`).join("")
    return `
    <h2>${countryList}</h2>
    Song Name: ${obj.songName}<br>
    Artist: ${obj.artistName}<br><br>
    Genres: ${obj.genres}<br><br>
    ${obj.songFile}<br>

    `}))
songOutput.innerHTML = results.join("<br>")
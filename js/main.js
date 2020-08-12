window.onload = () => {
    const songs_ar = [];
    doRestApi();

}
const doRestApi = (_key = "eminem") => {
    let myUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?rapidapi-key=0553c29e4bmsh3a239d5a07dbdb4p1e9ae1jsnc9399dacde13&q=${_key}`;

    fetch(myUrl)
        .then(resp => resp.json())
        .then(data => {
            songs_ar = data.data;
            if (songs_ar.length == 0) {
                document.getElementById("id_row").innerHTML = `<h2 class="text-danger">No Results Found!</h2>`;
            }
            renderAllSongs(songs_ar);

        })
        .catch(err => {
            document.getElementById("id_row").innerHTML = `<h2 class="text-danger">No Results Found!</h2>`;
        })
}

const renderAllSongs = (data) => {
    console.log(data);
    document.querySelector("main .row").innerHTML = "";
    for (var i in data) {
        let place = data[i];
        let song = new Music(document.getElementById("id_row"), place.title, place.preview, place.rank, place.artist.name, place.artist.picture_medium, place.album.title, place.album.cover_xl, place.duration);
        song.renderHTML();
    }
}

const onSearchMusic = () => {
    let userSearch = document.getElementById("id_search").value;

    // setting a default value if the user deletes all input.
    if (userSearch == "") {
        userSearch = "Pink Floyd";
    }
    doRestApi(userSearch);


}

const sortMusic = () => {
    let sortQ = document.querySelector("#id_sort").value;
    let temp_ar = songs_ar.sort(compareValues(sortQ));
    renderAllSongs(temp_ar);
}

const onCloseDarkWindow = () => {
    document.querySelector("#divHide").className = "d-none";
    document.getElementById("id_audio").pause();

}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
        const comparison = String(a[key]).localeCompare(String(b[key]));

        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

const searchInside = () => {
    for (var i in songs_ar) {
        songs_ar[i].loweredTitle = songs_ar[i].title.toLowerCase();
    }

    let userValue = document.getElementById("inside_search").value.toLowerCase();
    let filter_ar;
    filter_ar = songs_ar.filter((item) => {
        let songName = item.loweredTitle;
        if (songName.indexOf(userValue) > -1) {
            return true;
        } else {
            return false;
        }
    })
    console.log(filter_ar);
    renderAllSongs(filter_ar);
}
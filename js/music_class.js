class Music {
    constructor(_parent, _title, _preview, _rank, _artist, _img, _album, _cover, _duration) {
        this.parent = _parent;
        this.title = _title;
        this.preview = _preview;
        this.rank = _rank;
        this.artist = _artist;
        this.img = _img;
        this.album = _album;
        this.cover = _cover;
        this.duration = _duration;
    }
    renderHTML() {
        let newDiv = document.createElement("div");
        newDiv.className = "col-lg-6 border p-2";
        newDiv.style.backgroundColor = "#77BBC7";
        this.parent.appendChild(newDiv);
        newDiv.innerHTML += `
       
        <img class="w-25 mr-2 float-left rounded-circle"
            src="${this.img}">
        <h3>${this.title}</h3>
        <div>Artist: ${this.artist}</div>
        <div>Rank: ${this.rank}</div>
        <audio controls
            src="${this.preview}"></audio>
        `;
        let newBtn = document.createElement("button");
        newBtn.className = "w-100 btn btn-info";
        newBtn.style.backgroundColor = "#3F416E";
        newBtn.style.borderRadius = "30px";
        newBtn.innerHTML = "Learn more";
        newDiv.appendChild(newBtn);
        newBtn.addEventListener("click", () => {
            this.showMusicInfo();
        })

    }

    showMusicInfo() {
        // building time:
        let mins = Math.floor(this.duration / 60);
        let secs = Math.floor(this.duration % 60);
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        let fullTime = mins + ":" + secs;


        document.querySelector("#boxContent h3").innerHTML = this.title;
        document.querySelector("#boxContent img").src = this.cover;
        document.querySelector("#boxContent div").innerHTML = "Time: " + fullTime + "<br>";

        let newAudio = document.createElement("audio");
        newAudio.src = this.preview;
        newAudio.controls = true;
        newAudio.id = "id_audio"
        document.querySelector("#boxContent div").appendChild(newAudio);

        document.querySelector("#divHide").className = "dark container-fluid  center";


    }
}
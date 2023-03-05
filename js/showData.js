import { GamesDetails } from "./gamesDetails.js";
export class ShowData {
  constructor() {
    this.categories = document.getElementsByClassName("gameCats");
    this.Loader = document.querySelector(".loadingS");
    this.apiFetch("MMORPG");
    this.nav = document.querySelectorAll(".nav-item span");
    for (var i = 0; i < this.nav.length; i++) {
      this.nav[i].addEventListener("click", (e) => {
        $("html, body").animate({ scrollTop: 0 }, 0);
        document.querySelector(".nav-item .active").classList.remove("active");
        e.target.classList.add("active");
        this.category = e.target.getAttribute("data-category");
        this.apiFetch(this.category);
      });
    }
  }

  async apiFetch(category) {
    $(".gamesDetails").fadeOut(300);
    $(".loadingS").fadeIn(50);
    $("body").css("overflow", "hidden");
    let api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "155fe32252msh80ca370b8be8746p1394dajsn9304c94c87d5",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    let response = await api.json();
    this.displayData(response);
    $(".loadingS").fadeOut(500);
    $("body").css("overflow", "visible");
  }

  displayData(arr) {
    let gamesContainer = ``;
    for (let i = 0; i < arr.length; i++) {
      gamesContainer += `
      <div class="col-md-3">
      <div class="card text-center" id="${arr[i].id}">
        <img src="${arr[i].thumbnail}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between">
            ${arr[i].title}
            <span class="btn btn-primary cardBtn">Free</span>
          </h5>
          <p class="card-text">
          ${arr[i].short_description}
          </p>
          <div class="gameDevice d-flex justify-content-between">
            <span class="btn btn-dark cardBtn">${arr[i].genre}</span>
            <span class="btn btn-dark cardBtn">${arr[i].platform}</span>
          </div>
        </div>
      </div>
    </div>
      `;
    }
    document.querySelector(".gamesArea").innerHTML = gamesContainer;
    let details = new GamesDetails();
  }
}

export class GamesDetails {
  constructor() {
    if ((this.cards = !undefined)) {
      this.cards = document.getElementsByClassName("card");
      for (var i = 0; i < this.cards.length; i++) {
        this.cards[i].addEventListener("click", (e) => {
          this.DetailsPage();
          this.gameDetailsApi(e.currentTarget.getAttribute("id"));
        });
      }
    }
  }
  DetailsPage() {
    $(".navbar").fadeOut(300);
    $(".gamesContainer").fadeOut(300);
    $(".background").fadeOut(300);
  }
  async gameDetailsApi(id) {
    $(".loadingS").fadeIn(100);
    $("body").css("overflow", "hidden");
    $(".gamesDetails").fadeIn(300);
    let api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
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
    $(".loadingS").fadeOut(500);
    $("body").css("overflow", "visible");
    this.displayDetails(response);
  }
  displayDetails(arr) {
    document.getElementById("gameImg").setAttribute(`src`,`${arr.thumbnail}`);
    document.getElementById("gameName").innerText=`${arr.title}`
    document.getElementById("gameCategory").innerText=`${arr.genre}`
    document.getElementById("gamePlatform").innerText=`${arr.platform}`
    document.getElementById("gameStatus").innerText=`${arr.status}`
    document.getElementById("gameDiscretion").innerText=`${arr.description}`
    document.getElementById("gameLink").setAttribute(`href`,`${arr.game_url}`);
    document.getElementById("closeBtn").addEventListener("click",function(){

      $(".gamesDetails").fadeOut(300);
      $(".navbar").fadeIn(300);
      $(".gamesContainer").fadeIn(300);
      $(".background").fadeIn(300);

    })
  }
}

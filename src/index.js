// write your code here
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/ramens")
      .then((res) => res.json())
      .then((data) => data.forEach(buildRamenCard));
    document.querySelector("#new-ramen").addEventListener("submit", addNewRamen);
  });
  
  function buildRamenCard(ramenObj) {
    const ramenMenuDiv = document.querySelector("#ramen-menu");
    let ramenPic = document.createElement("img");
    ramenPic.src = ramenObj.image;
    ramenPic.setAttribute("id", `${generateNewId()}`);
    ramenPic.addEventListener("click", showRamenInfo);
    ramenMenuDiv.append(ramenPic);
    document.querySelector(".detail-image").src = ramenPic.src;
    document.querySelector(".name").textContent = ramenObj.name;
    document.querySelector(".restaurant").textContent = ramenObj.restaurant;
    document.querySelector("#rating-display").textContent = ramenObj.rating;
    document.querySelector("#comment-display").textContent = ramenObj.comment;
  }
  
  function showRamenInfo(e) {
    fetch(`http://localhost:3000/ramens/${e.target.id}`)
      .then((res) => res.json())
      .then((data) => {
        const infoDiv = document.querySelector("#ramen-detail");
        infoDiv.children[0].src = data.image;
        infoDiv.children[1].textContent = data.name;
        infoDiv.children[2].textContent = data.restaurant;
        document.querySelector("#rating-display").textContent = data.rating;
        document.querySelector("#comment-display").textContent = data.comment;
      });
  }
  const generateNewId = idCounterClosure();
  function idCounterClosure() {
    let ourId = 0;
    return () => (ourId += 1);
  }
  
  function addNewRamen(e) {
    firstEvent = e;
    let newRamen = document.createElement("img");
    newRamen.src = e.target.querySelector("#new-image").value;
    newRamen.setAttribute("id", `${generateNewId()}`);
    newRamen.addEventListener("click", () => {
      console.log(firstEvent.target);
      const infoPic = document.querySelector("#ramen-detail");
      infoPic.children[0].src = newRamen.src;
      infoPic.children[1].textContent =
        firstEvent.target.querySelector("#new-name").value;
      infoPic.children[2].textContent =
        firstEvent.target.querySelector("#new-restaurant").value;
      document.querySelector("#rating-display").textContent =
        firstEvent.target.querySelector("#new-rating").value;
      document.querySelector("#comment-display").textContent =
        firstEvent.target.querySelector("#new-comment").value;
    });
    document.querySelector("#ramen-menu").append(newRamen);
  }
  
  //POST to json.db
  const submitForm = document.querySelector("#new-ramen");
  submitForm.addEventListener("submit", (e) => {
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.querySelector("#new-name").value,
        restaurant: e.target.querySelector("#new-restaurant").value,
        image: e.target.querySelector("#new-image").value,
        rating: e.target.querySelector("#new-rating").value,
        comment: e.target.querySelector("#new-comment").value,
      }),
    });
  });
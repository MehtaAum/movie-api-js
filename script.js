let box = document.querySelector(".box")
let input = document.querySelector(".input-search")
let flag = true
let timer

input.addEventListener("input", function () {

 clearTimeout(timer)
 timer = setTimeout(() => { //api rate limit set


       box.innerHTML = ""

    if (!input.value) return;

    fetch(`http://www.omdbapi.com/?s=${input.value}&apikey=1493ff80`)
        .then((request) => request.json())
        .then((response) => {
            

        if(response.Response === "True"){
                flag = false
                for(let i = 0; i < response.Search.length;i++){
                let divs = document.createElement("div")
                divs.classList = `img-box`
                box.appendChild(divs)

                let img = document.createElement("img")
                img.setAttribute("src",response.Search[i].Poster)
                img.setAttribute("alt", "Img not found")
                divs.appendChild(img)

                let title = document.createElement("h5")
                title.innerHTML = `Title : ${response.Search[i].Title}`
                divs.appendChild(title)

                let Year = document.createElement("h5")
                Year.innerHTML = `Year : ${response.Search[i].Year}`
                divs.appendChild(Year)


                fetch(`http://www.omdbapi.com/?i=${response.Search[i].imdbID}&apikey=1493ff80`)
                .then((req) => req.json())
                .then((detail) => {
                    let Director = document.createElement("h5")
                    Director.innerHTML = `Director : ${detail.Director}`
                    divs.appendChild(Director)

                    let Language = document.createElement("h5")
                    Language.innerHTML = `Language : ${detail.Language}`
                    divs.appendChild(Language)

                    let imdbRating = document.createElement("h5")
                    imdbRating.innerHTML = `imdbRating : ${detail.imdbRating}`
                    divs.appendChild(imdbRating)

                    let Awards = document.createElement("h5")
                    Awards.innerHTML = `Awards : ${detail.Awards}`
                    divs.appendChild(Awards)
                })
            }
        }
        else if(!flag && response.Response === "False"){
            box.innerHTML = `<div class="w-[100%] flex justify-center"><p>No movies found.</p></div>`
            flag = true
        }
            
    })

  }, 500);    

})

 






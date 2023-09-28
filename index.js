// const input=document.getElementById('input');
// const button=document.getElementById('btn');
// const MovieList=document.getElementById('ml');

// button.addEventListener('click', function() {
//     if(input.value.trim()===' ')
//     {
//         MovieList.innerHTML="<p>Please Enter Something</p>";

//     }
//     else{
//         fetchData();
//     }

// });
// async function fetchData()
// {
//     try{
//         const response=await fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=98ade4`);
//         const data=await response.json();
//         console.log(data);
//         if(!(response.ok)){
//             throw new Error("Network Error")

//         }
//         else{
//             const movies=data.search;
//             movies.forEach(ele => {
//                 const movie=document.createElement('div');
//                 movie.classList.add('movie');
//                 MovieList.append(movie);
//                 movie.innerHTML=`Movie name: ${ele.title}`
//             })
//         }
//     }
//     catch(Error)
//     {
//         console.log(Error)
//     }
// }

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesContainer = document.querySelector('.movies');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        return;
    }

    // Clear previous search results
    moviesContainer.innerHTML = '';

    // Fetch movie data from OMDB API
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=98ade4`)
        .then((response) => response.json())
        .then((data) => {
            if (data.Search) {
                data.Search.forEach((movie) => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.innerHTML = `
                        <h2>${movie.Title}</h2>
                        <p>Year: ${movie.Year}</p>
                        <img src="${movie.Poster}" alt="${movie.Title}">`;
                    moviesContainer.appendChild(movieCard);
                });
            } else {
                moviesContainer.innerHTML = '<p>No results found</p>';
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            moviesContainer.innerHTML = '<p>An error occurred</p>';
        });
});
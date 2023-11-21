const API = "https://api.themoviedb.org/3/";

export function get(path) {
    return fetch(API+path, {
        headers: {
            Authorization: 
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjJlNjM3NDc0ZmY4NmExOGFjODI5YjgzNGQ2OTBmMCIsInN1YiI6IjY1NGI4NmZlNGYzM2FkMDBhZTRiMjI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mikmV_mJP5xGb9lJmLI41YBYI1IK5RZQDgV-93yDWrA',
            "Content-Type": "application/json;charset=utf-8",
        },
    }).then((result) =>result.json());
    
}
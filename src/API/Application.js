export const myApplitionPromise = email => {
    return fetch(`http://localhost:3000/workings?email=${email}`)
        .then(res => res.json())
}
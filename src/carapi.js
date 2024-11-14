// carapi.js
const BASE_URL = 'https://car-rest-service-carshop.2.rahtiapp.fi/cars';

export function fetchCars() {
    return fetch(BASE_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);
            return response.json();
        });
}

export function deleteCar(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText);
            return response;
        });
}

export function saveCar(car) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in saving: " + response.statusText);
        return response.json();
    });
}

export function updateCar(url, car) {
    // Extract ID from URL
    const id = url.split('/').pop();
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in updating: " + response.statusText);
        return response.json();
    });
}
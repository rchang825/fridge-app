const hostname = 'http://localhost:5050';
async function createList () {
    //post request for new list link
    const endpoint = `${hostname}/list`;
    try {
        const response = await fetch(endpoint, {
            method: "POST"
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }        
    } catch (error) {
        console.log(error);
    }
}

export { createList };
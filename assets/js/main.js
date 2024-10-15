var toTopButton = document.getElementById("to-top-button");

if (toTopButton) {

    window.onscroll = function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            toTopButton.classList.remove("hidden");
        } else {
            toTopButton.classList.add("hidden");
        }
    };

    window.goToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString(navigator.language, { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}


export async function fetchPosts(endpoint, page = 1, limit = 9, ajax = 1) {
    try {
        const url = window.location.origin + endpoint + (endpoint.includes('?') ? '&' : '?') + 'page=' + page + '&limit=' + limit + '&ajax=' + ajax;
        console.log(url);
        const response = await fetch(url);
        const data = await response.text();
        const dataStr = data.replaceAll('\n', '').replaceAll('&quot;', '"');
        const jsonData = JSON.parse(dataStr);
        console.log(jsonData);
        return jsonData;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return { data: [] };
    }
}
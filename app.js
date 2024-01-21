document.addEventListener('DOMContentLoaded', function () {
    const appElement = document.getElementById('app');
    const apiUrl = 'https://api.github.com/users';

    let data = [];
    let loading = true;

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            data = await response.json();
            loading = false;
            render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

    const fuse = new Fuse(data, {
        keys: ['login'],
    });

    const render = () => {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const results = fuse.search(query);
        const searchedData = query ? results.map(result => result.item) : data;

        const appContent = `
            <nav class="navbar bg-light" style="margin-top: 5%;">
                <div class="container-fluid">
                    <form class="d-flex" role="search" style="display: flex; margin: auto;">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchInput" oninput="render()" />
                    </form>
                </div>
            </nav>
            <div class="container my-5 py-5">
                <div class="row justify-content-center">
                    ${loading ? getLoadingHTML() : getProductsHTML(searchedData)}
                </div>
            </div>
        `;

        appElement.innerHTML = appContent;
    };

    const getLoadingHTML = () => {
        return `
            <div class='col-md-3'>
                <div class='skeleton'></div>
            </div>
            <div class='col-md-3'>
                <div class='skeleton'></div>
            </div>
            <div class='col-md-3'>
                <div class='skeleton'></div>
            </div>
            <div class='col-md-3'>
                <div class='skeleton'></div>
            </div>
        `;
    };

    const getProductsHTML = (products) => {
        return products.map(product => `
            <div class='col-md-3 mb-4' key='${product.id}'>
                <div class='card h-100 text-center p-4'>
                    <img src='${product.avatar_url}' class='card-img-top' alt='${product.title}' height='250px' />
                    <div class='card-body'>
                        <h5 class='card-title mb-0'>${product.login.substring(0, 100)}</h5>
                        <br />
                      
                        <a href='index2.html?login=${product.login}' class='btn btn-outline-dark'>SHOW REPOS</a>
                    </div>
                </div>
            </div>
        `).join('');
    };
});

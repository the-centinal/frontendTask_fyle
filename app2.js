document.addEventListener('DOMContentLoaded', function () {
    const appElement = document.getElementById('app');
    const login = new URLSearchParams(window.location.search).get("login");

    const product = [];
    // let loading = true;
    const currentPage = 1;
    const postsPerPage = 10;

    const fetchData = async () => {
        try {
            // setLoading(true);
            const response = await fetch(`https://api.github.com/users/${login}/repos`);
            const data = await response.json();
            product.push(...data);
            // setLoading(false);
            render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

    // const getParamsFromURL = () => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     return { login: urlParams.get('login') };
    // };

    const render = () => {
        const appContent = `
        <div class = "userName">
        <h2>${login} Repositories</h2>
        </div>
            <div class="container my-5 py-2">
                <div class="row justify-content-center">
                    ${getProductsHTML()}
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

    const getProductsHTML = () => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentProduct = product.slice(indexOfFirstPost, indexOfLastPost);

      
        return currentProduct.map(rep => `
      
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${rep.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${rep.full_name}</h6>
                    <p class="card-text">${rep.description}</p>
                    <a href="${rep.html_url}" class="card-link" target="_blank">REPO LINK</a>
                </div>
            </div>
        `).join('');
    };
    const totalPosts = `${product.length}`;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const getPaginationHTML = () => {
        return `
            <ul class='pagination'>
        {pageNumbers.map(number => (
            <li key={number} class='page-item'>
              <a onClick={() => paginate(number)} class='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
    //     `;
    };
});

const login = isPublic => {
    const loading = document.getElementById("login-loading");
    const error = document.getElementById("login-error");

    document.getElementById("login-box").classList.remove("d-none");
    loading.classList.remove("d-none");

    if (!error.classList.contains("d-none")) {
        error.classList.add("d-none");
    }

    fetch(`https://grillbot.cloud/api/auth/link?isPublic=${isPublic}`)
        .then(res => {
            if (!res.ok) {
                loading.classList.add("d-none");
                document.getElementById("login-error").classList.remove("d-none");
            }

            res.json()
                .then(json => location.href = json.url)
                .catch(_ => {
                    loading.classList.add("d-none");
                    document.getElementById("login-error").classList.remove("d-none");
                });
        })
        .catch(_ => {
            loading.classList.add("d-none");
            document.getElementById("login-error").classList.remove("d-none");
        });
};

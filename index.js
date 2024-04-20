if (localStorage.getItem('prefersDarkTheme') === 'true') {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

document.getElementById("dark").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (localStorage.getItem('prefersDarkTheme') === 'true') {
        localStorage.setItem('prefersDarkTheme', 'false');
    } else {
        localStorage.setItem('prefersDarkTheme', 'true');
    }
});
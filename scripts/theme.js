const darkModeToggle = document.getElementById('dark-mode-toggle');
const c = document.getElementById('myCanvas');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Désactiver Dark Mode';
        // Change canvas background color to black
        c.style.backgroundColor = '#000';
        c.style.borderColor = '#fff'
    } else {
        darkModeToggle.textContent = 'Activer Dark Mode';
        // Reset canvas background color to white
        c.style.backgroundColor = '#fff';
        c.style.borderColor = '#000'
    }
});

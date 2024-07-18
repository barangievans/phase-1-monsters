document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000/monsters'; // API endpoint URL
    
    let page = 1;
    const limit = 50;
    
    const monsterContainer = document.getElementById('monster-container');
    const loadMoreButton = document.getElementById('load-more');
    const createMonsterForm = document.getElementById('create-monster-form');
    
    // Function to fetch monsters from API
    function fetchMonsters() {
        fetch(`${apiUrl}?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => {
                    displayMonster(monster);
                });
                page++; // Increment page for next load
            })
            .catch(error => console.error('Error fetching monsters:', error));
    }
    
    // Function to display a single monster
    function displayMonster(monster) {
        const monsterElement = document.createElement('div');
        monsterElement.classList.add('monster');
        monsterElement.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterElement);
    }
    
    // Event listener for form submission to create a new monster
    createMonsterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const description = document.getElementById('description').value;
        
        const newMonster = {
            name: name,
            age: parseFloat(age), // Convert to number
            description: description
        };
        
        saveMonster(newMonster);
    });
    
    // Function to save monster to the API
    function saveMonster(monster) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(monster)
        })
        .then(response => response.json())
        .then(createdMonster => {
            displayMonster(createdMonster); // Display the newly created monster
            createMonsterForm.reset(); // Reset form fields
        })
        .catch(error => console.error('Error creating monster:', error));
    }
    
    // Event listener for 'Load More' button
    loadMoreButton.addEventListener('click', function() {
        fetchMonsters();
    });
    
    // Initial load of monsters when the page loads
    fetchMonsters();
});
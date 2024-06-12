document.addEventListener('DOMContentLoaded', () => {
    const incidentForm = document.getElementById('incidentForm');
    const incidentList = document.querySelector('.incidents-list');

    let incidents = [];

    
    const loadIncidents = () => {
        const storedIncidents = localStorage.getItem('incidents');
        if (storedIncidents) {
            incidents = JSON.parse(storedIncidents);
            renderIncidents();
        }
    };

  
    const saveIncidents = () => {
        localStorage.setItem('incidents', JSON.stringify(incidents));
    };

   
    const renderIncidents = () => {
        incidentList.innerHTML = '';
        incidents.forEach((incident, index) => {
            const li = document.createElement('li');
            li.className = 'incident';
            li.innerHTML = `
                <h3>${incident.type}</h3>
                <p>${incident.description}</p>
                <p><strong>Location:</strong> ${incident.location}</p>
                <p><strong>Date:</strong> ${new Date(incident.date).toLocaleString()}</p>
            `;
            incidentList.appendChild(li);
        });
    };

   
    incidentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;

        const newIncident = {
            type,
            description,
            location,
            date: new Date().toISOString()
        };

        incidents.push(newIncident);
        saveIncidents();
        renderIncidents();

        incidentForm.reset();
    });

    loadIncidents();
});




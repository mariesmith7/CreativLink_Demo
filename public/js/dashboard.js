// fetch results of art events/show exhibition for #eventResults
// render the results #searchResults
// .eventGrid class to display events in card view for css later *

// fetch api searchs for artist and vistors 
// one ai api and a couple art event apis 
// add event listners

// waits for DOM to fully load first - standard syntax 
// ai and event brite api, add mesuem api later*
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('aiSearchForm');
  const queryInput = document.getElementById('aiQuery');
  const resultsContainer = document.getElementById('searchResults');
  const eventResults = document.getElementById('eventResults');

  // ai search 
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const query = queryInput.value.trim();
      if (query === '') {
        alert('Please enter a search');
        return;
      }
// type events in here* 
      resultsContainer.innerHTML = `<p>Event 1 happy days</p>
      <span> come visit today</span>`;

      // try {
      //   // fetch api to create a http post req 
      //   const response = await fetch('/search/ai', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ query })
      //   });

      //   const data = await response.json();
      //   resultsContainer.innerHTML = '';

      //   if (data && data.results && data.results.length > 0) {
      //     data.results.forEach(function(event) {
      //       const div = document.createElement('div');
      //       div.className = 'eventResult';
           
      //       const title = event.title;
      //       const location = event.location;
      //       const description = event.description;
      //       const url = event.url;
      //       const date = event.date ? event.date : 'Date TBA';

      //       div.innerHTML = `
      //         <h3>${title}</h3>
      //         <p><strong>Location:</strong> ${location}</p>
      //         <p><strong>Date:</strong> ${date}</p>
      //         <p>${description}</p>
      //         <a href="${url}" target="_blank">View Event</a>
      //       `;

      //       resultsContainer.appendChild(div);
      //     });
      //   } else {
      //     resultsContainer.innerHTML = 'No events found.';
      //   }
      // } catch (error) {
      //   console.error('AI search failed:', error);
      //   resultsContainer.innerText = 'An error occurred while searching.';
      // }
    });
  }

////////////////////////////////////
//reflects on index.ejs
////////////////////////////////////

//  load eventbrite events
/*
if (eventResults && eventResults.dataset.fetch === 'true') {
  fetchEventbriteEvents();
}

async function fetchEventbriteEvents() {
  try {

    eventResults.innerHTML = '<p>Loading events...</p>';

    const response = await fetch('/api/events');
    const events = await response.json();

    //eventResults.innerHTML = ''; update to loading events instead

    if (events && events.length > 0) {
      events.forEach(function (event) {
        const div = document.createElement('div');
        div.className = 'eventCard';

        const title = event.name.text;
        const location = event.venue && event.venue.name ? event.venue.name : 'Location To Be Announced';
        const description = event.description && event.description.text
          ? event.description.text.slice(0, 120) // 120 words max
          : 'No description available.';
        const url = event.url;
        const date = event.start && event.start.local
          ? new Date(event.start.local).toLocaleDateString()
          : 'Date TBA';

        div.innerHTML = `
          <h3>${title}</h3>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p>${description}</p>
          <a href="${url}" target="_blank">View Event</a>
        `;

        eventResults.appendChild(div);
      });
    } else {
      eventResults.innerHTML = '<p> No upcoming events found. </p>';
    }
  } catch (err) {
    console.error('Error loading Eventbrite events:', err);
    eventResults.innerHTML = '<p> Error loading external events. </p>';
  } 
}*/
});
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
      resultsContainer.innerHTML = `


     <section class="eventdescription">
            <img src="/imgs/mam.png">
            <span class="eventtitle"> <strong> MAM Art Gala </strong> </span>
            <p class="eventdesc"> The Montclair Art Museum invites you to an evening of artistic celebration at our
              annual
              Spring Gala. Dine in MAM's beautifully transformed Leir Hall as we honor three luminaries whose vision and
              dedication have strengthened our cultural landscape. </p>
            <span class="date"> May 17, 2025 6pm -10pm </span>
            <span class="eventlocation"> <strong> Montclair Art Museum </strong></span>
            <span class="eventaddress"> 3 S Mountain Ave, Montclair, NJ 07042 </span>
            <span class="eventaddinfo"> General Admission: FREE </span>
            <span class="moreinfo"> <a
                href="https://www.montclairartmuseum.org/events/events-and-programs/mam-art-gala">Learn More</a> </span>
          </section>


          <section class="eventdescription">
            <img src="imgs/bridgeart.png">
            <span class="eventtitle"> <strong> Bridge Art Exchange June 2025 </strong></span>
            <p class="eventdesc"> This event provides a unique opportunity for artists to showcase their work, share
              insights into their creative processes + engage w/artist </p>
            <span class="date"> Saturday, June 14 · 10am - 12pm EDT </span>
            <span class="eventlocation"> <strong> Bridge Art Gallery </strong></span>
            <span class="eventaddress"> 213 North Market Street Wilmington, DE 19801 </span>
            <span class="eventaddinfo"> General Admission: FREE </span>
            <span class="moreinfo"> <a
                href="https://www.eventbrite.com/e/bridge-art-exchange-june-2025-tickets-1361714878859?aff=ebdssbdestsearch">Learn
                More</a> </span>
          </section>


          <section class="eventdescription">
            <img src="/imgs/art1940.png">
            <span class="eventtitle"> <strong> Boom: Art and Design in the 1940s </strong></span>
            <p class="eventdesc"> This exhibition will showcase art from across the decade, featuring works drawn
              entirely
              from the museum’s permanent collections. </p>
            <span class="date"> Ongoing - September 1, 2025 </span>
            <span class="eventlocation"> <strong> Philadelphia Museum of Art</strong> </span>
            <span class="eventaddress"> 2600 Benjamin Franklin Pkwy, Philadelphia, PA 19130 </span>
            <span class="eventaddinfo"> General Admission: $35 </span>
            <span class="moreinfo"> <a href="https://philamuseum.org/calendar/exhibition/boom-art-design-1940s">Learn
                More</a> </span>
          </section>



          <section class="eventdescription">
            <img src="/imgs/delart.png">
            <span class="eventtitle"> Imprinted: Illustrating Race </span>
            <p class="eventdesc"> Imprinted: Illustrating Race with co-curator
              Robyn
              Phillips-Pendleton. The exhibition honors Rockwell’s powerful
              images supporting the Civil Rights Movement, displaying his work within a sweeping historical survey of
              American illustration ... </p>
            <span class="date"> Oct 18, 2025 - Mar 1, 2026 </span>
            <span class="eventlocation"> Delaware Art Museum </span>
            <span class="eventaddress"> 2301 Kentmere Pkwy, Wilmington, DE 19806 </span>
            <span class="eventaddinfo"> General Admission: $18 </span>
            <span class="moreinfo"> <a href="https://delart.org/event/imprinted/">Learn More</a> </span>
          </section>


          <span> View more here </span>
      
      `;

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
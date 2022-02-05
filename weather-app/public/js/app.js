// Client side JavaScript is loaded

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {

  /* The preventDefault() method cancels the event if it is cancelable, meaning
   * that the default action that belongs to the event will not occur. For example,
   * this can be useful when: Clicking on a "Submit" button, prevent it from
   * submitting a form. Clicking on a link, prevent the link from following the URL.
   */
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  weatherFrom(location).then();
});

const weatherFrom = async (location) => {
  const response = await fetch(`http://localhost:3001/weather?address=${location}`);

  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  });
}

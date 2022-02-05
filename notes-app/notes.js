const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
}

const addNote = (title, body) => {
  const notes = loadNotes();

  const noteFound = notes.find(note => note.title === title);

  if (noteFound !== undefined) {
    errorMessage('Note title taken!');
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);

  successMessage('New note added!');
}

const removeNote = (title) => {
  const notes = loadNotes();

  const noteIndex = notes.findIndex(note => note.title === title);

  if (noteIndex === -1) {
    errorMessage('Note title not found!');
    return;
  }

  notes.splice(noteIndex, 1);
  saveNotes(notes);

  successMessage('Note removed!');
}

const listNotes = () => {
  infoMessage('Your notes');

  const notes = loadNotes();
  notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
  const notes = loadNotes();

  const noteFound = notes.find(note => note.title === title);

  if (noteFound) {
    const titleStyled = chalk.blue.inverse(noteFound.title);
    console.log(`${titleStyled} ${noteFound.body}`);

    return;
  }

  errorMessage(`"${title}" note not found!`);
}

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
}

/**
 * Returns the notes.js object.
 */
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const successMessage = (msg) => {
  console.log(chalk.green.inverse(msg))
}

const infoMessage = (msg) => {
  console.log(chalk.blue.inverse(msg))
}

const errorMessage = (msg) => {
  console.log(chalk.red.inverse(msg))
}

module.exports = {
  getNotes,
  readNote,
  addNote,
  listNotes,
  removeNote,
};

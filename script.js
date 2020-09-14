console.log('Does it work?');
fetch('people.json')
.then(result => result.json())
.then(people => people.filter(person => person.lastname === Krajcik));
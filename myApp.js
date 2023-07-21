require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Samantha',
    age: 30,
    favoriteFoods: ['apple', 'pasta', 'chips']
  });
  return person.save((error, person) => {
    if (error) {
      console.log('person.save', error);
      done(error, null);
      return;
    }
    console.log('person.save', person);
    done(null, person);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  return Person.create(arrayOfPeople, (error, people) => {
    if (error) {
      console.log('Person.create', error);
      done(error, null);
      return;
    }
    console.log('Person.create', people);
    done(null, people);
  });
};

const findPeopleByName = async (personName, done) => {
  await Person.find({ name: personName }, (error, people) => {
    if (error) {
      console.log('Person.find', error);
      done(error, null);
      return;
    }
    console.log('Person.find', people);
    done(null, people);
  });
};

const findOneByFood = async (food, done) => {
  await Person.findOne({ favoriteFoods: { $in: [food] } }, (error, person) => {
    if (error) {
      console.log('Person.findOne', error);
      done(error, null);
      return;
    }
    console.log('Person.findOne', person);
    done(null, person);
  });
};

const findPersonById = async (personId, done) => {
  await Person.findById(personId, (error, person) => {
    if (error) {
      console.log('Person.findById', error);
      done(error, null);
      return;
    }
    console.log('Person.findById', person);
    done(null, person);
  });
};

const findEditThenSave = async (personId, done) => {
  await findPeopleByName(personId, async (error, person) => {
    if (error) {
      console.log(error);
      done(error, null);
      return;
    }
    if (!person) {
      console.log('Person not found');
      done(new Error('Person not found'), null);
      return;
    }
    const foodToAdd = 'hamburger';
    person.favoriteFoods.push(foodToAdd);
    await person.save((error, person) => {
      if (error) {
        console.log(error);
        done(error, null);
        return;
      }
      console.log(person);
      done(null, person);
    });
  });
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  await Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (error, person) => {
    if (error) {
      console.log('Person.findOneAndUpdate', error);
      done(error, null);
      return;
    }
    console.log('Person.findOneAndUpdate', person);
    done(null, person);
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

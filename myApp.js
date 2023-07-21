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

// const removeById = async (personId, done) => {
//   await Person.findByIdAndRemove(personId, (error, person) => {
//     if (error) {
//       console.log('Person.findByIdAndRemove', error);
//       done(error, null);
//       return;
//     }
//     console.log('Person.findByIdAndRemove', person);
//     done(null, person);
//   });
// };
var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = async (done) => {
  const nameToRemove = 'Mary';
  await Person.remove({ name: nameToRemove }, (error, outcome) => {
    if (error) {
      console.log('Person.remove', error);
      done(error, null);
      return;
    }
    console.log('Person.remove', outcome);
    done(null, outcome);
  });
};

const queryChain = async (done) => {
  const foodToSearch = 'burrito';
  const onExec = (error, people) => {
    if (error) {
      console.log(error);
      done(error, null);
      return;
    }
    console.log(people);
    done(null, people);
  };
  await Person.find({ favoriteFoods: { $in: [foodToSearch] } }).sort('name').limit(2).select('-age').exec(onExec);
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

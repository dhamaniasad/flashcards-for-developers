const mongoose = require("mongoose");

const Deck = require("../server/models/Deck");
const Collection = require("../server/models/Collection");
const config = require("../config/index");

require("../database/index")();

mongoose.set("useFindAndModify", false);

const getCollectionFromRecord = (record, index) => ({
  airtableId: record.id,
  name: record.get("Name"),
  description: record.get("Description"),
  airtableDecks: record.get("Decks"),
  emoji: record.get("Emoji"),
  color: record.get("Color"),
  order: index,
});

// Load collections data from JSON file
const collectionsSeedData = require("../data_sample/collections.json");

// Fetches 'Collections' records from Airtable
const fetchCollections = async () => {
  const results = collectionsSeedData;
  return results;
};

// Creates copy of record in the database
const writeCollectionsToDatabase = async collections => {
  collections.forEach(async collection => {
    const { airtableDecks, ...rest } = collection;
    // Converts decks from airtable ids to mongodb ids
    const decks = await Deck.find({
      airtableId: { $in: airtableDecks },
    });

    await Collection.findOneAndUpdate(
      { airtableId: collection.airtableId },
      { ...rest, decks: decks.map(el => el._id) },
      { upsert: true },
    );
  });

  return await Collection.countDocuments();
};

async function sync_collections_to_database() {
  try {
    const collections = await fetchCollections();

    const collectionCount = await writeCollectionsToDatabase(collections);

    console.log("Success! Number of collections written: ", collectionCount);
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

sync_collections_to_database();

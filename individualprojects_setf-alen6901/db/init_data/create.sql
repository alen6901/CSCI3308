DROP TABLE IF EXISTS searchHistory;
CREATE TABLE IF NOT EXISTS searchHistory (
  drinkName VARCHAR(30),   
  drinkCategory VARCHAR(30),
  drinkUrl VARCHAR(100),
  drinkTags VARCHAR(100),
  drinkInstructions VARCHAR(300)
);
CREATE TABLE languages (
  id INT AUTO_INCREMENT,
  code VARCHAR(2) NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE pages (
  id INT AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE translations (
  id INT AUTO_INCREMENT,
  language_id INT NOT NULL,
  page_id INT NOT NULL,
  title TEXT,
  rate_scale TEXT,
  rental TEXT,
  motorcycle TEXT,
  bike TEXT,
  tricycle TEXT,
  jeepney TEXT,
  bus TEXT,
  taxi TEXT,
  van TEXT,
  boat TEXT,
  ferry TEXT,
  train TEXT,
  private_vehicle TEXT,
  note TEXT,
  in_city TEXT,
  outside_city TEXT,
  province TEXT,
  city_mun TEXT,
  foreign_country TEXT,
  specify TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (language_id) REFERENCES languages(id),
  FOREIGN KEY (page_id) REFERENCES pages(id)
);

INSERT INTO languages (code, name) VALUES
  ('en', 'English'),
  ('ja', 'Japanese');

INSERT INTO pages (name) VALUES
  ('page1'),
  ('page2');

INSERT INTO translations (language_id, page_id, title, rate_scale, rental, motorcycle, bike, tricycle, jeepney, bus, taxi, van, boat, ferry, train, private_vehicle, note, in_city, outside_city, province, city_mun, foreign_country, specify) VALUES
  (1, 1, 'What modes of transportation did/will you use in the city/municipality? (Check all that apply)', 'Rate each on a scale of 1-4, with 4 being the highest.', 'Rental MotorCycle / Car / Van', 'Motorcycle (Habal-habal)', 'Bike / Pedicab', 'Tricycle', 'Jeepney', 'Bus', 'Taxi / Grab', 'Van / AUV (public utility)', 'Small Boat (Bangka)', 'Ferry / Commercial Ship (big)', 'Train (e.g. MRT, LRT, PNR)', 'Private Vehicle (No need to rate)', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
  (1, 2, 'Where do you live?', '(Note: Please specify where you are from.)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'In this City/Municipality', 'Outside this City/Municipality (specify)', 'Province:', 'City/Mun:', 'Are you from a foreign country?', 'Specify:'),
  (2, 1, '市/町で使用した/使用予定の交通手段は何ですか？（該当するものすべてにチェックを入れてください）', 'それぞれを1から4のスケールで評価してください。4が最も高い評価です。', 'レンタルバイク/車/バン', 'バイク（ハバルハバル）', '自転車/ペディキャブ', 'トライシクル', 'ジープニー', 'バス', 'タクシー/グラブ', 'バン/AUV（公共交通機関）', '小型ボート（バンカ）', 'フェリー/大型商船', '電車（MRT、LRT、PNRなど）', '自家用車（評価不要）', NULL, NULL, NULL, NULL, NULL, NULL),
  (2, 2, 'あなたの住んでいる場所はどこですか？', '(注意：出身地を指定してください。)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'この市/町内', 'この市/町外（指定してください）', '県:', '市/町:', '外国出身ですか？', '指定:');

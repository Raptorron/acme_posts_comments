const pg = require('pg');
const uuid = require('uuid');
const {Client} = pg;

const client = new Client('postgres://localhost/posttag_db');

client.connect();

const NodeId = uuid.v4();
const ExpressId = uuid.v4();
const ReactId = uuid.v4();
const ChallengingId = uuid.v4();
const LoveId = uuid.v4();
const WhatId = uuid.v4();

const SQL =`
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
  id UUID PRIMARY KEY,
  topic VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE tags(
  id UUID PRIMARY KEY,
  text VARCHAR(255) UNIQUE NOT NULL,
  post_id UUID REFERENCES posts(id)
);

INSERT INTO posts(id, topic) VALUES('${NodeId}', 'Node');
INSERT INTO posts(id, topic) VALUES('${ExpressId}', 'Express');
INSERT INTO posts(id, topic) VALUES('${ReactId}', 'React');

INSERT INTO tags(id, text, post_id) VALUES('${ChallengingId}', 'Challenging', '${ExpressId}');
INSERT INTO tags(id, text, post_id) VALUES('${LoveId}', 'Love it', ${ReactId});
INSERT INTO tags(id, text, post_id) VALUES('${WhatId}', 'What??', ${ReactId});
`

const syncAndSeed = async () => {
  await client.query(SQL);
  console.log('success');
};

const findAllTags = async () =>{
  const response = await client.query('SELECT * FROM tags');
  return response.rows;
}

const findAllPosts = async () => {
  const response = await client.query('SELECT * FROM posts');
  return response.rows;
}

module.exports={
  syncAndSeed,
  findAllTags,
  findAllPosts
}

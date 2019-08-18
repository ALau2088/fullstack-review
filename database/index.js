const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoName: String,
  author: String,
  url: String,
  description: String,
  created: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repos = new Repo({
    repoName: data.name,
    author: data.owner.login,
    url: data.owner.url,
    description: data.description,
    created: data.created_at
  })
  repos.save(function (err, repos) {
    if (err) return console.error(err);
    console.log('repos Saved!')
  })
}

module.exports.save = save;
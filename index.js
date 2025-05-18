import jsonfile from "jsonfile";
import moment from "moment";
import random from "random";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

const makeCommits = (n) => {
  if (n === 0) {
    git.push(); // Push changes at the end
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  console.log("Committing with date:", date);

  jsonfile.writeFile(path, data, () => {
    git
      .add([path])
      .commit("Commit on " + date, { "--date": date })
      .then(() => makeCommits(n - 1));
  });
};

makeCommits(100);

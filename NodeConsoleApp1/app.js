// We import the object from the data file. Inside that object there is a function to get players data
const { exit } = require("process");
const data = require("./data");
const readline = require('readline');
const players = data.getPlayers();
function checkData() {
    if (players.length === 0) {
        console.log("No data available.");
        process.exit()
    }
}

checkData();

function pauseAndContinue(message = "Press Enter to continue...") {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(message, () => {
            rl.close();
            resolve();
        });
    });
}

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

// Your code
function displayPlayers() {
    players.forEach((player, index) => {
        console.log(`PLAYER ${index + 1}`);
        console.log(`NAME: ${player.name}`);
        console.log(`LASTNAME: ${player.lastname}`);
        console.log(`POSITION: ${player.position}`);
        console.log('');
    });
}

displayPlayers();

/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code

function displayPlayersSortedByLength() {
    const sortedNames = players.map(player => player.name).sort((a, b) => b.length - a.length);
    console.log(sortedNames);
    console.log('');
}

displayPlayersSortedByLength();
/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, each of them has a 0.11 scoringChance, the total number of goals will be 1.1 average
 * Output example -> Goals per match: 2.19
 */

// Your code
function displayGoalChance() {
    const total = players.reduce((sum, player) => sum + player.scoringChance / 100, 0);
    console.log(`Goals per match: ${total.toFixed(2)}`);
    console.log('');
}

displayGoalChance();

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

// Your code
function findPlayerPosition(name) {
    const player = players.find(player => player.name === name);

    if (player) {
        console.log(`${name} : ${player.position}`);
    } else {
        console.log(`${name} not found.`);
    }
}

//Change "Tammy" to any name to query their position
findPlayerPosition("Tammy");

/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance.
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code
function randomTeamsScoringChance() {
    if (players.length % 2 !== 0) {
        console.log("These players cannot be split evenly into two teams");
        return;
    }

    const shuffledPlayers = players.sort(() => Math.random() - 0.5);
    const midIndex = Math.floor(shuffledPlayers.length / 2);
    const teamA = shuffledPlayers.slice(0, midIndex);
    const teamB = shuffledPlayers.slice(midIndex);
    const calculateTeamScoringChance = (team) => {
        const totalScoringChance = team.reduce((sum, player) => sum + player.scoringChance / 100, 0);
        return Math.round(totalScoringChance);
    };

    const teamAScore = calculateTeamScoringChance(teamA);
    const teamBScore = calculateTeamScoringChance(teamB);

    console.log("Team A's players:", teamA.map(player => player.name));
    console.log("Team B's players:", teamB.map(player => player.name));
    console.log(`Team A scoring chance: ${teamAScore}`);
    console.log(`Team B scoring chance: ${teamBScore}`);
}

randomTeamsScoringChance();

pauseAndContinue();

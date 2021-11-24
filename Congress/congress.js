import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { getLastNumber, removeChildren } from "../utils/index.js";
const members = [...senators, ...representatives];

const republicanButton = document.getElementById("republicanButton");
republicanButton.addEventListener("click", () =>
  populateSenatorDiv(SimplifiedSentor(members, "R"))
);

const democratButton = document.getElementById("democratButton");
democratButton.addEventListener("click", () =>
  populateSenatorDiv(SimplifiedSentor(members, "D"))
);

console.log(senators.party);
const senatorDiv = document.querySelector(".senators");
const loyaltyHeading = document.querySelector(".mostLoyal");
const seniorityHeading = document.querySelector(".seniority");

function Filteredparty(array) {
  return array.map((senator) => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      seniority: +senator.seniority,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}

function SimplifiedMembers(chamberFilter) {
  const filteredArray = members.filter((member) =>
    chamberFilter ? member.party === chamberFilter : member
  );

  return Filteredparty(filteredArray);
}

function SimplifiedSentor(chamberFilter, party) {
  removeChildren(senatorDiv);

  const filteredArray = chamberFilter.filter((x) => x.party == party);

  return Filteredparty(filteredArray);
}

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach((senator) => {
    const senFigure = document.createElement("figure");
    const figImg = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    figImg.src = senator.imgURL;
    figCaption.textContent = senator.name;
    //figCaption.textContent = senator.party;

    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senatorDiv.appendChild(senFigure);
  });
}

const mostSeniorMember = SimplifiedMembers().reduce((acc, senator) =>
  acc.seniority > senator.seniority ? acc : senator
);

seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.`;

const mostLoyal = SimplifiedMembers().reduce((acc, senator) => {
  if (senator.loyaltyPct === 100) {
    acc.push(senator);
  }
  return acc;
}, []);

const cowardList = document.createElement("ol");

const leastLoyal = mostLoyal.map((coward) => {
  let listItem = document.createElement("ul");
  listItem.textContent = coward.name;
  cowardList.appendChild(listItem);
});

loyaltyHeading.appendChild(cowardList);

populateSenatorDiv(SimplifiedMembers());

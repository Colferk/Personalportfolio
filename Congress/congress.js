import { senators } from "../Data/senators";
import { representatives } from "../Data/representatives";

const members = [...senators, ...representatives];

console.log(members.length);

const senatorDiv = document.querySelector(".senators");

const loyaltyHeading = document.querySelector(".mostLoyal");

const seniorityHeading = document.querySelector(".seniority");

function SimplifiedMembers(chamberFilter) {
  const filteredArray = members.filter((member) =>
    chamberFilter ? member.short_title === chamberFilter : member
  );

  return filteredArray.map((senator) => {
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

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach((senator) => {
    const senFigure = document.createElement("figure");
    const figImg = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    figImg.src = senator.imgURL;
    figCaption.textContent = senator.name;

    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senatorDiv.appendChild(senFigure);
  });
}

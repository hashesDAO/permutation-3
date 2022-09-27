import { getHashesCollectionContract, getHashesContract } from '../../../util';
import Addresses from '../../../addresses.json';

//http://localhost:3000/api/sigil

type ProcessedTokenData = {
  hash: string
  binary_value: string
  phrase_value: string
};

type ProcessedWalletData = {
  dao: number
  non_dao: number
  votes: number
  proposals: number
};

type ColourPalette = {
  name: string
  colours: string[]
}

type FontData = {
  font: string
  fontsize: string
}

//Gets the Token Hashes data from pre-existing API
async function getTokenAPIData(tokenId: number) {
  try {
    const APIdata = await fetch(`http://localhost:3000/api/tokenId/${tokenId}`);

    const data = await APIdata.json();

    return data;

  } catch (error) {
    console.error(`error calling API for tokenID data: ${error}`);
  }
}

//Returns processed data for easy use when constucting the NFT
function processTokenAPIData(data: any): ProcessedTokenData {

  const processedTokenData = {} as ProcessedTokenData;

  try {

    processedTokenData.hash = data.hash;

    processedTokenData.binary_value = data.binary_value;

    processedTokenData.phrase_value = data.phrase_value;

  } catch (error) {
    console.error(`error transposing token data: ${error}`);
  }

  return processedTokenData;
}

//Gets the Wallet Hashes data from pre-existing API
async function getWalletAPIData(address: string) {
  try {

    const APIdata = await fetch(`http://localhost:3000/api/wallet/hashes/${address}`);

    const data = await APIdata.json();

    return data;

  } catch (error) {
    console.error(`error calling API for Wallet data: ${error}`);
  }
}

//Returns processed data for easy use when constucting the NFT
function processWalletAPIData(data: any): ProcessedWalletData {

  const processedWalletData = {} as ProcessedWalletData;

  try {
    //WalletData will return an undefined if the owner does not own any Hashes NFTs
    if (data === undefined) {

      processedWalletData.dao = 0;
      processedWalletData.non_dao = 0;
    }
    else {

      var dao = 0;
      var non_dao = 0;

      for (let i = 0; i < data.hashes.length; i++) {

        //Adds entry to either DAO or non-DAO increment
        if (data.hashes[i].type === "DAO") {
          dao += 1;
        }
        else {
          non_dao += 1;
        }
      }

      processedWalletData.dao = dao;
      processedWalletData.non_dao = non_dao;
    }
  } catch (error) {
    console.error(`error transposing wallet data: dao/non-dao : ${error}`);
  }

  try {
    //WalletData will return an undefined if the owner does not own any Hashes NFTs
    if (data === undefined) {
      processedWalletData.votes = 0;
      processedWalletData.proposals = 0;
    }
    else {
      processedWalletData.votes = data.on_chain_votes;
      processedWalletData.proposals = data.proposals_created;
    }
  } catch (error) {
    console.error(`error transposing wallet data: snapshot data ${error}`);
  }

  return processedWalletData;
}

//Not sure I need this - Yeah I think I don't
function isOwnerMinter(owner: string, minter: string): boolean {
  if(owner === minter) {
    return true;
  }
  else {
    return false;
  }
}

//Returns a true if owner of sigil also owns the Hashes hash used to mint the sigil
function isConnected(ownerOfSigil:string, ownerOfMintingHash: string): boolean {
  if(ownerOfSigil === ownerOfMintingHash) {
    return true;
  }
  else {
    return false;
  }
}

//Gets the colour palette given the seed and whether or not the sigil is connected to the minting hash
function getColourPalette(seed: number, isConnected: boolean): ColourPalette {

  const mono = {name: "Mono", colours: ["#080808", "#222222", "#616161", "#aaaaaa", "#ececec"]} as ColourPalette;

  //If sigil is disconnected from minting hashes hash return mono palette
  if (isConnected == false) {
    return mono;
  }

  //The other palettes
  const tyler = {name: "Tyler", colours: ["#d12a2f", "#315f8c", "#3b2b20", "#b8d9ce", "#ebe4d8"]} as ColourPalette;
  const kevin = {name: "Kevin", colours: ["#f524d7", "#000000", "#303841", "#f1b72c", "#f50f1c"]} as ColourPalette;
  const x = {name: "X", colours: ["#050615", "#9ae8af", "#7138ca", "#f34ca2", "#3a1e6d"]} as ColourPalette;
  const sol = {name: "Sol", colours: ["#332f2a", "#e40643", "#ffce04", "#0167a4", "#f0efe7"]} as ColourPalette;
  const herbert = {name: "Herbert", colours: ["#4d334e", "#df327c", "#7b1a45", "#88ffff", "#f2ffff"]} as ColourPalette;
  const rhea = {name: "Rhea", colours: ["#012041", "#6001c0", "#4060c1", "#a1e101", "#e0a17f"]} as ColourPalette;
  const OP6334 = {name: "Open palette 6334", colours: ["#339911", "#ddbbbb", "#0044ff", "#ddee11", "#ddffff"]} as ColourPalette;
  const VPJ = {name: "Vitalik's pyjamas", colours: ["#ff534d", "#9d0107", "#a54100", "#ffc8ae", "#bfa7a1"]} as ColourPalette;

  const standardPalettes = [tyler, kevin, x, sol, herbert, rhea, OP6334];

  //~3% chance of getting Vitalik's PJs
  if (seed % 33 == 0) {
    return VPJ;
  }
  //else a uniform chance of getting any other standard pallette
  else {
    return standardPalettes[(seed % standardPalettes.length)];
  }

  //There is a slight probability collision given the multiples of 33 and 7 but whatever, it's not a big deal
}

//Gets the colours used - updates with the number of hashes owned
function getColoursUsed(seed: number, daohashes: number, nondaohashes: number): number[] {

  const coloursUsed = [0,1];

  //Background colour dependent on total number of hashes owned
  coloursUsed[0] = (daohashes + nondaohashes) % 5;

  //Text colour dependent on total number of hashes owned + seed
  coloursUsed[1] = (seed + daohashes + nondaohashes) % 5;

  //makes sure the same colours aren't used
  if (coloursUsed[0] == coloursUsed[1]) {
    coloursUsed[1] = (seed + daohashes + nondaohashes + 1) % 5;
  }

  return coloursUsed;
}

function getFont(seed: number): string {

  const fonts = ["Ropa+Sans", "Courier Prime", "Oswald", "Poppins", "Roboto Condensed", "Montserrat", "Bebas Neue", "Prompt", "Space Grotesque", "Righteous", "Archivo Black", "Tavaraj", "Gruppo", "Linden Hill"];

  return fonts[(seed % fonts.length)];
}

//Gets the phrase - cut down if it's too long
function getPhrase(phrase: string): string {

  if (phrase == null || undefined) {
    return "";
  }

  if (phrase.length < 72) {
    return phrase;
  }
  //Cut to prevent excessively long string
  else {
    var tempPhrase = "";
    
    tempPhrase = phrase.slice(0,72);

    tempPhrase = tempPhrase.concat("...");

    return tempPhrase;
  }
}

//Returns the SVG image for the NFT
function getSigilBase64EncodedSVG(hashesTokenId: number, isConnected: boolean, seed: number, processedTokenData: ProcessedTokenData, processedWalletData: ProcessedWalletData): string {

  //Size and positioning controlled with these variables
  const xdimension = 260;
  const ydimension = 350;

  //Gets the colour palette given the random seed (i.e. the hashes hash) and whether or not the sigil owner also owns the minting hash
  const colourPalette = getColourPalette(seed, isConnected);

  //The two colours used: dependent on the number of dao and non-dao hashes owned in the wallet
  //0: background colour, 1: font colour
  const coloursUsed = getColoursUsed(seed, processedWalletData.dao, processedWalletData.non_dao);

  //Gets the font given the random seed
  //Also needs to be amenable to snapshot variables
  const font = getFont(seed);

  //Hashes Id that minted the sigil
  const HashesID = `Token ID: ${hashesTokenId}`;

  //The hashes phrase
  const Phrase = getPhrase(processedTokenData.phrase_value);

  //Begins and sets the dimensions
  var svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 ${xdimension} ${ydimension}">`;

  //Styles

  //Importing the fonts
  svgHTML = svgHTML.concat(`<defs><style type="text/css">@import url('https://fonts.googleapis.com/css?family=Ropa+Sans|Courier+Prime|Oswald|Poppins|Roboto+Condensed|Montserrat|Bebas+Neue|Prompt|Space+Grotesque|Righteous|Archivo+Black|Tavaraj|Gruppo|Linden+Hill');</style></defs>`);

  //Sets the main0 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.main0 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: ${font}; font-size: 80px; text-anchor: middle }</style>`);

  //Sets the main1 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.main1 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: ${font}; font-size: 20px; text-anchor: middle }</style>`);

  //Sets the support0 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.support0 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: courier; font-size: 10px; text-anchor: middle }</style>`);

  //Sets the support1 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.support1 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: courier; font-size: 6px; text-anchor: middle }</style>`);

  //Backgound

  //Sets the background colour
  svgHTML = svgHTML.concat(`<rect width="100%" height="100%" fill= "${colourPalette.colours[coloursUsed[0]]}" />`);

  //Main Text

  //DAO Whale: (__-){
  //Non-DAO Whale: .___.

  //This needs polishing with formatting/location anyway
  
  //Sets the main0 text - the DAO hash # characters
  //Number of strings depends on the number of DAO hashes owned
  //If number of DAO hashes owned exceeds 9 then only 9 are shown regardless
  //All of this messy logic to deal with the display of the pound signs
  if (processedWalletData.dao < 4) {

    var largePound0 = "";

    for (let k = 0; k < processedWalletData.dao; k++) {

      largePound0 = largePound0.concat("#");
    }

    //Sets the single line of pounds
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3}" class="main0">${largePound0}</text>`);
  }
  if ((processedWalletData.dao >= 4) && (processedWalletData.dao < 7)) {

    var largePound0 = "";
    var largePound1 = "";

    if (processedWalletData.dao == 4) {

      largePound0 = "##";
      largePound1 = "##";
    }
    if (processedWalletData.dao == 5) {

      largePound0 = "###";
      largePound1 = "##";
    }
    if (processedWalletData.dao == 6) {

      largePound0 = "###";
      largePound1 = "###";
    }

    //Sets the multiple pound lines
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 - ydimension/12}" class="main0">${largePound0}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/12}" class="main0">${largePound1}</text>`);
  }
  if ((processedWalletData.dao >= 7)) {

    var largePound0 = "";
    var largePound1 = "";
    var largePound2 = "";

    if (processedWalletData.dao == 7) {

      largePound0 = "###";
      largePound1 = "#";
      largePound2 = "###";
    }
    if (processedWalletData.dao == 8) {

      largePound0 = "###";
      largePound1 = "##";
      largePound2 = "###";
    }
    if (processedWalletData.dao >= 9) {

      largePound0 = "###";
      largePound1 = "###";
      largePound2 = "###";
    }

    //Sets the multiple pound lines
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 - ydimension/6 + ydimension/36}" class="main0">${largePound0}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/36}" class="main0">${largePound1}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/36}" class="main0">${largePound2}</text>`);
  }

  //const largePound0 = "###";
  //const largePound1 = "#";
  //const largePound2 = "###";

  //svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 - ydimension/6 + ydimension/36}" class="main0">${largePound0}</text>`);
  //svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/36}" class="main0">${largePound1}</text>`);
  //svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/36}" class="main0">${largePound2}</text>`);

  //Sets the main1 text - the Non-DAO hash # characters
  //Number of strings depends on the number of Non-DAO hashes owned
  //If number of Non-DAO hashes owned exceeds 20 then only 20 are shown regardless
  //All of this messy logic to deal with the display of the pound signs
  if (processedWalletData.non_dao < 10) {

    var smallPound0 = "";

    for (let k = 0; k < processedWalletData.non_dao; k++) {

      smallPound0 = smallPound0.concat("#");
    }

    //Sets the single line of pounds
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/12}" class="main1">${smallPound0}</text>`);
  }
  if ((processedWalletData.non_dao >= 10) && (processedWalletData.non_dao < 21)) {

    var smallPound0 = "";
    var smallPound1 = "";

    if (processedWalletData.non_dao == 10) {

      smallPound0 = "#####";
      smallPound1 = "#####";
    }
    if (processedWalletData.non_dao == 11) {

      smallPound0 = "######";
      smallPound1 = "#####";
    }
    if (processedWalletData.non_dao == 12) {

      smallPound0 = "######";
      smallPound1 = "######";
    }
    if (processedWalletData.non_dao == 13) {

      smallPound0 = "#######";
      smallPound1 = "######";
    }
    if (processedWalletData.non_dao == 14) {

      smallPound0 = "#######";
      smallPound1 = "#######";
    }
    if (processedWalletData.non_dao == 15) {

      smallPound0 = "########";
      smallPound1 = "#######";
    }
    if (processedWalletData.non_dao == 16) {

      smallPound0 = "########";
      smallPound1 = "########";
    }
    if (processedWalletData.non_dao == 17) {

      smallPound0 = "#########";
      smallPound1 = "########";
    }
    if (processedWalletData.non_dao == 18) {

      smallPound0 = "########";
      smallPound1 = "########";
    }
    if (processedWalletData.non_dao == 19) {

      smallPound0 = "##########";
      smallPound1 = "#########";
    }
    if (processedWalletData.non_dao >= 20) {

      smallPound0 = "##########";
      smallPound1 = "##########";
    }

    //Sets the multiple pound lines
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/12}" class="main1">${smallPound0}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/12 + ydimension/24}" class="main1">${smallPound1}</text>`);
  }
  //const smallPound0 = "##########";
  //const smallPound1 = "##########";

  //svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/12}" class="main1">${smallPound0}</text>`);
  //svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension/3 + ydimension/6 + ydimension/12 + ydimension/24}" class="main1">${smallPound1}</text>`);

  //Supporting Text

  //ydimension - (ydimension/36)

  //Sets the support0 text - the token Id of the hashes NFT used to mint - made bold
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension - 4 * (ydimension/36)}" font-weight="bold" class="support0">${HashesID}</text>`);

  //Sets the first support1 text - the hashes phrase
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension - 3 * (ydimension/36)}" class="support1">${Phrase}</text>`);

  //Sets the second support1 text - the hashes hash
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension - 2 * (ydimension/36)}" class="support1">${processedTokenData.hash}</text>`);

  //Ends it and wraps up
  svgHTML = svgHTML.concat(`</svg>`);
  
  //Encodes and returns - now readable as a URL
  return Buffer.from(svgHTML).toString('base64');
}

//Sigil V0 Collection token Id as input
//Returns the json metadata in the Opensea format
export default async function handler(req: any, res: any) {

  //Sigil Token Id
  const { tokenId } = req.query;

  //Must be a number
  if (isNaN(Number(tokenId))) {
    res.status(400).send('tokenId must be a number');
    return;
  }

  //Sigils collection address
  const sigilV0Contract = getHashesCollectionContract(Addresses.sigilV0CollectionAddress_currentlyMedleyLimited);

  //Hashes address
  const hashesContract = getHashesContract(1);

  //Gets the address of the owner of the sigil (tokenId)
  const owner = await sigilV0Contract.ownerOf(tokenId);

  //Gets the hashes Id that originally minted the Sigil NFT
  //Defines the event
  const mintedFilter = sigilV0Contract.filters.Minted();
  //Gets all the events
  const AllGeneratedEvents = await sigilV0Contract.queryFilter(mintedFilter);
  //Finds the event where the sigil token Id matches the query
  const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));
  //Gets the raw data (in hexadecimal)
  const rawHashesTokenId = tokenIdEvent?.args?.hashesTokenId?._hex;
  //Converts to base 10
  const hashesTokenId = parseInt(rawHashesTokenId, 16);

  //Not sure I need this actually?
  //Also gets the minting address
  const minter = tokenIdEvent?.args?.minter;
  //Checks if minter is still the owner
  const isMinter = isOwnerMinter(owner, minter);

  //Also gets the current owner of the minting Hashes NFT
  const ownerOfMintingHash = await hashesContract.ownerOf(hashesTokenId);
  //Boolean whether or not the owner of the sigil is also the owner of the Hashes NFT that was used to mint
  const isSigilConnected = isConnected(owner, ownerOfMintingHash);

  //Parallelise this data fetching

  //Gets the relevant token data from pre-existing API
  const tokenData = await getTokenAPIData(hashesTokenId);

  //Gets the relevant token data from pre-existing API
  const walletData = await getWalletAPIData(owner);

  //Processes the revelant token (i.e. hashes NFT used to mint) data for easy use
  const processedTokenData = processTokenAPIData(tokenData);

  //Processes the revelant owner data for easy use
  const processedWalletData = processWalletAPIData(walletData);

  //The seed for randomness derived from the hashes NFT hash
  const seed = Number(processedTokenData.hash);

  //Returns NFT data in Opensea format
  res.status(200).json({
    name: `Sigil #${tokenId}`,
    description: 'TODO',
    image: `data:image/svg+xml;base64,${getSigilBase64EncodedSVG(hashesTokenId, isSigilConnected, seed, processedTokenData, processedWalletData)}`,
    attributes: [
        {
          trait_type: 'Font',
          value: getFont(seed),
        },
        {
          trait_type: 'Colour Palette',
          value: getColourPalette(seed, isSigilConnected).name,
        },
    ],
  });
}
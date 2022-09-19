import { getHashesCollectionContract } from '../../../util';
import Addresses from '../../../addresses.json';

//http://localhost:3000/api/sigil

//Data I need for the first sigil collection:
//Sigil Id as input - got
//Owner of sigil Id - got
//Hashes Id that minted - got
//Number of DAO hashes owned - got 
//Number of non-DAO hashes owned - got
//Hashes phrase text - got
//Hashes hash binary - got
//Random number for colour palette (7 permutations) (can be the hashes hash as the seed maybe?) - got
//Random font (14 permutations) - got

type ProcessedTokenData = {
  hash: string
  binary_value: string
  phrase_value: string
};

type ProcessedWalletData = {
  dao: number
  non_dao: number
};

type ColourPalette = {
  name: string
  background: string
  foreground: string
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
    console.error(`error transposing wallet data: ${error}`);
  }

  return processedWalletData;
}

function getColourPalette(seed: number): ColourPalette {

  const colourPalette  = {} as ColourPalette;

  //Change later
  const names = ["Hobbs", "Timmy", "Cerniak", "Cooki", "Deebee", "DMath", "Binmaker"];
  const backgroundColours = ["crimson", "brown", "cornsilk", "black", "blue", "green", "yellow"];
  const foregroundColours = ["brown", "cornsilk", "black", "blue", "green", "yellow", "crimson"];

  colourPalette.background = backgroundColours[seed % backgroundColours.length];
  colourPalette.foreground = foregroundColours[seed % foregroundColours.length];
  colourPalette.name = names[seed % names.length];

  return colourPalette;
}

function getFont(seed: number): string {

  const fonts = ["default", "sans-serif", "courier", "arial", "monospace", "cursive", "helvetica", "monospace", "fantasy"];

  return fonts[seed % fonts.length];
}

//Returns the SVG image for the NFT
function getSigilBase64EncodedSVG(hashesTokenId: number, seed: number, processedTokenData: ProcessedTokenData, processedWalletData: ProcessedWalletData): string {

  //Size and positioning controlled with these variables
  const xdimension = 260;
  const ydimension = 350;

  //Gets the colour palette given the random seed (i.e. the hashes hash)
  const colourPalette = getColourPalette(seed);

  //Gets the font given the random seed
  const font = getFont(seed);

  //Hashes Id that minted the sigil
  const HashesID = `Token ID: ${hashesTokenId}`;

  //Cut to prevent excessively long string (e.g. the BTC whitepaper lol)
  const Phrase = processedTokenData.phrase_value.slice(0,70);

  //The binary string of the hash - broken into four for display purposes
  const Binary0 = processedTokenData.binary_value.slice(0,64);
  const Binary1 = processedTokenData.binary_value.slice(64,128);
  const Binary2 = processedTokenData.binary_value.slice(128,192);
  const Binary3 = processedTokenData.binary_value.slice(192,256);

  //Begins and sets the dimensions
  var svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 ${xdimension} ${ydimension}">`;

  //Styles

  //Sets the main0 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.main0 { fill: ${colourPalette.foreground}; font-family: ${font}; font-size: 80px; text-anchor: middle }</style>`);

  //Sets the main1 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.main1 { fill: ${colourPalette.foreground}; font-family: ${font}; font-size: 20px; text-anchor: middle }</style>`);

  //Sets the support0 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.support0 { fill: ${colourPalette.foreground}; font-family: ${font}; font-size: 12px; text-anchor: middle }</style>`);

  //Sets the support1 font style: colour, font, and font size
  svgHTML = svgHTML.concat(`<style>.support1 { fill: ${colourPalette.foreground}; font-family: ${font}; font-size: 6px; text-anchor: middle }</style>`);

  //Backgound

  //Sets the background colour
  svgHTML = svgHTML.concat(`<rect width="100%" height="100%" fill= "${colourPalette.background}" />`);

  //Main Text
  
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

  //Sets the support0 text - the token Id of the hashes NFT used to mint
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6)}" class="support0">${HashesID}</text>`);

  //Sets the first support1 text - the hashes phrase
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6) + (ydimension/36)}" class="support1">${Phrase}</text>`);

  //Sets the second support1 text - the hashes hash
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6) + 2 * (ydimension/36)}" class="support1">${processedTokenData.hash}</text>`);

  //Binaries (Broken into 4 equal lengths of 64)

  //Sets the second support1 text - the binary0
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6) + 3 * (ydimension/36)}" class="support1">${Binary0}</text>`);

  //Sets the second support1 text - the binary1
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6) + 3 * (ydimension/36) + (ydimension/60)}" class="support1">${Binary1}</text>`);

  //Sets the second support1 text - the binary2
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6) + 3 * (ydimension/36) + 2 * (ydimension/60)}" class="support1">${Binary2}</text>`);

  //Sets the second support1 text - the binary3
  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * (ydimension/3) + (ydimension/6) + 3 * (ydimension/36) + 3 * (ydimension/60)}" class="support1">${Binary3}</text>`);

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

  //Gets the relevant token data from pre-existing API
  const tokenData = await getTokenAPIData(hashesTokenId);

  //Gets the relevant token data from pre-existing API
  const walletData = await getWalletAPIData(owner);

  //Processes the revelant token (i.e. hashes NFT used to mint) data for easy use
  const processedTokenData = processTokenAPIData(tokenData);

  //Processes the revelant owner data for easy use
  const processedWalletData = processWalletAPIData(walletData);

  //console.log(processedTokenData);

  //console.log(processedWalletData);

  //The seed for randomness derived from the hashes NFT hash
  const seed = Number(processedTokenData.hash);

  //Returns NFT data in Opensea format
  res.status(200).json({
    name: `Sigil #${tokenId}`,
    description: 'TODO',
    image: `data:image/svg+xml;base64,${getSigilBase64EncodedSVG(hashesTokenId, seed, processedTokenData, processedWalletData)}`,
    attributes: [
        {
            trait_type: 'DAO Hashes Owned',
            value: processedWalletData.dao,
        },
        {
          trait_type: 'Non-DAO Hashes Owned',
          value: processedWalletData.non_dao,
        },
        {
          trait_type: 'Minted With',
          value: hashesTokenId,
        },
        {
          trait_type: 'Phrase',
          value: processedTokenData.phrase_value,
        },
        {
          trait_type: 'Hash',
          value: processedTokenData.hash,
        },
        {
          trait_type: 'Binary',
          value: processedTokenData.binary_value,
        },
        {
          trait_type: 'Font',
          value: getFont(seed),
        },
        {
          trait_type: 'ColourPalette',
          value: getColourPalette(seed).name,
        },
    ],
  });
}
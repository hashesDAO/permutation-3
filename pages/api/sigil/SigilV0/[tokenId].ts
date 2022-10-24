import type { NextApiRequest, NextApiResponse } from 'next'
import { getHashesCollectionContract, getHashesContract } from '../../../../util';
import { hashType } from '../../../../util/validate';
import Addresses from '../../../../addresses.json';

type TokenResponseData = {
  hash: string
  binary_value: string
  binary_attributes: BinaryAttribute[]
  type: hashType
  phrase_value: string
  phrase_attributes: BinaryAttribute[]
};

type WalletHash = {
  hash_value: string
  type: hashType
  minted_by_address: boolean
  blocks_held: number
  purchased_above_mint_price: boolean | null
  token_id: number
}

type WalletHashResponseData = {
  hashes: WalletHash[]
  on_chain_votes: number
  proposals_created: number
  owns_perm_2_nft: boolean
};

type ProcessedTokenData = {
  hash: string
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
};

type FontData = {
  font: string
  fontsize: string[]
};

type ResponseMetadata = {
  name: string
  description: string
  image_data: string
  attributes: attribute[]
};

type attribute= {
  trait_type: string
  value: string | number
};

async function getTokenAPIData(tokenId: number) {
  try {
    const apiData = await fetch(`https://permutation-3-mv393woeb-hashesdao.vercel.app/api/tokenId/${tokenId}`);

    return await apiData.json();
  } catch (error) {
    console.error(`error calling API for tokenID data: ${error}`);
  }
}

function processTokenAPIData(data: TokenResponseData): ProcessedTokenData {
  return {
    hash : data.hash, 
    phrase_value : data.phrase_value
  };
}

async function getWalletAPIData(address: string) {
  try {
    const APIdata = await fetch(`https://permutation-3-mv393woeb-hashesdao.vercel.app/api/wallet/hashes/${address}`);
    const response = await APIdata.json();
    return response;
  } catch (error) {
    console.error(`error calling API for Wallet data: ${error}`);
  }
}

function processWalletAPIData(data: WalletHashResponseData): ProcessedWalletData {

  const processedWalletData = {} as ProcessedWalletData;

  if (!data) {

    processedWalletData.dao = 0;
    processedWalletData.non_dao = 0;
    processedWalletData.votes = 0;
    processedWalletData.proposals = 0;
  }
  else {

    let dao = 0;
    let non_dao = 0;

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
    processedWalletData.votes = data.on_chain_votes;

    processedWalletData.proposals = !data.proposals_created ? 0 : data.proposals_created;
  }

  return processedWalletData;
}

function getMintingHashesType(tokenId: number): string {

  if (tokenId < 1000) {
    return "DAO Hash"
  }
  else {
    return "Standard Hash"
  }
}

function isConnected(ownerOfSigil:string, ownerOfMintingHash: string): boolean {
  if(ownerOfSigil === ownerOfMintingHash) {
    return true;
  }
  else {
    return false;
  }
}

function getColourPalette(seed: number, isConnected: boolean): ColourPalette {

  const mono = {name: "Mono", colours: ["#080808", "#616161", "#ececec"]} as ColourPalette;

  if (isConnected == false) {
    return mono;
  }

  const tyler = {name: "Tyler", colours: ["#d12a2f", "#315f8c", "#3b2b20", "#b8d9ce", "#ebe4d8"]} as ColourPalette;
  const sol = {name: "Sol", colours: ["#332f2a", "#e40643", "#ffce04", "#0167a4", "#f0efe7"]} as ColourPalette;
  const x = {name: "X", colours: ["#050615", "#9ae8af", "#7138ca", "#f34ca2", "#3a1e6d"]} as ColourPalette;
  const rhea = {name: "Rhea", colours: ["#012041", "#6001c0", "#4060c1", "#a1e101", "#e0a17f"]} as ColourPalette;
  const OP6334 = {name: "Open palette 6334", colours: ["#339911", "#ddbbbb", "#0044ff", "#ddee11", "#ddffff"]} as ColourPalette;
  const VPJ = {name: "Vitalik's pyjamas", colours: ["#ff534d", "#9d0107", "#a54100", "#ffc8ae", "#bfa7a1"]} as ColourPalette;
  const kevin = {name: "Kevin", colours: ["#000000", "#ff0020", "#ffffff", "#0208fa", "#05e600"]} as ColourPalette;
  const herbert = {name: "Herbert", colours: ["#213693", "#ba2688", "#28aadb", "#eed027", "#c92722"]} as ColourPalette;
  const casey = {name: "Casey", colours: ["#333d47", "#0671a5", "#ad3a15", "#d3cfc3", "#ece8dc"]} as ColourPalette;
  const loren = {name: "Loren", colours: ["#202421", "#26686b", "#f0f435", "#ea212d", "#dde1de"]} as ColourPalette;
  const punk = {name: "Punk #5822", colours: ["#000000", "#75bdbd", "#c8fbfb", "#8e6fb6", "#1637a4"]} as ColourPalette;

  //handling rarities
  const randomNumber = seed % 100;

  //Runs through each of the protential colour palettes given their probabilities
  //Tyler: 11%
  if (randomNumber <= 10) {
    return tyler;
  }
  //Sol: 11%
  if ((randomNumber > 10) && (randomNumber <= 21)) {
    return sol;
  }
  //Xcopy: 9%
  if ((randomNumber > 21) && (randomNumber <= 30)) {
    return x;
  }
  //Rhea: 7%
  if ((randomNumber > 30) && (randomNumber <= 37)) {
    return rhea;
  }
  //OP6334: 5%
  if ((randomNumber > 37) && (randomNumber <= 42)) {
    return OP6334;
  }
  //Vitalik's PJs: 3%
  if ((randomNumber > 42) && (randomNumber <= 45)) {
    return VPJ;
  }
  //Kevin: 11%
  if ((randomNumber > 45) && (randomNumber <= 56)) {
    return kevin;
  }
  //Herbert: 11%
  if ((randomNumber > 56) && (randomNumber <= 67)) {
    return herbert;
  }
  //Casey: 11%
  if ((randomNumber > 67) && (randomNumber <= 78)) {
    return casey;
  }
  //Loren: 11%
  if ((randomNumber > 78) && (randomNumber <= 89)) {
    return loren;
  }
  //Punk: 10%
  else {
    return punk;
  }
}

function getColoursUsed(seed: number, daohashes: number, nondaohashes: number, colourslength: number): number[] {

  const coloursUsed = [0,1];

  coloursUsed[0] = (daohashes + nondaohashes) % colourslength;

  coloursUsed[1] = (seed + daohashes + nondaohashes) % colourslength;

  if (coloursUsed[0] == coloursUsed[1]) {
    coloursUsed[1] = (coloursUsed[1] + 1) % colourslength;
  }

  return coloursUsed;
}

function getFont(seed: number, votes: number, proposals: number, isconnected: boolean): FontData {

  var RopaSans = {font: "Ropa Sans", fontsize: ["80", "20"]} as FontData;
  var CourierPrime = {font: "Courier Prime", fontsize: ["80", "20"]} as FontData;
  var Oswald = {font: "Oswald", fontsize: ["70", "16"]} as FontData;
  var Poppins = {font: "Poppins", fontsize: ["76", "18"]} as FontData;
  var RobotoCondensed = {font: "Roboto Condensed", fontsize: ["80", "20"]} as FontData;
  var Montserrat = {font: "Montserrat", fontsize: ["80", "20"]} as FontData;
  var BebasNeue = {font: "Bebas Neue", fontsize: ["80", "20"]} as FontData;
  var Prompt = {font: "Prompt", fontsize: ["80", "20"]} as FontData;
  var SpaceGrotesk = {font: "Space Grotesk", fontsize: ["80", "20"]} as FontData;
  var Righteous = {font: "Righteous", fontsize: ["90", "26"]} as FontData;
  var ArchivoBlack = {font: "Archivo Black", fontsize: ["80", "20"]} as FontData;
  var Taviraj = {font: "Taviraj", fontsize: ["80", "20"]} as FontData;
  var Gruppo = {font: "Gruppo", fontsize: ["90", "26"]} as FontData;
  var LindenHill = {font: "Linden Hill", fontsize: ["76", "18"]} as FontData;

  if (votes > 0 || proposals > 0 || isconnected == false) {
    RopaSans = {font: "Ropa Sans", fontsize: ["52", "20"]} as FontData;
    CourierPrime = {font: "Courier Prime", fontsize: ["50", "20"]} as FontData;
    Oswald = {font: "Oswald", fontsize: ["52", "16"]} as FontData;
    Poppins = {font: "Poppins", fontsize: ["52", "18"]} as FontData;
    RobotoCondensed = {font: "Roboto Condensed", fontsize: ["52", "20"]} as FontData;
    Montserrat = {font: "Montserrat", fontsize: ["52", "20"]} as FontData;
    BebasNeue = {font: "Bebas Neue", fontsize: ["52", "20"]} as FontData;
    Prompt = {font: "Prompt", fontsize: ["52", "20"]} as FontData;
    SpaceGrotesk = {font: "Space Grotesk", fontsize: ["52", "20"]} as FontData;
    Righteous = {font: "Righteous", fontsize: ["52", "26"]} as FontData;
    ArchivoBlack = {font: "Archivo Black", fontsize: ["52", "20"]} as FontData;
    Taviraj = {font: "Taviraj", fontsize: ["52", "20"]} as FontData;
    Gruppo = {font: "Gruppo", fontsize: ["52", "26"]} as FontData;
    LindenHill = {font: "Linden Hill", fontsize: ["52", "18"]} as FontData;
  }

  const fonts = [RopaSans, CourierPrime, Oswald, Poppins, RobotoCondensed, Montserrat, BebasNeue, Prompt, SpaceGrotesk, Righteous, ArchivoBlack, Taviraj, Gruppo, LindenHill];

  return fonts[(seed % fonts.length)];
}

function getPhrase(phrase: string): string {

  if (phrase == null || undefined) {
    return "";
  }

  if (phrase.length < 62) {
    return phrase;
  }
  else {
    var tempPhrase = "";
    
    tempPhrase = phrase.slice(0,62);

    tempPhrase = tempPhrase.concat("...");

    return tempPhrase;
  }
}

function getLargePounds(daohashes: number, snapshotvoter: number, snapshotproposer: number, isConnected: boolean): string[] {

  var symbol = "#";

  if (snapshotvoter > 0) {
    symbol = "╬";
  }

  if (snapshotproposer > 0) {
    symbol = "✹";
  }

  if (isConnected == false) {
    return ["NUL"];
  }

  if (daohashes == 0) {
    return [""];
  }

  if (daohashes == 1) {
    return [symbol];
  }

  if (daohashes == 2) {

    var line0 = symbol;

    line0 = line0.concat(symbol);

    return [line0];
  }

  if (daohashes == 3) {

    var line0 = symbol;

    line0 = line0.concat(symbol, symbol);

    return [line0];
  }

  if (daohashes == 4) {

    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol);
    line1 = line1.concat(symbol);

    return [line0, line1];
  }

  if (daohashes == 5) {

    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol);
    line1 = line1.concat(symbol);

    return [line0, line1];
  }

  if (daohashes == 6) {

    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol);
    line1 = line1.concat(symbol, symbol);

    return [line0, line1];
  }

  if (daohashes == 7) {

    var line0 = symbol;
    var line1 = symbol;
    var line2 = symbol;

    line0 = line0.concat(symbol, symbol);
    line2 = line2.concat(symbol, symbol);

    return [line0, line1, line2];
  }

  if (daohashes == 8) {

    var line0 = symbol;
    var line1 = symbol;
    var line2 = symbol;

    line0 = line0.concat(symbol, symbol);
    line1 = line1.concat(symbol);
    line2 = line2.concat(symbol, symbol);

    return [line0, line1, line2];
  }

  if (daohashes == 9) {

    var line0 = symbol;
    var line1 = symbol;
    var line2 = symbol;

    line0 = line0.concat(symbol, symbol);
    line1 = line1.concat(symbol, symbol);
    line2 = line2.concat(symbol, symbol);

    return [line0, line1, line2];
  }

  return ["(_-){"];
}

function getSmallPounds(nondaohashes: number, isConnected: boolean): string[] {

  var symbol = "#";

  if (isConnected == false) {
    return [""];
  }

  if (nondaohashes == 0) {
    return [""];
  }

  if (nondaohashes == 1) {
    return [symbol];
  }

  if (nondaohashes == 2) {
    var line0 = symbol;

    line0 = line0.concat(symbol);

    return [line0];
  }

  if (nondaohashes == 3) {
    var line0 = symbol;

    line0 = line0.concat(symbol, symbol);

    return [line0];
  }

  if (nondaohashes == 4) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol);
    line1 = line1.concat(symbol);

    return [line0, line1];
  }

  if (nondaohashes == 5) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol);
    line1 = line1.concat(symbol);

    return [line0, line1];
  }

  if (nondaohashes == 6) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol);
    line1 = line1.concat(symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 7) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 8) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 9) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 10) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 11) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 12) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 13) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 14) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 15) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 16) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 17) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 18) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 19) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }

  if (nondaohashes == 20) {
    var line0 = symbol;
    var line1 = symbol;

    line0 = line0.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);
    line1 = line1.concat(symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol);

    return [line0, line1];
  }
  
  return ["._."];
}

function getSigilBase64EncodedSVG(hashesTokenId: number, isConnected: boolean, seed: number, processedTokenData: ProcessedTokenData, processedWalletData: ProcessedWalletData): string {

  const xdimension = 260;
  const ydimension = 350;

  const colourPalette = getColourPalette(seed, isConnected);

  //0: background colour, 1: font colour
  const coloursUsed = getColoursUsed(seed, processedWalletData.dao, processedWalletData.non_dao, colourPalette.colours.length);

  const font = getFont(seed, processedWalletData.votes, processedWalletData.proposals, isConnected);

  const HashesID = `Token ID: ${hashesTokenId}`;

  const Phrase = getPhrase(processedTokenData.phrase_value);

  var svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 ${xdimension} ${ydimension}">`;

  svgHTML = svgHTML.concat(`<defs><style type="text/css">@import url('https://fonts.googleapis.com/css?family=Ropa+Sans|Courier+Prime|Oswald|Poppins|Roboto+Condensed|Montserrat|Bebas+Neue|Prompt|Space+Grotesk|Righteous|Archivo+Black|Taviraj|Gruppo|Linden+Hill');</style></defs>`);

  svgHTML = svgHTML.concat(`<style>.main0 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: ${font.font}; font-size: ${font.fontsize[0]}px; text-anchor: middle }</style>`);

  svgHTML = svgHTML.concat(`<style>.main1 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: ${font.font}; font-size: ${font.fontsize[1]}px; text-anchor: middle }</style>`);

  svgHTML = svgHTML.concat(`<style>.support0 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: courier; font-size: 10px; text-anchor: middle }</style>`);

  svgHTML = svgHTML.concat(`<style>.support1 { fill: ${colourPalette.colours[coloursUsed[1]]}; font-family: courier; font-size: 6px; text-anchor: middle }</style>`);

  svgHTML = svgHTML.concat(`<rect width="100%" height="100%" fill= "${colourPalette.colours[coloursUsed[0]]}" />`);

  const largePoundStrings = getLargePounds(processedWalletData.dao, processedWalletData.votes, processedWalletData.proposals, isConnected);

  if (largePoundStrings.length == 1) {

    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5}" class="main0">${largePoundStrings[0]}</text>`);
  }
  if (largePoundStrings.length == 2) {

    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 - ydimension/12}" class="main0">${largePoundStrings[0]}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 + ydimension/12}" class="main0">${largePoundStrings[1]}</text>`);
  }
  if (largePoundStrings.length == 3) {

    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 - ydimension/6 + ydimension/36}" class="main0">${largePoundStrings[0]}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 + ydimension/36}" class="main0">${largePoundStrings[1]}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 + ydimension/6 + ydimension/36}" class="main0">${largePoundStrings[2]}</text>`);
  }

  const smallPoundStrings = getSmallPounds(processedWalletData.non_dao, isConnected);

  if (smallPoundStrings.length == 1) {

    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 + ydimension/6 + ydimension/12 + ydimension/24}" class="main1">${smallPoundStrings[0]}</text>`);
  }
  if (smallPoundStrings.length == 2) {

    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 + ydimension/6 + ydimension/12 + ydimension/24}" class="main1">${smallPoundStrings[0]}</text>`);
    svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${2 * ydimension/5 + ydimension/6 + ydimension/12 + 2 * ydimension/24}" class="main1">${smallPoundStrings[1]}</text>`);
  }

  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension - 4 * (ydimension/36)}" font-weight="bold" class="support0">${HashesID}</text>`);

  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension - 3 * (ydimension/36)}" class="support1">${Phrase}</text>`);

  svgHTML = svgHTML.concat(`<text x="${xdimension/2}" y="${ydimension - 2 * (ydimension/36)}" class="support1">${processedTokenData.hash}</text>`);

  svgHTML = svgHTML.concat(`</svg>`);
  
  return Buffer.from(svgHTML).toString('base64');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse< ResponseMetadata | string>) {

  const { tokenId } = req.query;

  if (isNaN(Number(tokenId))) {
    res.status(400).send('tokenId must be a number');
    return;
  }

  const sigilV0Contract = getHashesCollectionContract(Addresses.sigilV0CollectionAddress);

  try {
    const getTotalSupply = await sigilV0Contract.totalSupply();
    const rawTotalSupply = getTotalSupply._hex;
    const totalSupply = parseInt(rawTotalSupply, 16);

    if (Number(tokenId) >= totalSupply) {
      res.status(400).send('invalid token Id');
      return;
    }
  } catch (error) {
    console.error(`error fetching total supply: ${error}`);
  }

  try {
    const hashesContract = getHashesContract(5);

    const owner = await sigilV0Contract.ownerOf(Number(tokenId));

    const mintedFilter = sigilV0Contract.filters.Minted();
    const AllGeneratedEvents = await sigilV0Contract.queryFilter(mintedFilter);
    const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));
    const rawHashesTokenId = tokenIdEvent?.args?.hashesTokenId?._hex;
    const hashesTokenId = parseInt(rawHashesTokenId, 16);

    const ownerOfMintingHash = hashesContract.ownerOf(hashesTokenId);
    const tokenData = getTokenAPIData(hashesTokenId);
    const walletData = getWalletAPIData(owner);

    const parallelDataFetch = await Promise.all([ownerOfMintingHash, tokenData, walletData]);

    const isSigilConnected = isConnected(owner, parallelDataFetch[0]);
    const processedTokenData = processTokenAPIData(parallelDataFetch[1]);
    const processedWalletData = processWalletAPIData(parallelDataFetch[2]);

    const seed = Number(processedTokenData.hash);

    const mintingHashType = getMintingHashesType(hashesTokenId);

    res.status(200).json({
      name: `Sigil-V0: #${tokenId}`,
      description: 'TODO',
      image_data: `data:image/svg+xml;base64,${getSigilBase64EncodedSVG(hashesTokenId, isSigilConnected, seed, processedTokenData, processedWalletData)}`,
      attributes: [
          {
            trait_type: 'Font',
            value: getFont(seed, processedWalletData.votes, processedWalletData.proposals, isSigilConnected).font,
          },
          {
            trait_type: 'Colour Palette',
            value: getColourPalette(seed, isSigilConnected).name,
          },
          {
            trait_type: 'Minting Hash',
            value: mintingHashType,
          },
          {
            trait_type: 'Snapshot Votes',
            value: processedWalletData.votes,
          },
          {
            trait_type: 'Snapshot Proposals',
            value: processedWalletData.proposals,
          },
      ],
    });
  } catch (error) {
    console.error(`error fetching metadata: ${error}`);
  }
}
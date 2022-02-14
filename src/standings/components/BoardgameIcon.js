import React from 'react';
import {
  GiSwapBag,
  GiLibertyWing,
  GiAncientRuins,
  GiScythe,
  GiVikingHelmet,
  GiCastle,
  GiJuggler,
  GiBlood,
  GiPlantsAndAnimals,
  GiTreeRoots,
  GiDuel,
  GiAzulFlake,
  GiVampireDracula,
  GiRolledCloth,
  GiElvenCastle,
  GiRiver,
  GiChessRook,
  GiEgyptianWalk,
  GiPotionBall,
  GiHorseHead,
  GiCow,
  GiPirateFlag,
  GiShipWheel,
  GiPowerLightning,
  GiItalia,
  GiGroundbreaker,
  GiMarsPathfinder,
  GiRaiseZombie,
  GiSpikedDragonHead,
  GiAxeSword,
  GiIsland,
  GiSherlockHolmes,
  GiColtM1911,
  GiCloakDagger,
  GiEgyptianProfile,
  GiTriquetra,
  GiEarthAfricaEurope
} from 'react-icons/gi';
import {
  FaChessBoard,
  FaVenus,
  FaWineGlass,
  FaHatCowboy,
  FaChessKing,
  FaChessKnight,
  FaChessBishop,
  FaVirus
} from 'react-icons/fa';
import { WiTrain } from 'react-icons/wi';
import { IconContext } from "react-icons";

export default props => (
  <IconContext.Provider value={{ size: "2em" }}>
    <Icon {...props} />
  </IconContext.Provider>
)

const Icon = props => {
  const { boardgame } = props;

  switch(boardgame) {
    case "A War of Whispers":
      return <GiCloakDagger />
    case "Colt Express":
      return <GiColtM1911 />
    case "Sherlock Holmes Consulting Detective: The Thames Murders & Other Cases":
      return <GiSherlockHolmes />
    case "Spirit Island":
      return <GiIsland />
    case "Heroes of Terrinoth":
      return <GiAxeSword />
    case "Clank!: A Deck-Building Adventure":
      return <GiSpikedDragonHead />
    case "Pandemic Legacy: Season 1":
      return <FaVirus />
    case "Dead of Winter":
      return <GiRaiseZombie />
    case "Smash Up":
      return <GiGroundbreaker />
    case "Terraforming Mars":
      return <GiMarsPathfinder />
    case "Great Western Trail":
      return <FaHatCowboy />
    case "Azul":
      return <GiAzulFlake />
    case "7 Wonders Duel":
      return <GiDuel />
    case "Hero Realms":
      return <GiVampireDracula />
    case "Root":
      return <GiTreeRoots />
    case "Ticket to ride: Europe":
      return <WiTrain />
    case "Architects of the west kingdom":
      return <FaChessBishop />
    case "Paladins of the West Kingdom":
      return <FaChessKnight />
    case "Viscounts of the West Kingdom":
      return <FaChessKing />
    case "Everdell":
      return <GiPlantsAndAnimals />
    case "Viticulture essential edition":
      return <FaWineGlass />
    case "Blood rage":
      return <GiBlood />
    case "Orléans":
      return <GiSwapBag />
    case "Wingspan":
      return <GiLibertyWing />
    case "Lost ruins of Arnak":
      return <GiAncientRuins />
    case "Scythe":
      return <GiScythe />
    case "Raiders of the north sea":
      return <GiVikingHelmet />
    case "Castles of Burgundy":
      return <GiCastle />
    case "Concordia Venus":
      return <FaVenus />
    case "The Magnificent":
      return <GiJuggler />
    case "Lords of Waterdeep":
      return <GiChessRook />
    case "Patchwork":
      return <GiRolledCloth />
    case "Carcassonne":
      return <GiElvenCastle />
    case "Tigris & Euphrates":
      return <GiRiver />
    case "Kemet":
      return <GiEgyptianWalk />
    case "The Quacks of Quedlinburg":
      return <GiPotionBall />
    case "Raiders of Scythia":
      return <GiHorseHead />
    case "Clans of Caledonia":
      return <GiCow />
    case "Maracaibo":
      return <GiPirateFlag />
    case "Puerto Rico":
      return <GiShipWheel />
    case "Power Grid":
      return <GiPowerLightning />
    case "De Vulgari Eloquentia":
      return <GiItalia />
    case "Pharaon":
      return <GiEgyptianProfile />
    case "Glen More II: Chronicles":
      return <GiTriquetra />
    case "Terra Mystica":
      return <GiEarthAfricaEurope />
    default:
      return <FaChessBoard />
  }
}

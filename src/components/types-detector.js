const TypeDetector = (types) => {
  switch (types.toLowerCase()) {
    case "normal":
      return "#69631c";
    case "fire":
      return "#f59918";
    case "water":
      return "#1582bd";
    case "grass":
      return "#24bf19";
    case "electric":
      return "#f7db05";
    case "ice":
      return "#38f2ef";
    case "fighting":
      return "#e02619";
    case "poison":
      return "#950ff5";
    case "ground":
      return "#9c871e";
    case "flying":
      return "#e5bff5";
    case "psychic":
      return "#f757e7";
    case "bug":
      return "#9cb879";
    case "rock":
      return "#4f4421";
    case "ghost":
      return "#594e66";
    case "dark":
      return "#45341f";
    case "dragon":
      return "#642bad";
    case "steel":
      return "#aeabb3";
    case "fairy":
      return "#edc2dd";
    default:
      return "white";
  }
};
export default TypeDetector;

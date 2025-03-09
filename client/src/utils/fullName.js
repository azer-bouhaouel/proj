function makeNameLogo(name) {
  const names = name.split(" ").filter((word) => word !== "");
  const result = names.map((word) => word[0].toUpperCase()).join("");
  return result;
}

export default makeNameLogo;

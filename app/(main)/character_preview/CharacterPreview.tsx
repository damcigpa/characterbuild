import React from "react";

export const CharacterPreview = () => {    
  const char = localStorage.getItem("character");
  const obj = char ? JSON.parse(char) : {};

  return (
    <div>Helloword</div>
  )
}
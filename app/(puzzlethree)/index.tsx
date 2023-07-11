import { useFont } from "@shopify/react-native-skia";
import React from "react";

import { Background } from "../../components/Background";
import { Project, ProjectComponent } from "../../components/Project";

export const Riveo = () => {
  const boldTf = require("../../assets/riveo/Roboto-Bold.ttf");
  const regularTf = require("../../assets/riveo/Roboto-Regular.ttf");

  const titleFont = useFont(boldTf, 36);
  const normalFont = useFont(regularTf, 18);
  if (!titleFont || !normalFont) {
    return null;
  }

  let projects: Project[] = [
    {
      id: "zurich",
      title: "Zürich",
      size: "45MB",
      duration: "1:06m",
      picture: require("../../assets/riveo/zurich2.jpg"),
      color: "#BDA098",
    },
    {
      id: "oslo",
      title: "Oslo",
      size: "1GB",
      duration: "5:02m",
      picture: require("../../assets/riveo/oslo2.jpg"),
      color: "#59659a",
    },
    {
      id: "krakow",
      title: "Kraków",
      size: "500MB",
      duration: "11:04m",
      picture: require("../../assets/riveo/krakow.jpg"),
      color: "#BAB9B0",
    },
  ];
  return (
    <Background>
      {projects.map((project, index) => {
        return (
          <ProjectComponent
            key={index}
            font={titleFont}
            smallFont={normalFont}
            project={project}
          />
        );
      })}
    </Background>
  );
};

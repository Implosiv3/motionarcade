import {
  useEffect,
  useState,
} from "react";

import { ColorInstances } from "./ColorInstances";

type Group = {
  color: string;
  positions: [number, number, number][];
};

type Props = {
  imageUrl: string;
  voxelSize?: number;
  depth?: number;
};

export function VoxelSprite({
  imageUrl,
  voxelSize = 0.1,
  depth = 1,
}: Props) {
  const [groups, setGroups] =
    useState<Group[]>([]);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      const canvas =
        document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx =
        canvas.getContext("2d")!;

      ctx.drawImage(img, 0, 0);

      const imageData =
        ctx.getImageData(
          0,
          0,
          img.width,
          img.height
        );

      const pixels = imageData.data;

      const colorMap = new Map<
        string,
        [number, number, number][]
      >();

      for (
        let y = 0;
        y < img.height;
        y++
      ) {
        for (
          let x = 0;
          x < img.width;
          x++
        ) {
          const i =
            (y * img.width + x) * 4;

          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          if (a < 10) continue;

          const color =
            `rgb(${r},${g},${b})`;

          if (!colorMap.has(color)) {
            colorMap.set(color, []);
          }

          const centerX = img.width / 2;
          const centerY = img.height / 2;

          colorMap.get(color)!.push([
            x - centerX,
            centerY - y,
            0,
          ]);
        }
      }

      setGroups(
        [...colorMap.entries()].map(
          ([color, positions]) => ({
            color,
            positions,
          })
        )
      );
    };

    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <group scale={voxelSize}>
      {groups.map(group => (
        <ColorInstances
          key={group.color}
          color={group.color}
          positions={group.positions}
          depth={depth}
        />
      ))}
    </group>
  );
}
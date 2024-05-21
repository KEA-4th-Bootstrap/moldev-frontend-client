import { ItemDimensions } from '../../data/type';

export const MissionControl = (
  width: number,
  height: number,
  length: number,
  gap: number,
  first?: number,
): ItemDimensions[][] => {
  const firstCount: number =
    first || Math.floor(Math.random() * Math.floor(length / 2) + 2);
  const secondCount = length - firstCount;

  // 각 줄마다 반복
  // 각 줄의 아이템 갯수를 m으로 취급
  // 각 줄 내의 아이템의 너비 정하기 (최소 100px, 최대 1/2 width 사이에서) → 한 줄의 총 합이 width - (gap * (m - 1)) 보다 작아야 함
  const calculateItemDimension = (m: number): ItemDimensions[] => {
    let currentMaxWidth = width - gap * (m - 1);
    const currentMaxHeight = height - gap * (m - 1);
    let currentMaxItemWidth = (currentMaxWidth / 5) * 2;
    const currentMaxItemHeight = (currentMaxHeight / 3) * 2;
    const currentMinItemWidth = 200;

    const itemDimensions: ItemDimensions[] = [];

    for (let i = 0; i < m; i++) {
      const currentWidth =
        Math.floor(
          Math.random() * (currentMaxItemWidth - currentMinItemWidth),
        ) + currentMinItemWidth;
      const currentHeight = Math.min(
        Math.floor(currentWidth / 1.3),
        currentMaxItemHeight,
      );

      // 한 아이템의 비율이 1.3 : 1 이 될 수 있도록 세로 길이  결정
      currentMaxWidth -= currentWidth;
      currentMaxItemWidth = currentMaxWidth / (m - i - 1);

      // 각 아이템의 가로 세로 길이 반환
      itemDimensions.push({ width: currentWidth, height: currentHeight });
    }

    return itemDimensions;
  };

  const firstLine = calculateItemDimension(firstCount);
  const secondLine = calculateItemDimension(secondCount);

  return [firstLine, secondLine];
};

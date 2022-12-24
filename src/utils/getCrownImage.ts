import { CrownImageColour } from 'types/CrownImageColour';

// eslint-disable-next-line import/no-unresolved
import crownImageGold from 'assets/crown_gold.png';
// eslint-disable-next-line import/no-unresolved
import crownImageTyrianPurple from 'assets/crown_tyrian_purple.png';

export default function getCrownImage(imageColour: CrownImageColour) {
  switch (imageColour) {
    case 'gold':
      return crownImageGold;
    case 'tyrian_purple':
      return crownImageTyrianPurple;
    default:
      return null;
  }
}

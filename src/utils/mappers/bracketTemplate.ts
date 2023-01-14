import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';
import { BracketTemplate } from 'types/BracketTemplate';

export function mapDataToPayload(
  information: BracketInformation,
  participants: BracketParticipant[],
  saveAsNewCopy: boolean
): BracketTemplate {
  if (saveAsNewCopy) {
    return {
      name: `${information.name} (Copy of Id:${information.id})`,
      description: information.description,
      includePlayoff: information.includePlayoff,
      participants: participants.map((x) => ({
        id: -1, // This is ignored on create, which New Copy would be.
        text: x.text,
        image: x.image
      }))
    };
  } else {
    return {
      ...information,
      participants
    };
  }
}

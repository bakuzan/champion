export default function scrollToAndFocusParticipantControl(index: number) {
  // Give react time to pull up the participants panel!
  requestAnimationFrame(() => {
    const element = document.getElementById(`participant_${index}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
    }
  });
}

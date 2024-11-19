import { ADJECTIVES, ANIMALS, AVATAR_URLS } from "../staticData";

const generateRandomUsername = (): string => {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adjective} ${animal}`;
};

const generateRandomAvatarURL = (): string => {
  const avatarIndex = Math.floor(Math.random() * AVATAR_URLS.length);
  return AVATAR_URLS[avatarIndex];
}

export { generateRandomAvatarURL, generateRandomUsername };
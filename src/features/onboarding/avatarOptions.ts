import rocket from "@/assets/avatars/rocket.svg";
import star from "@/assets/avatars/star.svg";
import lion from "@/assets/avatars/lion.svg";
import drum from "@/assets/avatars/drum.svg";
import book from "@/assets/avatars/book.svg";
import ball from "@/assets/avatars/ball.svg";
import robot from "@/assets/avatars/robot.svg";
import fox from "@/assets/avatars/fox.svg";
import cat from "@/assets/avatars/cat.svg";
import owl from "@/assets/avatars/owl.svg";
import butterfly from "@/assets/avatars/butterfly.svg";
import comet from "@/assets/avatars/comet.svg";
import planet from "@/assets/avatars/planet.svg";

export type AvatarOption = {
  id: string;
  label: string;
  src: string;
};

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "rocket", label: "Rocket", src: rocket },
  { id: "star", label: "Star", src: star },
  { id: "lion", label: "Lion", src: lion },
  { id: "drum", label: "Drum", src: drum },
  { id: "book", label: "Book", src: book },
  { id: "ball", label: "Ball", src: ball },
  { id: "robot", label: "Robot", src: robot },
  { id: "fox", label: "Fox", src: fox },
  { id: "cat", label: "Cat", src: cat },
  { id: "owl", label: "Owl", src: owl },
  { id: "butterfly", label: "Butterfly", src: butterfly },
  { id: "comet", label: "Comet", src: comet },
  { id: "planet", label: "Planet", src: planet },
];

export const AVATAR_IMAGE_BY_ID = Object.fromEntries(
  AVATAR_OPTIONS.map((avatar) => [avatar.id, avatar.src]),
) as Record<string, string>;

import bjoernHartmannImg from "../assets/books/bjoern-hartmann.webp";
import ericChenImg from "../assets/books/eric-chen.webp";
import lydiaImg from "../assets/books/lydia-chilton.webp";
import martiHearstImg from "../assets/books/marti-hearst.webp";
import shmImg from "../assets/books/shm-almeda.png";
import sitongWangImg from "../assets/books/sitong-wang.png";
import timImg from "../assets/books/tim-aveni.png";
import eozinImg from "../assets/books/eozin-che.jpg";
import jamesImg from "../assets/books/james-smith.jpg";
import dougImg from "../assets/books/doug-weitner.jpg";
import dustinImg from "../assets/books/dustin-partridge.png";

const toBookTitle = (fileName) =>
  fileName
    .replace(/\.[^.]+$/, "")
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const PEOPLE_BOOKS = [
  {
    title: toBookTitle("marti-hearst.webp"),
    image: martiHearstImg,
    link: "https://people.ischool.berkeley.edu/~hearst/",
  },
  {
    title: toBookTitle("bjoern-hartmann.webp"),
    image: bjoernHartmannImg,
    link: "https://people.eecs.berkeley.edu/~bjoern/",
  },
  {
    title: toBookTitle("lydia-chilton.png"),
    image: lydiaImg,
    link: "https://www.cs.columbia.edu/~chilton/",
  },
  {
    title: toBookTitle("sitong-wang.png"),
    image: sitongWangImg,
    link: "https://sitong-wang.github.io/",
  },
  {
    title: toBookTitle("dustin-partridge.png"),
    image: dustinImg,
    link: "https://e3b.columbia.edu/content/dustin-partridge",
  },
  {
    title: toBookTitle("eric-chen.webp"),
    image: ericChenImg,
    link: "https://brown.columbia.edu/portfolio/eric-chen/",
  },
  {
    title: toBookTitle("eozin-che.jpg"),
    image: eozinImg,
    link: "https://eozin-che.squarespace.com/",
  },
  {
    title: toBookTitle("shm-almeda.png"),
    image: shmImg,
    link: "https://shmuh.co/",
  },
  {
    title: toBookTitle("james-smith.jpg"),
    image: jamesImg,
    link: "https://jamesdsmith.net/",
  },
  {
    title: toBookTitle("tim-aveni.png"),
    image: timImg,
    link: "https://timothyaveni.com/",
  },
  {
    title: toBookTitle("doug-weitner.jpg"),
    image: dougImg,
    link: "https://www.linkedin.com/in/douglas-weitner/",
  },
];

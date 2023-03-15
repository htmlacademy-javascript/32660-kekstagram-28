import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './util.js';

const DESCRIPTION = [
  'Lorem ipsum',
  'Lorem ipsum dolor sit amet',
  'dolor sit amet',
  'Lorem ipsum dolor',
  'consectetur adipiscing elit',
  'Ut enim ad minim veniam',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Татьяна',
  'Петр',
  'Елена',
  'Мария',
  'София',
  'Александр',
  'Игорь',
  'Ксения',
  'Тимур',
];

const SIMILAR_PHOTO_COUNT = 25;
const SIMILAR_COMMENT_COUNT = 5;

const MIN_VALUE_PHOTO_ID = 1;
const MAX_VALUE_PHOTO_ID = 25;

const MIN_VALUE_COMMENT_ID = 1;
const MAX_VALUE_COMMENT_ID = 500;

const MIN_VALUE_AVATAR_ID = 1;
const MAX_VALUE_AVATAR_ID = 6;

const MIN_VALUE_LIKES = 15;
const MAX_VALUE_LIKES = 200;


const generateId = createRandomIdFromRangeGenerator(MIN_VALUE_PHOTO_ID, MAX_VALUE_PHOTO_ID);
const generatePhotoId = createRandomIdFromRangeGenerator(MIN_VALUE_PHOTO_ID, MAX_VALUE_PHOTO_ID);
const generateCommentId = createRandomIdFromRangeGenerator(MIN_VALUE_COMMENT_ID, MAX_VALUE_COMMENT_ID);

//функция конструктор комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_VALUE_AVATAR_ID, MAX_VALUE_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({length: SIMILAR_COMMENT_COUNT}, createComment);

//функция конструктор фотографии
const createPhoto = () => ({
  id: generateId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
  comments: createComments(),
});

const createPhotos = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createPhoto);

export {createPhotos};

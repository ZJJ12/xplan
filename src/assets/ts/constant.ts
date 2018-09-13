
const backgroundAudio = require('../sounds/music_bg.mp3')
const audioSprite = require('../sounds/music_sprite.mp3')
const videoSprite = require('../videos/video_sprite.mp4')

const earth = require('../images/earth4.jpg');
const earthBump = require('../images/earth_bump.jpg');
const earthCloud = require('../images/earth_cloud.png');
const earthSpec = require('../images/earth_spec.jpg');
const imageNamibia = require('../images/i_namibia.png');
const imageMariana = require('../images/i_mariana.png');
const imageGreenland = require('../images/i_greenland.png');
const imageGalapagos = require('../images/i_galapagos.png');
const imageAntarcica = require('../images/i_antarctica.png');

const cloud0 = require('../images/kf_cloud_00000.jpg');
const cloud1 = require('../images/kf_cloud_00001.jpg');
const cloud2 = require('../images/kf_cloud_00002.jpg');
const cloud3 = require('../images/kf_cloud_00003.jpg');
const cloud4 = require('../images/kf_cloud_00004.jpg');
const cloud5 = require('../images/kf_cloud_00005.jpg');
const cloud6 = require('../images/kf_cloud_00006.jpg');
const cloud7 = require('../images/kf_cloud_00007.jpg');
const cloud8 = require('../images/kf_cloud_00008.jpg');
const cloud9 = require('../images/kf_cloud_00009.jpg');
const cloud10 = require('../images/kf_cloud_00010.jpg');
const cloud11 = require('../images/kf_cloud_00011.jpg');
const cloud12 = require('../images/kf_cloud_00012.jpg');


export const MEDIA_URLS = {
  videoSprite,
  audioSprite,
  backgroundAudio
}

export const IMAGE_URLS = {
  earth,
  earthBump,
  earthCloud,
  earthSpec,
  iNambia: imageNamibia,
  iMariana: imageMariana,
  iGreenland: imageGreenland,
  iGalapagos: imageGalapagos,
  iAntarcica: imageAntarcica,

}
export const IMAGE_CLOUD_URLS = {
  cloud0,
  cloud1,
  cloud2,
  cloud3,
  cloud4,
  cloud5,
  cloud6,
  cloud7,
  cloud8,
  cloud9,
  cloud10,
  cloud11,
  cloud12,
}
export const PAGE_WIDTH = 375
export const PAGE_HEIGHT = 600

export const LOCATIONS = [{
  name: 'namibia',
  coord: [-19.2, 14.11666667],
  position: [-4.390, 2.660, -2.410],
  cameraFarPosition: [-20.03, 13.47, -14.61],
  cameraNearPosition: [-3.54, 2.38, -2.58],
  imageName: 'iNambia',
  coordSpriteIndex: 4,
  videoSprite: [2.80, 8.40],
  soundSprite: [0, 10.057142857142857]
}, {
  name: 'mariana',
  coord: [18.25, 142.81666667],
  position: [4.6, -1.29, -2.42],

  cameraFarPosition: [26.46, -6.94, -9.96],
  cameraNearPosition: [4.52, -1.30, -1.63],
  imageName: 'iMariana',
  coordSpriteIndex: 3,
  videoSprite: [10.80, 19.10],
  soundSprite: [24, 34.10938775510204]
}, {
  name: 'greenland',
  coord: [72.16666667, -43],
  position: [1.880, 5.09, 0.89],
  cameraFarPosition: [7.24, 26.52, 7.06],
  cameraNearPosition: [-1.39, -4.75, 0.33],

  imageName: 'iGreenland',
  coordSpriteIndex: 2,
  videoSprite: [40.20, 47.80],
  soundSprite: [48, 58.10938775510204]
}, {
  name: 'galapagos',
  coord: [1.33333333, -91.15],
  position: [0.550, 0.024, 5.39],
  cameraFarPosition: [-0.60, 0.14, 28.21],
  cameraNearPosition: [-0.10, 0.024, 4.99],
  imageName: 'iGalapagos',
  coordSpriteIndex: 1,
  videoSprite: [22.00, 37.43],
  soundSprite: [12, 22.057142857142857]
}, {
  name: 'antarctica',
  coord: [-7.96666667, -155.63333333],
  position: [-1.32, -5.05, 0.98],
  cameraFarPosition: [-7.88, -27.00, 1.87],
  cameraNearPosition: [1.30, 4.66, 1.24],

  imageName: 'iAntarcica',
  coordSpriteIndex: 0,
  videoSprite: [50.90, 69.00],
  soundSprite: [36, 46.05714285714286]
}]
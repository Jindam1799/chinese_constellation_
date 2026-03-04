/**
 * [1. 데이터 및 스테이지 정의]
 */
const TOTAL_STAGES = 30;
let currentStageIdx = 0;

const TILE_DATA = {
  wo: { hanzi: '我', pinyin: 'wǒ' },
  ta: { hanzi: '他', pinyin: 'tā' },
  mama: { hanzi: '妈妈', pinyin: 'māma' },
  baba: { hanzi: '爸爸', pinyin: 'bàba' },
  laoshi: { hanzi: '老师', pinyin: 'lǎoshī' },
  pengyou: { hanzi: '朋友', pinyin: 'péngyou' },
  gege: { hanzi: '哥哥', pinyin: 'gēge' },
  jiejie: { hanzi: '姐姐', pinyin: 'jiějie' },
  didi: { hanzi: '弟弟', pinyin: 'dìdi' },
  meimei: { hanzi: '妹妹', pinyin: 'mèimei' },
  he: { hanzi: '喝', pinyin: 'hē' },
  chi: { hanzi: '吃', pinyin: 'chī' },
  qu: { hanzi: '去', pinyin: 'qù' },
  kan: { hanzi: '看', pinyin: 'kàn' },
  mai: { hanzi: '买', pinyin: 'mǎi' },
  xihuan: { hanzi: '喜欢', pinyin: 'xǐhuān' },
  shui: { hanzi: '水', pinyin: 'shuǐ' },
  kafei: { hanzi: '咖啡', pinyin: 'kāfēi' },
  fan: { hanzi: '饭', pinyin: 'fàn' },
  pingguo: { hanzi: '苹果', pinyin: 'píngguǒ' },
  beijing: { hanzi: '北京', pinyin: 'běijīng' },
  jia: { hanzi: '家', pinyin: 'jiā' },
  shu: { hanzi: '书', pinyin: 'shū' },
  dianshi: { hanzi: '电视', pinyin: 'diànshì' },
  mianbao: { hanzi: '面包', pinyin: 'miànbāo' },
  mian: { hanzi: '面', pinyin: 'miàn' },
  cha: { hanzi: '茶', pinyin: 'chá' },
  xuexiao: { hanzi: '학교', pinyin: 'xuéxiào' },
  shangdian: { hanzi: '상점', pinyin: 'shāngdiàn' },
  yiyuan: { hanzi: '医院', pinyin: 'yīyuàn' },
  dianying: { hanzi: '电影', pinyin: 'diànyǐng' },
  pijiu: { hanzi: '啤酒', pinyin: 'píjiǔ' },
  bu: { hanzi: '不', pinyin: 'bù' },
};

// 사용자가 제공한 30개 스테이지 데이터 (구조 최적화)
const STAGES = [
  {
    level: 1,
    nodes: [
      { id: 'n1', x: 25, y: 50, expect: 'wo' },
      { id: 'n2', x: 50, y: 35, expect: 'he' },
      { id: 'n3', x: 75, y: 35, expect: 'shui' },
      { id: 'n4', x: 50, y: 65, expect: 'chi' },
      { id: 'n5', x: 75, y: 65, expect: 'fan' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n1', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
    pool: ['wo', 'he', 'shui', 'chi', 'fan'],
  },
  {
    level: 2,
    nodes: [
      { id: 'n1', x: 20, y: 30, expect: 'mama' },
      { id: 'n2', x: 20, y: 70, expect: 'baba' },
      { id: 'n3', x: 50, y: 50, expect: 'he' },
      { id: 'n4', x: 80, y: 30, expect: 'kafei' },
      { id: 'n5', x: 80, y: 70, expect: 'shui' },
    ],
    paths: [
      { from: 'n1', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n5' },
    ],
    pool: ['mama', 'baba', 'he', 'kafei', 'shui'],
  },
  {
    level: 3,
    nodes: [
      { id: 'n1', x: 20, y: 50, expect: 'wo' },
      { id: 'n2', x: 40, y: 50, expect: 'bu' },
      { id: 'n3', x: 60, y: 35, expect: 'chi' },
      { id: 'n4', x: 80, y: 35, expect: 'pingguo' },
      { id: 'n5', x: 60, y: 65, expect: 'qu' },
      { id: 'n6', x: 80, y: 65, expect: 'beijing' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
    pool: ['wo', 'bu', 'chi', 'pingguo', 'qu', 'beijing'],
  },
  {
    level: 4,
    nodes: [
      { id: 'n1', x: 20, y: 50, expect: 'pengyou' },
      { id: 'n2', x: 50, y: 50, expect: 'qu' },
      { id: 'n3', x: 80, y: 30, expect: 'xuexiao' },
      { id: 'n4', x: 80, y: 70, expect: 'shangdian' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n2', to: 'n4' },
    ],
    pool: ['pengyou', 'qu', 'xuexiao', 'shangdian'],
  },
  {
    level: 5,
    nodes: [
      { id: 'n1', x: 20, y: 50, expect: 'jiejie' },
      { id: 'n2', x: 50, y: 50, expect: 'mai' },
      { id: 'n3', x: 80, y: 30, expect: 'mianbao' },
      { id: 'n4', x: 80, y: 70, expect: 'shu' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n2', to: 'n4' },
    ],
    pool: ['jiejie', 'mai', 'mianbao', 'shu'],
  },
  {
    level: 6,
    nodes: [
      { id: 'n1', x: 15, y: 50, expect: 'ta' },
      { id: 'n2', x: 35, y: 50, expect: 'xihuan' },
      { id: 'n3', x: 55, y: 30, expect: 'he' },
      { id: 'n4', x: 75, y: 20, expect: 'cha' },
      { id: 'n5', x: 55, y: 70, expect: 'chi' },
      { id: 'n6', x: 75, y: 80, expect: 'mian' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
    pool: ['ta', 'xihuan', 'he', 'cha', 'chi', 'mian'],
  },
  {
    level: 7,
    nodes: [
      { id: 'n1', x: 20, y: 20, expect: 'wo' },
      { id: 'n2', x: 20, y: 80, expect: 'ta' },
      { id: 'n3', x: 40, y: 50, expect: 'bu' },
      { id: 'n4', x: 60, y: 50, expect: 'xihuan' },
      { id: 'n5', x: 85, y: 50, expect: 'dianying' },
    ],
    paths: [
      { from: 'n1', to: 'n3' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
    pool: ['wo', 'ta', 'bu', 'xihuan', 'dianying'],
  },
  {
    level: 8,
    nodes: [
      { id: 'n1', x: 15, y: 50, expect: 'gege' },
      { id: 'n2', x: 40, y: 30, expect: 'kan' },
      { id: 'n3', x: 70, y: 20, expect: 'shu' },
      { id: 'n4', x: 40, y: 70, expect: 'mai' },
      { id: 'n5', x: 70, y: 80, expect: 'pingguo' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n1', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
    pool: ['gege', 'kan', 'shu', 'mai', 'pingguo'],
  },
  {
    level: 9,
    nodes: [
      { id: 'n1', x: 20, y: 50, expect: 'laoshi' },
      { id: 'n2', x: 50, y: 50, expect: 'qu' },
      { id: 'n3', x: 80, y: 20, expect: 'beijing' },
      { id: 'n4', x: 80, y: 50, expect: 'yiyuan' },
      { id: 'n5', x: 80, y: 80, expect: 'jia' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n2', to: 'n4' },
      { from: 'n2', to: 'n5' },
    ],
    pool: ['laoshi', 'qu', 'beijing', 'yiyuan', 'jia'],
  },
  {
    level: 10,
    nodes: [
      { id: 'n1', x: 15, y: 50, expect: 'meimei' },
      { id: 'n2', x: 35, y: 50, expect: 'bu' },
      { id: 'n3', x: 55, y: 50, expect: 'chi' },
      { id: 'n4', x: 85, y: 30, expect: 'mianbao' },
      { id: 'n5', x: 85, y: 70, expect: 'pingguo' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
    ],
    pool: ['meimei', 'bu', 'chi', 'mianbao', 'pingguo'],
  },
  {
    level: 11,
    nodes: [
      { id: 'n1', x: 20, y: 20, expect: 'mama' },
      { id: 'n2', x: 20, y: 50, expect: 'baba' },
      { id: 'n3', x: 20, y: 80, expect: 'wo' },
      { id: 'n4', x: 50, y: 50, expect: 'xihuan' },
      { id: 'n5', x: 80, y: 50, expect: 'kafei' },
    ],
    paths: [
      { from: 'n1', to: 'n4' },
      { from: 'n2', to: 'n4' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
    pool: ['mama', 'baba', 'wo', 'xihuan', 'kafei'],
  },
  {
    level: 12,
    nodes: [
      { id: 'n1', x: 10, y: 50, expect: 'ta' },
      { id: 'n2', x: 30, y: 50, expect: 'bu' },
      { id: 'n3', x: 50, y: 50, expect: 'xihuan' },
      { id: 'n4', x: 70, y: 30, expect: 'he' },
      { id: 'n5', x: 90, y: 30, expect: 'pijiu' },
      { id: 'n6', x: 70, y: 70, expect: 'kan' },
      { id: 'n7', x: 90, y: 70, expect: 'dianying' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n3', to: 'n6' },
      { from: 'n6', to: 'n7' },
    ],
    pool: ['ta', 'bu', 'xihuan', 'he', 'pijiu', 'kan', 'dianying'],
  },
  {
    level: 13,
    nodes: [
      { id: 'n1', x: 20, y: 30, expect: 'gege' },
      { id: 'n2', x: 20, y: 70, expect: 'didi' },
      { id: 'n3', x: 45, y: 30, expect: 'mai' },
      { id: 'n4', x: 70, y: 30, expect: 'shu' },
      { id: 'n5', x: 45, y: 70, expect: 'kan' },
      { id: 'n6', x: 70, y: 70, expect: 'dianshi' },
    ],
    paths: [
      { from: 'n1', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n3', to: 'n5' },
    ],
    pool: ['gege', 'didi', 'mai', 'shu', 'kan', 'dianshi'],
  },
  {
    level: 14,
    nodes: [
      { id: 'n1', x: 25, y: 20, expect: 'wo' },
      { id: 'n2', x: 25, y: 80, expect: 'pengyou' },
      { id: 'n3', x: 50, y: 50, expect: 'qu' },
      { id: 'n4', x: 75, y: 20, expect: 'beijing' },
      { id: 'n5', x: 75, y: 80, expect: 'shangdian' },
    ],
    paths: [
      { from: 'n1', to: 'n3' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
    ],
    pool: ['wo', 'pengyou', 'qu', 'beijing', 'shangdian'],
  },
  {
    level: 15,
    nodes: [
      { id: 'n1', x: 15, y: 50, expect: 'laoshi' },
      { id: 'n2', x: 40, y: 50, expect: 'xihuan' },
      { id: 'n3', x: 65, y: 20, expect: 'he' },
      { id: 'n4', x: 90, y: 20, expect: 'cha' },
      { id: 'n5', x: 65, y: 50, expect: 'chi' },
      { id: 'n6', x: 90, y: 50, expect: 'mian' },
      { id: 'n7', x: 65, y: 80, expect: 'kan' },
      { id: 'n8', x: 90, y: 80, expect: 'shu' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n2', to: 'n7' },
      { from: 'n7', to: 'n8' },
    ],
    pool: ['laoshi', 'xihuan', 'he', 'cha', 'chi', 'mian', 'kan', 'shu'],
  },
  {
    level: 16,
    nodes: [
      { id: 'n1', x: 15, y: 25, expect: 'baba' },
      { id: 'n2', x: 40, y: 25, expect: 'he' },
      { id: 'n3', x: 65, y: 25, expect: 'pijiu' },
      { id: 'n4', x: 15, y: 75, expect: 'mama' },
      { id: 'n5', x: 40, y: 75, expect: 'he' },
      { id: 'n6', x: 65, y: 75, expect: 'kafei' },
      { id: 'n7', x: 40, y: 50, expect: 'bu' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n2', to: 'n7' },
      { from: 'n5', to: 'n7' },
    ],
    pool: ['baba', 'he', 'pijiu', 'mama', 'he', 'kafei', 'bu'],
  },
  {
    level: 17,
    nodes: [
      { id: 'n1', x: 20, y: 30, expect: 'wo' },
      { id: 'n2', x: 20, y: 70, expect: 'ta' },
      { id: 'n3', x: 45, y: 50, expect: 'mai' },
      { id: 'n4', x: 70, y: 30, expect: 'pingguo' },
      { id: 'n5', x: 70, y: 70, expect: 'mianbao' },
      { id: 'n6', x: 90, y: 50, expect: 'fan' },
    ],
    paths: [
      { from: 'n1', to: 'n3' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
      { from: 'n3', to: 'n6' },
    ],
    pool: ['wo', 'ta', 'mai', 'pingguo', 'mianbao', 'fan'],
  },
  {
    level: 18,
    nodes: [
      { id: 'n1', x: 15, y: 50, expect: 'didi' },
      { id: 'n2', x: 35, y: 50, expect: 'bu' },
      { id: 'n3', x: 55, y: 50, expect: 'xihuan' },
      { id: 'n4', x: 75, y: 30, expect: 'chi' },
      { id: 'n5', x: 95, y: 30, expect: 'fan' },
      { id: 'n6', x: 75, y: 70, expect: 'kan' },
      { id: 'n7', x: 95, y: 70, expect: 'shu' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n3', to: 'n6' },
      { from: 'n6', to: 'n7' },
    ],
    pool: ['didi', 'bu', 'xihuan', 'chi', 'fan', 'kan', 'shu'],
  },
  {
    level: 19,
    nodes: [
      { id: 'n1', x: 20, y: 20, expect: 'gege' },
      { id: 'n2', x: 20, y: 50, expect: 'jiejie' },
      { id: 'n3', x: 20, y: 80, expect: 'meimei' },
      { id: 'n4', x: 50, y: 50, expect: 'qu' },
      { id: 'n5', x: 80, y: 20, expect: 'xuexiao' },
      { id: 'n6', x: 80, y: 80, expect: 'shangdian' },
    ],
    paths: [
      { from: 'n1', to: 'n4' },
      { from: 'n2', to: 'n4' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n4', to: 'n6' },
    ],
    pool: ['gege', 'jiejie', 'meimei', 'qu', 'xuexiao', 'shangdian'],
  },
  {
    level: 20,
    nodes: [
      { id: 'n1', x: 10, y: 50, expect: 'wo' },
      { id: 'n2', x: 25, y: 50, expect: 'xihuan' },
      { id: 'n3', x: 45, y: 30, expect: 'mai' },
      { id: 'n4', x: 65, y: 20, expect: 'shu' },
      { id: 'n5', x: 45, y: 70, expect: 'kan' },
      { id: 'n6', x: 65, y: 80, expect: 'dianying' },
      { id: 'n7', x: 85, y: 50, expect: 'ta' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n3', to: 'n7' },
      { from: 'n5', to: 'n7' },
    ],
    pool: ['wo', 'xihuan', 'mai', 'shu', 'kan', 'dianying', 'ta'],
  },
  {
    level: 21,
    nodes: [
      { id: 'n1', x: 10, y: 50, expect: 'pengyou' },
      { id: 'n2', x: 30, y: 50, expect: 'bu' },
      { id: 'n3', x: 50, y: 50, expect: 'qu' },
      { id: 'n4', x: 70, y: 20, expect: 'beijing' },
      { id: 'n5', x: 70, y: 50, expect: 'yiyuan' },
      { id: 'n6', x: 70, y: 80, expect: 'xuexiao' },
      { id: 'n7', x: 90, y: 50, expect: 'mama' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
      { from: 'n3', to: 'n6' },
      { from: 'n5', to: 'n7' },
    ],
    pool: ['pengyou', 'bu', 'qu', 'beijing', 'yiyuan', 'xuexiao', 'mama'],
  },
  {
    level: 22,
    nodes: [
      { id: 'n1', x: 15, y: 15, expect: 'wo' },
      { id: 'n2', x: 40, y: 15, expect: 'he' },
      { id: 'n3', x: 65, y: 15, expect: 'shui' },
      { id: 'n4', x: 15, y: 50, expect: 'ta' },
      { id: 'n5', x: 40, y: 50, expect: 'he' },
      { id: 'n6', x: 65, y: 50, expect: 'cha' },
      { id: 'n7', x: 15, y: 85, expect: 'mama' },
      { id: 'n8', x: 40, y: 85, expect: 'he' },
      { id: 'n9', x: 65, y: 85, expect: 'kafei' },
      { id: 'n10', x: 90, y: 50, expect: 'baba' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n7', to: 'n8' },
      { from: 'n8', to: 'n9' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n8' },
      { from: 'n6', to: 'n10' },
    ],
    pool: [
      'wo',
      'he',
      'shui',
      'ta',
      'he',
      'cha',
      'mama',
      'he',
      'kafei',
      'baba',
    ],
  },
  {
    level: 23,
    nodes: [
      { id: 'n1', x: 10, y: 50, expect: 'laoshi' },
      { id: 'n2', x: 30, y: 50, expect: 'xihuan' },
      { id: 'n3', x: 50, y: 30, expect: 'kan' },
      { id: 'n4', x: 70, y: 20, expect: 'shu' },
      { id: 'n5', x: 50, y: 70, expect: 'mai' },
      { id: 'n6', x: 70, y: 80, expect: 'pingguo' },
      { id: 'n7', x: 90, y: 50, expect: 'meimei' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n2', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n4', to: 'n7' },
      { from: 'n6', to: 'n7' },
    ],
    pool: ['laoshi', 'xihuan', 'kan', 'shu', 'mai', 'pingguo', 'meimei'],
  },
  {
    level: 24,
    nodes: [
      { id: 'n1', x: 20, y: 20, expect: 'baba' },
      { id: 'n2', x: 40, y: 20, expect: 'qu' },
      { id: 'n3', x: 60, y: 20, expect: 'shangdian' },
      { id: 'n4', x: 80, y: 20, expect: 'mai' },
      { id: 'n5', x: 95, y: 50, expect: 'pijiu' },
      { id: 'n6', x: 80, y: 80, expect: 'chi' },
      { id: 'n7', x: 60, y: 80, expect: 'fan' },
      { id: 'n8', x: 40, y: 80, expect: 'bu' },
      { id: 'n9', x: 20, y: 80, expect: 'mama' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n9', to: 'n8' },
      { from: 'n8', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n5', to: 'n6' },
    ],
    pool: [
      'baba',
      'qu',
      'shangdian',
      'mai',
      'pijiu',
      'chi',
      'fan',
      'bu',
      'mama',
    ],
  },
  {
    level: 25,
    nodes: [
      { id: 'n1', x: 10, y: 10, expect: 'wo' },
      { id: 'n2', x: 30, y: 10, expect: 'xihuan' },
      { id: 'n3', x: 50, y: 10, expect: 'he' },
      { id: 'n4', x: 70, y: 10, expect: 'cha' },
      { id: 'n5', x: 90, y: 30, expect: 'ta' },
      { id: 'n6', x: 90, y: 50, expect: 'bu' },
      { id: 'n7', x: 90, y: 70, expect: 'xihuan' },
      { id: 'n8', x: 70, y: 90, expect: 'he' },
      { id: 'n9', x: 50, y: 90, expect: 'pijiu' },
      { id: 'n10', x: 30, y: 90, expect: 'mama' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n7', to: 'n8' },
      { from: 'n8', to: 'n9' },
      { from: 'n9', to: 'n10' },
    ],
    pool: [
      'wo',
      'xihuan',
      'he',
      'cha',
      'ta',
      'bu',
      'xihuan',
      'he',
      'pijiu',
      'mama',
    ],
  },
  {
    level: 26,
    nodes: [
      { id: 'n1', x: 50, y: 50, expect: 'xihuan' },
      { id: 'n2', x: 30, y: 30, expect: 'wo' },
      { id: 'n3', x: 70, y: 30, expect: 'ta' },
      { id: 'n4', x: 30, y: 70, expect: 'mama' },
      { id: 'n5', x: 70, y: 70, expect: 'baba' },
      { id: 'n6', x: 50, y: 20, expect: 'kan' },
      { id: 'n7', x: 50, y: 80, expect: 'chi' },
      { id: 'n8', x: 80, y: 50, expect: 'mai' },
      { id: 'n9', x: 20, y: 50, expect: 'he' },
    ],
    paths: [
      { from: 'n2', to: 'n1' },
      { from: 'n3', to: 'n1' },
      { from: 'n4', to: 'n1' },
      { from: 'n5', to: 'n1' },
      { from: 'n1', to: 'n6' },
      { from: 'n1', to: 'n7' },
      { from: 'n1', to: 'n8' },
      { from: 'n1', to: 'n9' },
    ],
    pool: ['xihuan', 'wo', 'ta', 'mama', 'baba', 'kan', 'chi', 'mai', 'he'],
  },
  {
    level: 27,
    nodes: [
      { id: 'n1', x: 10, y: 50, expect: 'laoshi' },
      { id: 'n2', x: 25, y: 50, expect: 'bu' },
      { id: 'n3', x: 40, y: 50, expect: 'xihuan' },
      { id: 'n4', x: 55, y: 30, expect: 'qu' },
      { id: 'n5', x: 75, y: 20, expect: 'beijing' },
      { id: 'n6', x: 55, y: 70, expect: 'kan' },
      { id: 'n7', x: 75, y: 80, expect: 'dianying' },
      { id: 'n8', x: 90, y: 50, expect: 'pengyou' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n3', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n5', to: 'n8' },
      { from: 'n7', to: 'n8' },
    ],
    pool: [
      'laoshi',
      'bu',
      'xihuan',
      'qu',
      'beijing',
      'kan',
      'dianying',
      'pengyou',
    ],
  },
  {
    level: 28,
    nodes: [
      { id: 'n1', x: 20, y: 20, expect: 'gege' },
      { id: 'n2', x: 40, y: 20, expect: 'mai' },
      { id: 'n3', x: 60, y: 20, expect: 'shu' },
      { id: 'n4', x: 80, y: 40, expect: 'jiejie' },
      { id: 'n5', x: 80, y: 60, expect: 'kan' },
      { id: 'n6', x: 60, y: 80, expect: 'shu' },
      { id: 'n7', x: 40, y: 80, expect: 'didi' },
      { id: 'n8', x: 20, y: 60, expect: 'chi' },
      { id: 'n9', x: 20, y: 40, expect: 'fan' },
    ],
    paths: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n7', to: 'n8' },
      { from: 'n8', to: 'n9' },
      { from: 'n9', to: 'n1' },
    ],
    pool: ['gege', 'mai', 'shu', 'jiejie', 'kan', 'shu', 'didi', 'chi', 'fan'],
  },
  {
    level: 29,
    nodes: [
      { id: 'n1', x: 10, y: 10, expect: 'mama' },
      { id: 'n2', x: 10, y: 90, expect: 'baba' },
      { id: 'n3', x: 30, y: 50, expect: 'xihuan' },
      { id: 'n4', x: 50, y: 30, expect: 'mai' },
      { id: 'n5', x: 70, y: 20, expect: 'pingguo' },
      { id: 'n6', x: 50, y: 70, expect: 'he' },
      { id: 'n7', x: 70, y: 80, expect: 'cha' },
      { id: 'n8', x: 90, y: 50, expect: 'wo' },
    ],
    paths: [
      { from: 'n1', to: 'n3' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n3', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n5', to: 'n8' },
      { from: 'n7', to: 'n8' },
    ],
    pool: ['mama', 'baba', 'xihuan', 'mai', 'pingguo', 'he', 'cha', 'wo'],
  },
  {
    level: 30,
    nodes: [
      { id: 'n1', x: 50, y: 50, expect: 'bu' },
      { id: 'n2', x: 30, y: 50, expect: 'wo' },
      { id: 'n3', x: 70, y: 50, expect: 'xihuan' },
      { id: 'n4', x: 50, y: 30, expect: 'ta' },
      { id: 'n5', x: 50, y: 70, expect: 'mama' },
      { id: 'n6', x: 15, y: 15, expect: 'chi' },
      { id: 'n7', x: 85, y: 15, expect: 'he' },
      { id: 'n8', x: 15, y: 85, expect: 'qu' },
      { id: 'n9', x: 85, y: 85, expect: 'kan' },
    ],
    paths: [
      { from: 'n2', to: 'n1' },
      { from: 'n4', to: 'n1' },
      { from: 'n5', to: 'n1' },
      { from: 'n1', to: 'n3' },
      { from: 'n3', to: 'n6' },
      { from: 'n3', to: 'n7' },
      { from: 'n3', to: 'n8' },
      { from: 'n3', to: 'n9' },
    ],
    pool: ['bu', 'wo', 'xihuan', 'ta', 'mama', 'chi', 'he', 'qu', 'kan'],
  },
];

/**
 * [2. 로직: 진척도 및 화면 관리]
 */
function getClearedStages() {
  const saved = localStorage.getItem('chineseConstellationProgress');
  return saved ? JSON.parse(saved) : [];
}

function saveStageClear(idx) {
  let cleared = getClearedStages();
  if (!cleared.includes(idx)) {
    cleared.push(idx);
    localStorage.setItem(
      'chineseConstellationProgress',
      JSON.stringify(cleared),
    );
  }
}

function createLobby() {
  const grid = document.getElementById('stage-grid');
  grid.innerHTML = '';
  const cleared = getClearedStages();

  for (let i = 0; i < TOTAL_STAGES; i++) {
    const btn = document.createElement('button');
    btn.className = 'stage-btn';
    if (cleared.includes(i)) {
      btn.classList.add('completed');
      btn.innerText = '✔';
    } else {
      btn.innerText = i + 1;
    }

    if (STAGES[i]) btn.onclick = () => startStage(i);
    else {
      btn.style.opacity = '0.2';
      btn.style.cursor = 'default';
    }
    grid.appendChild(btn);
  }
}

function showLobby() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('lobby-screen').classList.remove('hidden');
  clearAllTiles();
  createLobby();
}

function startStage(idx) {
  currentStageIdx = idx;
  document.getElementById('lobby-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  initStage(idx);
}

/**
 * [3. 로직: 게임 엔진]
 */
function clearAllTiles() {
  document.getElementById('node-container').innerHTML = '';
  document.getElementById('constellation-svg').innerHTML = '';
  document.getElementById('dock-inner').innerHTML = '';
  document.querySelectorAll('.star-tile').forEach((t) => t.remove());
}

function initStage(idx) {
  const stage = STAGES[idx];
  if (!stage) return;

  clearAllTiles();
  document.getElementById('stage-num').innerText =
    `STAGE ${String(idx + 1).padStart(2, '0')}`;
  document.getElementById('victory-overlay').classList.add('hidden');

  // 노드 생성
  stage.nodes.forEach((n) => {
    const div = document.createElement('div');
    div.className = 'node';
    div.style.left = n.x + '%';
    div.style.top = n.y + '%';
    div.dataset.id = n.id;
    document.getElementById('node-container').appendChild(div);
  });

  // 선 생성
  stage.paths.forEach((p) => {
    const from = stage.nodes.find((n) => n.id === p.from);
    const to = stage.nodes.find((n) => n.id === p.to);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', from.x + '%');
    line.setAttribute('y1', from.y + '%');
    line.setAttribute('x2', to.x + '%');
    line.setAttribute('y2', to.y + '%');
    line.setAttribute('id', `l-${p.from}-${p.to}`);
    line.setAttribute('class', 'path');
    document.getElementById('constellation-svg').appendChild(line);
  });

  // 랜덤 셔플
  const shuffledPool = [...stage.pool].sort(() => Math.random() - 0.5);

  shuffledPool.forEach((id) => {
    const data = TILE_DATA[id];
    if (!data) return;
    const tile = document.createElement('div');
    tile.className = 'star-tile';
    tile.innerHTML = `<span class="hanzi">${data.hanzi}</span><span class="pinyin">${data.pinyin}</span>`;
    tile.dataset.id = id;
    makeDraggable(tile);
    document.getElementById('dock-inner').appendChild(tile);
  });
}

function makeDraggable(tile) {
  let offsetX, offsetY;
  tile.onmousedown = function (e) {
    if (tile.classList.contains('locked')) return;
    tile.classList.add('dragging');
    const rect = tile.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    tile.style.position = 'fixed';
    tile.style.left = rect.left + 'px';
    tile.style.top = rect.top + 'px';
    document.body.appendChild(tile);

    function onMouseMove(e) {
      tile.style.left = e.clientX - offsetX + 'px';
      tile.style.top = e.clientY - offsetY + 'px';
      checkHover(tile);
    }
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      tile.classList.remove('dragging');
      if (!trySnap(tile)) {
        tile.style.position = 'static';
        tile.style.transform = 'none';
        document.getElementById('dock-inner').appendChild(tile);
      }
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  tile.ondragstart = () => false;
}

function checkHover(tile) {
  const tRect = tile.getBoundingClientRect();
  const tx = tRect.left + tRect.width / 2;
  const ty = tRect.top + tRect.height / 2;
  document.querySelectorAll('.node').forEach((node) => {
    const nRect = node.getBoundingClientRect();
    const dist = Math.hypot(
      tx - (nRect.left + nRect.width / 2),
      ty - (nRect.top + nRect.height / 2),
    );
    if (dist < 60 && !node.classList.contains('filled'))
      node.classList.add('highlight');
    else node.classList.remove('highlight');
  });
}

function trySnap(tile) {
  const tRect = tile.getBoundingClientRect();
  const tx = tRect.left + tRect.width / 2;
  const ty = tRect.top + tRect.height / 2;
  let snapped = false;
  document.querySelectorAll('.node').forEach((node) => {
    if (snapped || node.classList.contains('filled')) return;
    const nRect = node.getBoundingClientRect();
    const dist = Math.hypot(
      tx - (nRect.left + nRect.width / 2),
      ty - (nRect.top + nRect.height / 2),
    );
    if (dist < 60) {
      const stage = STAGES[currentStageIdx];
      const nodeData = stage.nodes.find((n) => n.id === node.dataset.id);
      if (nodeData.expect === tile.dataset.id) {
        node.classList.remove('highlight');
        node.classList.add('filled');
        tile.classList.add('locked');
        tile.style.left = nRect.left + nRect.width / 2 + 'px';
        tile.style.top = nRect.top + nRect.height / 2 + 'px';
        tile.style.transform = 'translate(-50%, -50%)';
        snapped = true;
        updatePaths();
        checkVictory();
      }
    }
  });
  return snapped;
}

function updatePaths() {
  STAGES[currentStageIdx].paths.forEach((p) => {
    const fromNode = document.querySelector(`.node[data-id="${p.from}"]`);
    const toNode = document.querySelector(`.node[data-id="${p.to}"]`);
    if (
      fromNode &&
      toNode &&
      fromNode.classList.contains('filled') &&
      toNode.classList.contains('filled')
    ) {
      const line = document.getElementById(`l-${p.from}-${p.to}`);
      if (line) line.classList.add('active');
    }
  });
}

function checkVictory() {
  const total = STAGES[currentStageIdx].nodes.length;
  const filled = document.querySelectorAll('.node.filled').length;
  if (total === filled) {
    saveStageClear(currentStageIdx);
    setTimeout(
      () =>
        document.getElementById('victory-overlay').classList.remove('hidden'),
      500,
    );
  }
}

function loadNextStage() {
  if (currentStageIdx < STAGES.length - 1) {
    currentStageIdx++;
    initStage(currentStageIdx);
  } else {
    alert('모든 별자리를 깨웠습니다!');
    showLobby();
  }
}

window.onload = () => createLobby();

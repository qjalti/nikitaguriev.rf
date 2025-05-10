/**
 * Блок подключения модулей/импортов
 */
import React from 'react';
import {
  // createTheme,
  Box,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails, Grow, Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Helmet} from 'react-helmet-async';

/**
 * DotA 2
 */
import dotaImg from '../files/sfg/dota/dota.png';
import dota01 from '../files/sfg/dota/001.mp3';
import dota02 from '../files/sfg/dota/002.mp3';
import dota03 from '../files/sfg/dota/003.mp3';
import dota04 from '../files/sfg/dota/004.mp3';
import dota05 from '../files/sfg/dota/005.mp3';
import dota06 from '../files/sfg/dota/006.mp3';

/**
 * WoW
 */
import wowImg from '../files/sfg/wow/worldofwarcraft.png';
import wow01 from '../files/sfg/wow/001.mp3';
import wow02 from '../files/sfg/wow/002.mp3';

/**
 * Marvel
 */
import marvelImg from '../files/sfg/marvel/marvel.png';
import marvel01 from '../files/sfg/marvel/001.mp3';
import marvel02 from '../files/sfg/marvel/002.mp3';
import marvel03 from '../files/sfg/marvel/003.mp3';
import marvel04 from '../files/sfg/marvel/004.mp3';
import marvel05 from '../files/sfg/marvel/005.mp3';
import marvel06 from '../files/sfg/marvel/006.mp3';

/**
 * Lord Dremora (TES V: Skyrim)
 */
import tesDremoraImg from '../files/sfg/dremora/dremora.png';
import tesDremora01 from '../files/sfg/dremora/001.wav';
import tesDremora02 from '../files/sfg/dremora/002.wav';
import tesDremora03 from '../files/sfg/dremora/003.wav';
import tesDremora04 from '../files/sfg/dremora/004.wav';

/**
 * Известные персонажи TES 5: Skyrim
 */
import tesFamousImg from '../files/sfg/famous_characters/skyrim.png';
import tesFamous01 from '../files/sfg/famous_characters/kodlak_sovngarde.mp3';

/**
 * Профессор Круглов (S.T.A.L.K.E.R.)
 */
import stalkerKruglovImg from '../files/sfg/kruglov/kruglov.png';
import stalkerKruglov01 from '../files/sfg/kruglov/001.mp3';
import stalkerKruglov02 from '../files/sfg/kruglov/002.mp3';

/**
 * Бандит (S.T.A.L.K.E.R.)
 */
import stalkerBanditImg from '../files/sfg/bandit/bandit.png';
import stalkerBandit01 from '../files/sfg/bandit/001.mp3';

/**
 * О-Сознание (S.T.A.L.K.E.R.)
 */
import stalkerOsoznanieImg from '../files/sfg/o_soznanie/o_soznanie.png';
import stalkerOsoznanie01 from '../files/sfg/o_soznanie/001.mp3';
import stalkerOsoznanie02 from '../files/sfg/o_soznanie/002.mp3';
import stalkerOsoznanie03 from '../files/sfg/o_soznanie/003.mp3';
import stalkerOsoznanie04 from '../files/sfg/o_soznanie/004.mp3';
import stalkerOsoznanie05 from '../files/sfg/o_soznanie/005.mp3';
import stalkerOsoznanie06 from '../files/sfg/o_soznanie/006.mp3';
import stalkerOsoznanie07 from '../files/sfg/o_soznanie/007.mp3';
import stalkerOsoznanie08 from '../files/sfg/o_soznanie/008.mp3';
import stalkerOsoznanie09 from '../files/sfg/o_soznanie/009.mp3';
import stalkerOsoznanie010 from '../files/sfg/o_soznanie/010.mp3';

/**
 * Нежить (Warcraft 3)
 */
import warcraftUndeadImg from '../files/sfg/warcraft_3_undead/undead.png';
import warcraftUndead01 from '../files/sfg/warcraft_3_undead/001.wav';
import warcraftUndead02 from '../files/sfg/warcraft_3_undead/002.wav';
import warcraftUndead03 from '../files/sfg/warcraft_3_undead/003.wav';
import warcraftUndead04 from '../files/sfg/warcraft_3_undead/004.wav';
import warcraftUndead05 from '../files/sfg/warcraft_3_undead/005.wav';
import warcraftUndead06 from '../files/sfg/warcraft_3_undead/006.wav';
import warcraftUndead07 from '../files/sfg/warcraft_3_undead/007.wav';
import warcraftUndead08 from '../files/sfg/warcraft_3_undead/008.wav';
import warcraftUndead09 from '../files/sfg/warcraft_3_undead/009.wav';
import warcraftUndead010 from '../files/sfg/warcraft_3_undead/010.wav';
import warcraftUndead011 from '../files/sfg/warcraft_3_undead/011.wav';

/**
 * Орда (Warcraft 3)
 */
import warcraftHordeImg from '../files/sfg/warcraft_3_horde/horde.png';
import warcraftHorde01 from '../files/sfg/warcraft_3_horde/001.wav';
import warcraftHorde02 from '../files/sfg/warcraft_3_horde/002.wav';
import warcraftHorde03 from '../files/sfg/warcraft_3_horde/003.wav';
import warcraftHorde04 from '../files/sfg/warcraft_3_horde/004.wav';
import warcraftHorde05 from '../files/sfg/warcraft_3_horde/005.wav';
import warcraftHorde06 from '../files/sfg/warcraft_3_horde/006.wav';
import warcraftHorde07 from '../files/sfg/warcraft_3_horde/007.wav';
import warcraftHorde08 from '../files/sfg/warcraft_3_horde/008.wav';

/**
 * Тралл (Warcraft 3)
 */
import warcraftThrallImg from '../files/sfg/thrall/thrall.png';
import warcraftThrall01 from '../files/sfg/thrall/001.wav';
import warcraftThrall02 from '../files/sfg/thrall/002.wav';
import warcraftThrall03 from '../files/sfg/thrall/003.wav';

/**
 * Warcraft 3. Разное
 */
import warcraftOtherImg from '../files/sfg/warcraft_3_other/warcraft3.png';
import warcraftOther01
  from '../files/sfg/warcraft_3_other/TheHornOfCenarius.wav';
import warcraftOther02
  from '../files/sfg/warcraft_3_other/FrostmourneChant1.wav';
import warcraftOther03
  from '../files/sfg/warcraft_3_other/KnightNoLumber1.wav';
import warcraftOther04
  from '../files/sfg/warcraft_3_other/NecromancerNoGold1.wav';
import warcraftOther05
  from '../files/sfg/warcraft_3_other/NecromancerNoFood1.wav';
import warcraftOther06 from '../files/sfg/warcraft_3_other/SlowTarget.wav';
import warcraftOther07 from '../files/sfg/warcraft_3_other/Tomes.wav';
import warcraftOther08
  from '../files/sfg/warcraft_3_other/BloodlustTarget.wav';
import warcraftOther09 from '../files/sfg/warcraft_3_other/MirrorImage.wav';
import warcraftOther010
  from '../files/sfg/warcraft_3_other/Levelupcaster.wav';
import warcraftOther011
  from '../files/sfg/warcraft_3_other/AcolyteMining.wav';
import warcraftOther012 from '../files/sfg/warcraft_3_other/SleepBirth1.wav';

/**
 * Калеб (Blood)
 */
import calebImg from '../files/sfg/caleb/caleb.png';
import caleb01 from '../files/sfg/caleb/llmtic.mp3';
import caleb02 from '../files/sfg/caleb/imstt.mp3';

const SOUNDS = [
  {
    category_name: 'DotA 2',
    category_image: dotaImg,
    sounds: [
      {
        src: dota01,
        text: 'Крик Урсы (Overpower)',
      },
      {
        src: dota02,
        text: 'Крик Урсы (Enrage)',
      },
      {
        src: dota03,
        text: 'Legion Commander (Press the Attack)',
      },
      {
        src: dota04,
        text: 'Spirit Breaker (Charge of Darkness)',
      },
      {
        src: dota05,
        text: 'Spirit Breaker (Greater Bash)',
      },
      {
        src: dota06,
        text: 'Reincarnation (Aegis of the Immortal)',
      },
    ],
  },
  {
    category_name: 'World of Warcraft',
    category_image: wowImg,
    sounds: [
      {
        src: wow01,
        text: '...Артас...',
      },
      {
        src: wow02,
        text: 'Пробуждение Короля-лича',
      },
    ],
  },
  {
    category_name: 'Marvel',
    category_image: marvelImg,
    sounds: [
      {
        src: marvel01,
        text: 'Использование камня времени (Доктор Стрэндж)',
      },
      {
        src: marvel02,
        text: 'Использование камня времени (Танос)',
      },
      {
        src: marvel03,
        text: 'Кручённый бросок гром-секиры (Тор)',
      },
      {
        src: marvel04,
        text: 'Использование камня реальности (Танос)',
      },
      {
        src: marvel05,
        text: 'Использование камня пространства (Танос)',
      },
      {
        src: marvel06,
        text: '«Роковая ошибка...» (Танос)',
      },
    ],
  },
  {
    category_name: 'Лорд Дремора (TES V: Skyrim)',
    category_image: tesDremoraImg,
    sounds: [
      {
        src: tesDremora01,
        text: 'Вот ты где, слабак!',
      },
      {
        src: tesDremora02,
        text: 'Я чую слабость!',
      },
      {
        src: tesDremora03,
        text: 'Ты слабак, смертный червь!',
      },
      {
        src: tesDremora04,
        text: 'Ты мне не ровня!',
      },
    ],
  },
  {
    category_name: 'Известные персонажи (TES 5: Skyrim)',
    category_image: tesFamousImg,
    sounds: [
      {
        src: tesFamous01,
        text: 'Иногда мне снятся туманы Совнгарда... (Кодлак Белая Грива)',
      },
    ],
  },
  {
    category_name: 'Профессор Круглов (S.T.A.L.K.E.R.)',
    category_image: stalkerKruglovImg,
    sounds: [
      {
        src: stalkerKruglov01,
        text: 'Держите меня семеро!',
      },
      {
        src: stalkerKruglov02,
        text: 'Ура!',
      },
    ],
  },
  {
    category_name: 'Бандит (S.T.A.L.K.E.R.)',
    category_image: stalkerBanditImg,
    sounds: [
      {
        src: stalkerBandit01,
        text: 'Мля, я маслину поймал!',
      },
    ],
  },
  {
    category_name: 'О-Сознание (S.T.A.L.K.E.R.)',
    category_image: stalkerOsoznanieImg,
    sounds: [
      {
        src: stalkerOsoznanie01,
        text: 'Нет, мы здесь не причём...',
      },
      {
        src: stalkerOsoznanie02,
        text: 'Это транспорт, на котором...',
      },
      {
        src: stalkerOsoznanie03,
        text: 'Здравствуй, Стрелок....',
      },
      {
        src: stalkerOsoznanie04,
        text: 'Выбор за тобой, Стрелок.',
      },
      {
        src: stalkerOsoznanie05,
        text: 'S.T.A.L.K.E.R. — это название программы...',
      },
      {
        src: stalkerOsoznanie06,
        text: 'Ты выпавший из механизма...',
      },
      {
        src: stalkerOsoznanie07,
        text: 'Зона — это результат...',
      },
      {
        src: stalkerOsoznanie08,
        text: 'Что будет дальше зависит от тебя...',
      },
      {
        src: stalkerOsoznanie09,
        text: 'Мы «О-Сознание»...',
      },
      {
        src: stalkerOsoznanie010,
        text: 'Чернобыльская АЭС была...',
      },
    ],
  },
  {
    category_name: 'Нежить (Warcraft 3)',
    category_image: warcraftUndeadImg,
    sounds: [
      {
        src: warcraftUndead01,
        text: 'Я поклялся служить Нер\'Зулу',
      },
      {
        src: warcraftUndead02,
        text: 'Я воплощение тьмы!',
      },
      {
        src: warcraftUndead03,
        text: 'Как глупо было верить в свет!',
      },
      {
        src: warcraftUndead04,
        text: 'Говори, глупец!',
      },
      {
        src: warcraftUndead05,
        text: 'Никто не смеет мне приказывать!',
      },
      {
        src: warcraftUndead06,
        text: 'Фростморн жаждет крови!',
      },
      {
        src: warcraftUndead07,
        text: 'Фростморн!!!',
      },
      {
        src: warcraftUndead08,
        text: 'Кто тяжело работает — тот тяжело отдыхает',
      },
      {
        src: warcraftUndead09,
        text: 'Спящий пробудился',
      },
      {
        src: warcraftUndead010,
        text: 'Вы звали меня?',
      },
      {
        src: warcraftUndead011,
        text: 'Спокойсвие, только спокойствие... Сейчас я Вас настигну',
      },
    ],
  },
  {
    category_name: 'Орда (Warcraft 3)',
    category_image: warcraftHordeImg,
    sounds: [
      {
        src: warcraftHorde01,
        text: 'Хм... Надвигается буря...',
      },
      {
        src: warcraftHorde02,
        text: 'Ноют старые кости...',
      },
      {
        src: warcraftHorde03,
        text: 'Смелее, мой юный друг!',
      },
      {
        src: warcraftHorde04,
        text: 'С нами мать Земля!',
      },
      {
        src: warcraftHorde05,
        text: 'Моя жизнь принадлежит Орде!',
      },
      {
        src: warcraftHorde06,
        text: 'Зул\'Джин будет отмщен!',
      },
      {
        src: warcraftHorde07,
        text: 'Да хранят меня мои предки!',
      },
      {
        src: warcraftHorde08,
        text: 'Вольчя тропа ждёт!',
      },
    ],
  },
  {
    category_name: 'Тралл (Warcraft 3)',
    category_image: warcraftThrallImg,
    sounds: [
      {
        src: warcraftThrall01,
        text: 'Духи не знают усталости',
      },
      {
        src: warcraftThrall02,
        text: 'Я вождь!',
      },
      {
        src: warcraftThrall03,
        text: 'Лок\'тар огар!',
      },
    ],
  },
  {
    category_name: 'Warcraft 3. Разное',
    category_image: warcraftOtherImg,
    sounds: [
      {
        src: warcraftOther01,
        text: 'Рог Кенария',
      },
      {
        src: warcraftOther02,
        text: 'Нашептывание Фростморна',
      },
      {
        src: warcraftOther03,
        text: 'Нехватает дерева',
      },
      {
        src: warcraftOther04,
        text: 'Нужно больше золота',
      },
      {
        src: warcraftOther05,
        text: 'Нужно построить зиккурат',
      },
      {
        src: warcraftOther06,
        text: 'Замедление',
      },
      {
        src: warcraftOther07,
        text: 'Поднятие тома',
      },
      {
        src: warcraftOther08,
        text: 'Кровожадность',
      },
      {
        src: warcraftOther09,
        text: 'Иллюзия',
      },
      {
        src: warcraftOther010,
        text: 'Повышение уровня',
      },
      {
        src: warcraftOther011,
        text: 'Возведение здания',
      },
      {
        src: warcraftOther012,
        text: 'Усыпление',
      },
    ],
  },
  {
    category_name: 'Калеб (Blood)',
    category_image: calebImg,
    sounds: [
      {
        src: caleb01,
        text: 'Looks like my train\'s is come in...',
      },
      {
        src: caleb02,
        text: 'I must stop this train!',
      },
    ],
  },
];

export const SFG = () => {
  let soundsCounter = 0;
  return (
    <>
      <Helmet>
        {/* Базовая информация */}
        <title>Звуки из видеоигр — слушай онлайн</title>
        <meta name="description"
          content="Коллекция звуков, фраз и музыки из популярных игр — от ностальгических до современных. Слушай онлайн, делись и вдохновляйся!"/>

        {/* Open Graph для соцсетей */}
        <meta property="og:type" content="website"/>
        <meta property="og:title"
          content="Звуки из видеоигр — слушай онлайн"/>
        <meta property="og:description"
          content="Фразы, звуки и музыка из любимых игр: от старых хитов до новых релизов. Всё в одном месте."/>
        <meta property="og:url" content="https://qjalti.ru/sfg"/>
        <meta property="og:image"
          content="https://qjalti.ru/programmer.webp"/>
        <meta property="og:locale" content="ru_RU"/>

        {/* Twitter-карточка */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title"
          content="Звуки из видеоигр — слушай онлайн"/>
        <meta name="twitter:description"
          content="Огромная коллекция игровых звуков и музыки. Вспомни любимые моменты из игр!"/>
        <meta name="twitter:image"
          content="https://qjalti.ru/programmer.webp"/>
      </Helmet>
      <Grow
        in
      >
        <Box sx={{flexGrow: 1}}>
          <Container sx={{textAlign: 'center'}}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                {SOUNDS.map((sounds) => {
                  soundsCounter++;
                  return (
                    <Accordion key={soundsCounter}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                      >
                        <Typography>{sounds.category_name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          component="img"
                          src={sounds.category_image}
                          sx={{mb: 2}}
                        />
                        {sounds.sounds.map((sound) => (
                          <>
                            <Typography gutterBottom>
                              {sound.text}
                            </Typography>
                            <Box
                              component="audio"
                              src={sound.src}
                              controls
                            />
                          </>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
                <Button
                  sx={{mt: 2}}
                  href="https://t.me/NikitaGuriev"
                  target="_blank"
                >
                    Предложить добавить новые звуки
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Grow>
    </>
  );
};

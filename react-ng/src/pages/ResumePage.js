/**
 * Блок подключения модулей
 */
import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Alert,
  Button,
  Grid,
  Divider,
  Link,
  LinearProgress,
  Chip,
  Paper, Grow,
} from '@mui/material';
import moment from 'moment';

/**
 * Изображения
 */
import MyAvatar from './me_new.jpg';
import MyCertificate from './cert.jpg';

/**
 * Иконки
 */
import ForwardToInboxOutlinedIcon
  from '@mui/icons-material/ForwardToInboxOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlternateEmailOutlinedIcon
  from '@mui/icons-material/AlternateEmailOutlined';

/**
 * Файлы
 */
import resumeFile from '../files/resume.pdf';

/**
 * Блок определения констант
 */
const AVATAR_SIZES = 192;
const MINIMUM_SALARY = false;
const NAME = 'Никита';
const SURNAME = 'Гуриев';
const ADDRESS_FL = `Краснобогатырская улица, д. 75 к. 2`;
const ADDRESS_SL = `107076 Москва`;
const EMAIL = 'stig.guriev@gmail.com';
const INTERESTS = [
  {
    key: 0,
    title: 'Программирование',
  },
  {
    key: 1,
    title: 'Умный дом/IoT',
  },
  {
    key: 2,
    title: 'Астрономия',
  },
  {
    key: 3,
    title: 'Фотография',
  },
  {
    key: 4,
    title: 'Путешествия',
  },
  {
    key: 5,
    title: 'Видеосъемка',
  },
];
const IS_SEARCH_FOR_JOB = false;
const MY_AGE = moment().diff('1993-03-17', 'years');
const MARITAL_STATUS = 'Холост, детей нет';

export const Resume = () => {
  return (
    <Grow
      in
    >
      <Box sx={{flexGrow: 1}}>
        <Paper
          sx={{p: 4}}
        >
          <Grid container spacing={4}>
            {/* Левая колонка */}
            <Grid item xs={12} md={4}>
              <Box>

                <Avatar
                  alt="Фотография"
                  src={MyAvatar}
                  sx={{
                    height: AVATAR_SIZES,
                    width: AVATAR_SIZES,
                    mx: 'auto',
                    my: 2,
                  }}
                />
                {
                  IS_SEARCH_FOR_JOB ?
                    <>
                      <Alert
                        severity="success"
                        sx={{mx: 'auto', my: 2}}>
                        В поиске работы
                      </Alert>
                      <Alert
                        severity="info"
                        sx={{mx: 'auto', my: 2}}>
                        {
                          MINIMUM_SALARY ?
                            <>
                              Зарплата
                              от {
                                MINIMUM_SALARY.toLocaleString('ru-RU')
                              } &#8381;
                            </> :
                            <>
                              Зарплата договорная
                            </>
                        }
                      </Alert>
                    </> :
                    <Alert
                      severity="error"
                      sx={{mx: 'auto', my: 2}}>
                      Не ищу работу
                    </Alert>
                }
                <Box sx={{my: 2}}>
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        startIcon={<TelegramIcon/>}
                        color="info"
                        href="https://t.me/qjalti"
                      >
                        Telegram
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        startIcon={<WhatsAppIcon/>}
                        color="success"
                        href="https://wa.me/79883857654"
                      >
                        WhatsApp
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        startIcon={<AlternateEmailOutlinedIcon/>}
                        color="warning"
                        href="mailto:stig.guriev@gmail.com"
                      >
                        E-Mail
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Grid
                  container
                  spacing={1}
                  sx={{pb: 2}}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      href={resumeFile}
                    >
                      Скачать резюме
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  sx={{pb: 2}}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Chip
                      label="Fullstack разработчик"
                      color="primary"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Chip label="MongoDB" size="small"/>
                  </Grid>
                  <Grid item>
                    <Chip label="ExpressJS" size="small"/>
                  </Grid>
                  <Grid item>
                    <Chip label="React" size="small"/>
                  </Grid>
                  <Grid item>
                    <Chip label="MUI 5" size="small"/>
                  </Grid>
                  <Grid item>
                    <Chip label="Bootstrap 5" size="small"/>
                  </Grid>
                  <Grid item>
                    <Chip label="NodeJS" size="small"/>
                  </Grid>
                  <Grid item>
                    <Chip label="GraphQL" size="small"/>
                  </Grid>
                </Grid>
                <Alert
                  severity="success"
                  sx={{my: 2}}
                >
                  13.03.2022 <strong>победил</strong> в <Button
                    href="https://iqarium.ru/hakatontime" target="_blank"
                    size="small">IT-Хакатоне</Button>,
                  заняв <strong>третье</strong> место,
                  среди <strong>16</strong> команд. В команде исполнял
                  роль <strong>Backend разработчика</strong>. Использовал
                  стек: <em>nginx, Node.js, ExpressJS, MongoDB</em>.
                  Кейс: <strong>Сервис для помощи в сортировке бытовых
                  отходов</strong>
                </Alert>
                <Typography variant="h6" gutterBottom>
                  Личные данные
                </Typography>
                <Divider sx={{mb: 2}}/>
                <Box sx={{my: 2}}>
                  <Typography sx={{fontWeight: 'bold'}}>
                    Имя
                  </Typography>
                  <Typography>
                    {NAME} {SURNAME}
                  </Typography>
                </Box>
                <Box sx={{my: 2}}>
                  <Typography sx={{fontWeight: 'bold'}}>
                    Возраст
                  </Typography>
                  <Typography>
                    {MY_AGE}
                  </Typography>
                </Box>
                <Box sx={{my: 2}}>
                  <Typography sx={{fontWeight: 'bold'}}>
                    Семейное положение
                  </Typography>
                  <Typography>
                    {MARITAL_STATUS}
                  </Typography>
                </Box>
                <Box sx={{my: 2}}>
                  <Typography sx={{fontWeight: 'bold'}}>
                    Адрес
                  </Typography>
                  <Typography>
                    {ADDRESS_FL}
                  </Typography>
                  <Typography>
                    {ADDRESS_SL}
                  </Typography>
                </Box>
                <Box sx={{my: 2}}>
                  <Typography sx={{fontWeight: 'bold'}}>
                    E-Mail
                  </Typography>
                  <Button startIcon={<ForwardToInboxOutlinedIcon/>}>
                    <Link
                      underline="none"
                      href={'mailto:' + EMAIL}
                    >
                      {EMAIL}
                    </Link>
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Интересы
                </Typography>
                <Divider sx={{mb: 2}}/>
                <Box sx={{my: 2}}>
                  {INTERESTS.map((el) => (
                    <Typography key={el.key}>
                      {el.title}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Языки
                </Typography>
                <Divider sx={{mb: 2}}/>
                <Box sx={{my: 2}}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        Английский (Pre-Intermediate)
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography sx={{textAlign: 'right'}}>
                        A2
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            {/* Правая колонка */}
            <Grid item xs={12} md={8}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                >
                  Гуриев Никита
                </Typography>
                <Divider sx={{mb: 2}}/>
                <Box sx={{my: 2}}>
                  <Typography gutterBottom>
                    Желательно работа по трудовому договору, либо как
                    самозанятый и удалённо. Важно, чтобы в команде разработки я
                    был не один.
                  </Typography>
                  <Typography gutterBottom>
                    Опыт разработки приложений для Битрикс24 (как локальных, так
                    и для маркетплейса)
                  </Typography>
                  <Typography gutterBottom>
                    Разработанные приложения для Маркетплейса:
                  </Typography>
                  <Grid container sx={{mb: 1}}>
                    <Grid item>
                      <Button
                        startIcon={<OpenInNewOutlinedIcon/>}
                        href="https://www.bitrix24.ru/apps/?app=nicedo.uvedomlyashka"
                        target="_blank"
                      >
                        Уведомляшка
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container sx={{mb: 2}}>
                    <Grid item>
                      <Button
                        startIcon={<OpenInNewOutlinedIcon/>}
                        href="https://www.bitrix24.ru/apps/?app=nicedo.shakhmatka"
                        target="_blank"
                      >
                        Шахматка
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography gutterBottom>
                    Один из крупных проектов: проект для застройщика, в который
                    входят несколько приложений, а именно:
                  </Typography>
                  - Шахматка. Отображение/добавление/редактирование/изменение
                  квартир; бронирование (связка со сделкой); поиск квартир по
                  фильтру; отображение дополнительной информации по ЖК (связь
                  с универсальными списками); отображение статистики по
                  квартирам (сколько продано/в продаже/забронировано); вёрстка
                  страниц для печати<br/>
                  - Массовое изменение параметров квартир<br/>
                  - Финансовая статистика по квартирам (на сколько
                  продано/забронировано и др.)<br/>
                  - Подключение и настройка календаря (FullCalendar)<br/>
                  - Парсер информации по квартирам в XML-фид для таких
                  площадок как ДомКлик, Яндекс.Недвижимость, АЯКС,
                  ЦИАН<br/><br/>
                  По больше части занимался разработкой и поддержкой
                  приложений для Битрикс24, но имел опыт работы с БУС, но
                  очень мало, в целом принцип работы с БУС мне понятен, но
                  нужно будет какое-то время дополнительно изучить.<br/><br/>
                  С чем не было опыта работы:<br/>
                  - создание компонентов и модулей (как для БУС, так и для
                  Б24)<br/>
                  - кэшированием в БУС<br/><br/>
                  Мало опыта:<br/>
                  - работа с ядром D7/API БУС (на уровне правок в чужой код,
                  общее понимание работы есть)<br/>
                  - React, Node.js<br/>
                  - ООП/MVC/SOLID<br/><br/>
                  Приложения для Битрикс24 - по большей части различные отчёты
                </Box>
              </Box>
              {/* Опыт работы */}
              <Box sx={{mb: 2}}>
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    Опыт работы
                  </Typography>
                  <Divider sx={{mb: 2}}/>
                </Box>
                <Box>
                  <Box sx={{mt: 2}}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography sx={{fontWeight: 'bold'}}>
                          Fullstack разработчик
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{textAlign: 'right'}}>
                          апр 2020 &mdash; июнь 2021
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography sx={{fontStyle: 'italic'}}>
                          ООО &laquo;АУРУМ&raquo;
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>
                          Разработка приложений для Битрикс24 (боты (<Button
                            startIcon={<OpenInNewOutlinedIcon/>}
                            href="https://www.bitrix24.ru/apps/?app=nicedo.uvedomlyashka"
                            target="_blank">Уведомляшка</Button>), отчёты (HTML,
                          Word, Excel); XML-фиды (ДомКлик, АЯКС,
                          Яндекс.Недвижимость), действия с CRM, <Button
                            startIcon={<OpenInNewOutlinedIcon/>}
                            href="https://www.bitrix24.ru/apps/?app=nicedo.shakhmatka"
                            target="_blank">Шахматка</Button>), интеграция
                          Битрикс24
                          с Битрикс управление сайтом, ОКТЕЛЛ, опыт работы с
                          CRON
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="PHP"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="JavaScript"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Bootstrap"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{mt: 2}}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography sx={{fontWeight: 'bold'}}>
                          Специалист
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{textAlign: 'right'}}>
                          июнь 2019 &mdash; июль 2019
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography sx={{fontStyle: 'italic'}}>
                          ПАО &laquo;Ростелеком&raquo;
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>
                          Внесение правок в систему заявок Ростелеком
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{my: 2}}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography sx={{fontWeight: 'bold'}}>
                          Техник автоматизированных систем управления
                          технологическими процессами (АСУ ТП)
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{textAlign: 'right'}}>
                          май 2015 &mdash; дек 2018
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography sx={{fontStyle: 'italic'}}>
                          ООО &laquo;РН-Информ&raquo; &mdash; ООО
                          ИК &laquo;СИБИНТЕК&raquo;
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>
                          Обеспечение исправности ПЭВМ, пультов ТМ,
                          контроллерного
                          оборудования, осуществление программного сопровождения
                          систем телемеханики и техническое обслуживание
                          объектов
                          АСУ ТП
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="SCADA"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Metso"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="DeltaV"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="DirectLogic"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Язык релейной логики"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="FBD"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="JavaScript"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="NodeJS"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              {/* Образование и квалификации */}
              <Box sx={{mb: 2}}>
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    Образование и квалификации
                  </Typography>
                  <Divider sx={{mb: 2}}/>
                </Box>
                <Box>
                  <Box sx={{mt: 2}}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography sx={{fontWeight: 'bold'}}>
                          Бакалавриат, информатика и вычислительная
                          техника
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{textAlign: 'right'}}>
                          сен 2014 &mdash; июнь 2019
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography sx={{fontStyle: 'italic'}}>
                          Сургутский государственный университет
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>
                          Пройдена программа бакалавриата по направлению
                          Автоматизированные системы обработки информации и
                          управления на факультете Информационных технологий и
                          вычислительной техники. Заочная форма обучения
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="PHP"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="JavaScript"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="C#"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="MS SQL"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Unity"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="CSS"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="HTML"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="GPSS World"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="AutoCAD"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="3DS Max"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{my: 2}}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography sx={{fontWeight: 'bold'}}>
                          Специалитет, информационные технологии и
                          вычислительная
                          техника
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{textAlign: 'right'}}>
                          сен 2011 &mdash; июнь 2014
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography sx={{fontStyle: 'italic'}}>
                          Тюменский государственный нефтегазовый университет
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>
                          Пройдена программа специалитета по направлению
                          Программирование в компьютерных системах на факультете
                          Информационных технологий и вычислительной техники.
                          Очная
                          форма обучения
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Delphi (Object Pascal)"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="MS SQL"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="CSS"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="HTML"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="AutoCAD"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="3DS Max"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              {/* Рекомендации */}
              <Box sx={{mb: 2}}>
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    Рекомендации
                  </Typography>
                  <Divider sx={{mb: 2}}/>
                </Box>
                <Box sx={{mt: 2}}>
                  <Typography>
                    Рекомендации предоставляются по запросу
                  </Typography>
                </Box>
              </Box>
              {/* Навыки */}
              <Box sx={{mb: 2}}>
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    Навыки
                  </Typography>
                  <Divider sx={{mb: 2}}/>
                </Box>
                <Box sx={{mt: 2}}>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        JavaScript
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={85}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        MUI
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={60}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        WebStorm
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={75}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        React
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={20}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        NodeJS
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={50}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        nginx
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={50}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        Mongo
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={25}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        sx={{fontWeight: 'bold'}}
                      >
                        GraphQL
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <LinearProgress
                        sx={{mt: 1}}
                        variant="determinate"
                        value={25}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {/* Курсы */}
              <Box sx={{mb: 2}}>
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    Курсы
                  </Typography>
                  <Divider sx={{mb: 2}}/>
                </Box>
                <Box sx={{mt: 2}}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <Typography sx={{fontWeight: 'bold'}}>
                        Node JS. Практический курс. (Mongo, GraphQL, MySQL,
                        Express)
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography sx={{textAlign: 'right'}}>
                        окт 2021
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography sx={{fontStyle: 'italic'}}>
                        Udemy
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography>
                        Полный гайд по созданию сайтов и приложений на серверном
                        JavaScript, включая базы данных и создание API.
                      </Typography>
                      <Box>
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Серверный JavaScript"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Создание REST API"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="MySQL и MongoDB"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Серверный JavaScript"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Сайты на NodeJS и инфраструктура"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="ExpressJS"
                        />
                        <Chip
                          sx={{my: 1}}
                          size="small"
                          label="Основы GraphQL"
                        />
                      </Box>
                      <Typography>
                        <Button
                          startIcon={<OpenInNewOutlinedIcon/>}
                          href={MyCertificate}
                          target="_blank"
                        >
                          Сертификат
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grow>
  );
};

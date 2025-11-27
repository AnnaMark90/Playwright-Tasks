# Playwright: Структура, Конфигурация и Allure

## Что такое Playwright?

Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling. It gives an ability to efficintly test web applications and supports Chromium, WebKit and Firefox on Windows, Linux and macOS, locally or in CI, headless or headed, with native mobile emulation for Chrome (Android) and Mobile Safari.
Playwright has become popular for its flexibility, speed and ease of use, as well as supporting multilingual programming and asynchronous operations.

## Когда и где использовать

- **Функциональное тестирование**: проверка работоспособности веб-приложений (регистрация, покупка, формы).
- **End-to-end (E2E) тестирование**: сценарии, имитирующие поведение пользователя от начала до конца.
- **Кросс-браузерное тестирование**: совместимость в Chromium (Chrome, Edge), Firefox, WebKit (Safari).
- **Автоматизация CI/CD**: интеграция в системы непрерывной интеграции для автоматического запуска тестов.
- **Тестирование мобильного веба**: эмуляция мобильных устройств (Android Chrome, Mobile Safari).

## Основные компоненты

Playwright использует три ключевых компонента:

- **Браузер**: экземпляр Chromium, Firefox или WebKit.
- **Контекст**: изолированная сессия (аналог инкогнито), для параллельного запуска тестов без пересечения данных.
- **Страница**: отдельная вкладка внутри контекста.
  Взаимодействие через **локаторы**. Playwright автоматически ожидает появления элементов, исключая необходимость ручных задержек.

## Преимущества Playwright

- **Прямое взаимодействие с браузером**: использует протоколы (Chrome DevTools Protocol для Chromium, собственные для Firefox/WebKit), минуя WebDriver как в Selenium.
- **Автоматическое ожидание**: не нужны явные `wait`, тесты стабильны.
- **Мощная архитектура**: контексты/страницы для сложных сценариев (много пользователей, домены, iframe).
- **Поддержка языков**: TypeScript/JavaScript, Python, Java, .NET.
- **Интеграция**: Node.js, React, Vue.js, CI/CD системы.
- **Удобный API**: современный синтаксис, богатый функционал.
- **Автоожидание** (срабатывает только перед выполнением действия)

Можно запускать браузеры в режиме без интерфейса **_(headless)_**, что полезно для автоматизации и CI/CD.

## Недостатки Playwright

- **Молодой фреймворк**: меньше готовых решений по сравнению с Selenium.
- **Только веб**: работает только с мобильными веб-версиями, не поддерживает нативные приложения.​
- **Требует знаний программирования**: знания одного из поддерживаемых языков.
- **Ограниченная поддержка старых версий браузеров**

## Установка и структура проекта

Установка через npm:
npm init playwright@latest / npm install -D @playwright/test / npx playwright install

## Браузеры

Playwright поддерживает три движка: **Chromium (семейство Chrome/Edge), Firefox и WebKit (движок Safari)**. Это означает, что ты одним и тем же тестом можешь проверить поведение приложения в разных браузерах, просто запуская разные проекты. Playwright сам ставит нужные бинарники через `npx playwright install`, поэтому отдельно качать браузеры не нужно (кроме случаев, когда хочешь именно системный Chrome/Edge).

В конфиге (`playwright.config.ts`) под каждый браузер обычно создают отдельный `project`: указывают `browserName: 'chromium' | 'firefox' | 'webkit'`, а при необходимости — `devices` (например, эмуляция iPhone). Это позволяет, например, запускать полный набор тестов сразу во всех трёх браузерах или только в нужном одном.

Playwright поддерживает Chromium, Firefox и WebKit. Конфигурация задается в playwright.config.ts (или .js), где указываются браузеры, проекты, таймауты и другие параметры. Например, для запуска в headless-режиме или с конкретными аргументами браузера (например, --disable-web-security).

Общие рекомендации- .spec.ts — чаще используется в сообществе Playwright и других тестовых фреймворков. Слово "spec" (specification) подчеркивает, что файл содержит спецификацию тестов для определённой функциональности или компонента.​
.test.ts — также допустимый вариант, особенно если вы работали с другими фреймворками

## Конфигурация (playwright.config)

The playwright.config centralizes configuration: target browsers, timeouts, retries, projects, reporters and more. In existing projects dependencies are added to your current package.json.
Файл `playwright.config.(ts|js)` — «мозг» тестового проекта: в нём задаётся, где лежат тесты, какие браузеры запускаем и т.д. Без него Playwright тоже запустится, но конфиг даёт полный контроль над поведением раннера.

Ключевые поля:

- `testDir` — папка с тестами.

- `timeout`, `expect` — общие таймауты для тестов и `expect`.

- `use` — Глобальная Секция, общие настройки для всех тестов
  (например `storageState`, `trace`, `screenshot`, `video`)
  `baseURL`: Базовый URL вашего приложения await page.goto('/login')
  `headless`: Указывает, запускать ли браузер в фоновом режиме (true, по умолчанию) или с видимым окном (false, для отладки)

- `projects` — список конфигураций для разных браузеров/девайсов/окружений.

- `reporter` — какие отчёты формировать.

- `outputDir`, `snapshotDir` — куда складывать артефакты и снапшоты.

- `globalSetup` / `globalTeardown` — глобальная подготовка/завершение перед всеми тестами.

## Репортеры

Репортеры – это плагины для генерации отчетов о тестах. Они нужны для визуализации результатов: прохождение/фейлы, логи, скриншоты, производительность. Дефолтный – html (генерирует playwright-report/index.html). Другие: junit, json, allure-playwright. В playwright.config.ts указываются в reporter: [['html'], ['allure-playwright']].​

Репортеры отвечают за то, как ты увидишь результат прогона: в консоли и в файлах. Есть простые консольные (`'list'`, `'dot'`), а есть файловые (`'html'`, `'json'`, `'junit'`). В конфиге можно указать один или несколько репортеров, например: один для консоли, другой — для CI в формате JUnit.[9]

HTML‑репорт — самый наглядный: он показывает дерево тестов, время выполнения, падения, вложенные шаги, вложенные скриншоты/трейсы. Обычно включают `'html'` в конфиге и после прогона открывают его командой вида `npx playwright show-report` — так удобно разбирать упавшие тесты локально или на CI.[9]

Allure — для enterprise/CI, HTML — для быстрой локальной работы.

## Allure: Репортер, Подключение и API

`Что такое репортер и зачем нужен?` Репортер Allure – плагин для красивых интерактивных отчетов с шагами, вложениями (скриншоты, логи, видео), историей запусков, категориями (severity, features). Нужен для анализа фейлов, метрик (duration, passed/failed), интеграции с CI/CD.
**_Почему Allure лучше Playwright HTML_**

- Шаги + метрики
- История трендов, аналитика
- CI-шаринг
- Для команд
  ​
  `Как подключить (пример с Playwright):`
- Установите: npm i -D @playwright/test allure-playwright.
- В playwright.config.ts: reporter: [['list], ['allure-playwright']].
- Запустите тесты: npx playwright test.
- Генерация отчета: npx allure generate allure-results --clean && npx allure open.
  Результаты в ./allure-results/, отчет в ./allure-report/.

`Allure API (пример в тестах):` API добавляет шаги, labels, attachments для детального отчета.

- Импорт: import { AllurePlaywright } from 'allure-playwright';
- test('example', async ({ page }) => {
  const allure = new AllurePlaywright();
  allure.step('Login', async () => {
  await page.goto('/login');
  await page.fill('#user', 'user');
  });
  allure.attachment('screenshot', await page.screenshot(), 'image/png');
  allure.label('severity', 'critical');
  allure.feature('Auth');
  });

## Фикстуры

В контексте @playwright/test, фикстуры — это механизмы для управления ресурсами (браузерами, страницами, базой данных и т.д.) и передачи данных в тесты.

Также — это способ описать «что нужно тесту перед стартом» и «как это правильно почистить после»,
they allow to reuse and share code across different test-cases. Встроенные фикстуры — это, например, `page`, `context`, `browser`, `request`: тебе не нужно каждый раз руками создавать браузер и страницу, ты просто получаешь объект `page` как аргумент теста. Они переиспользуются для параллелизации и изоляции тестов.

Можно создавать и свои фикстуры: например, «залогиненный пользователь», «подготовленные тестовые данные в БД» или «API‑клиент с токеном». Для этого расширяют базовый `test` через `test.extend`, описывая, как создать ресурс перед тестом и как его закрыть. Это помогает избавиться от дублирования в `beforeEach` и сделать код тестов чище.[9]

## Трейсы (Trace Viewer)

Трейсы – детальные логи выполнения для отладки, детальная запись выполнения теста: какие шаги выполнялись, какие кликы, какие запросы ушли в сеть, какие скриншоты были по шагам. Включают действия мыши/клавиатуры, сетевые запросы, консоль, DOM-снимки.

Запись сохраняется в файл и потом открывается в отдельном интерфейсе (Trace Viewer), где можно «пролистать» тест по кадрам.[9] Генерируются при trace: 'on' в config или await context.tracing.start(...). Хранятся в test-results/traces/.​

Включается трейс настройкой в `use.trace`: можно всегда (`'on'`), только при падении (`'retain-on-failure'`), или, например, при первом ретрае (`'on-first-retry'`). Обычно на проектах используют режим «только при падении», чтобы не захламлять диск и одновременно иметь подробный разбор, когда что‑то сломалось.[9]

Трассировка (trace) в Playwright — это подробная запись всего, что происходило во время выполнения теста.

## Дефолтные папки

Если создать проект командой `npm init playwright@latest`, Playwright сделает типовую структуру:

- `tests` (или аналогичная) — здесь лежат файлы с тестами `*.spec.ts` / `*.test.ts`.
- `playwright.config.ts` в корне — конфигурация проекта.
- Папки для примеров, storage state и пр., в зависимости от выбранных опций генератора.[9]

По умолчанию артефакты (скриншоты, видео, трейсы) складываются в папку, заданную в `outputDir` (если не переопределить — Playwright создаёт свою структуру). Для визуальных тестов есть `snapshotDir` (папка с эталонными скриншотами). Строгих «обязательных» названий нет, но генератор предлагает удобные дефолты, которыми часто и пользуются.[9]

## Где что хранить

На реальных проектах обычно придерживаются такой логики:

- Тесты: в `tests` (или `e2e`, `specs`) — только сами сценарии.
- Общие фикстуры / расширенный `test`: в отдельном файле, например `fixtures.ts`, `baseTest.ts`, который импортируют и используют вместо `@playwright/test`.
- Конфиги окружений (URLs, таймауты, флаги): в отдельной папке `config` или в виде отдельных `projects` в конфиге.
- Storage state, данные пользователей, мок‑данные: в `storage/`, `data/`, `seeds/` — главное, чтобы команда понимала структуру.[9]

Такой подход помогает быстро понимать, где искать нужную вещь: тесты — отдельно, инфраструктура — отдельно, данные — отдельно. Для собеса важно уметь объяснить не только «как Playwright делает по умолчанию», но и «как обычно организуют проект в команде».

`node_modules/`: Содержит все npm-пакеты, включая Playwright, его библиотеки (@playwright/), ядро (playwright-core/) и типы для TypeScript.

`test-results/`: Содержит результаты тестов, включая видео, скриншоты и HTML-отчеты.

`playwright-report/`: HTML-отчет по умолчанию после npx playwright show-report.

`test-results/traces/`: Трейсы (trace viewer) для отладки – ZIP-файлы с сетевыми запросами, действиями и скриншотами.

`tests/`: Директория для тестовых файлов (по умолчанию генерируется example.spec.ts).

`playwright/.cache/`: Кэш браузеров (MSPlaywright, Firefox Development и т.д.), скачивается автоматически при первом запуске.

`storage-state.json`: Состояние аутентификации (cookies, localStorage), сохраняется для повторного использования.

## Хуки (before/after)

Хуки — это функции, которые выполняются до и после тестов:

- `beforeAll` / `afterAll` — один раз на файл (или `describe`).
- `beforeEach` / `afterEach` — перед каждым тестом и после каждого теста.[9]

Их используют для простой подготовки: открыть нужную страницу перед каждым тестом, почистить что‑то после теста, один раз поднять общий ресурс для всех тестов в файле. Важно понимать отличие от фикстур: `хуки завязаны на файл/сьют` и менее гибкие, а `фикстуры — на уровень теста и дают лучшую изоляцию` (особенно если ресурс создаётся «на каждый тест»).[9]

## Global setup / teardown

Global setup/teardown — это «обёртка» на уровне всего запуска тестов. Global setup выполняется один раз перед всеми тестами, global teardown — один раз после всех тестов (например, в конце CI‑джоба).[9]

Типичные сценарии:

- В `globalSetup` выполнить логин и сохранить `storageState` в файл, чтобы не логиниться в каждом тесте.
- Прогнать миграции БД, подготовить тестовые данные разом.
- В `globalTeardown` — подчистить глобальные ресурсы, остановить тестовые сервисы и т.п.

В конфиге задаются поля `globalSetup` и `globalTeardown`, которые указывают на модуль/функцию, выполняющую нужную логику.[9]

Global setup/teardown в playwright.config.ts:

`globalSetup`: './global-setup.ts' – выполняется раз перед всеми тестами (например, login и сохранение storage-state).

`globalTeardown`: './global-teardown.ts' – cleanup после всех.
Пример global-setup:

// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
export default async function globalSetup(config: FullConfig) {
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('login-page');
await page.fill('#username', 'user');
await page.click('button');
await page.context().storageState({ path: 'storage-state.json' });
await browser.close();
}

## Storage state (storageState)

`storageState` — это снимок состояния браузерного хранилища: cookies, localStorage, sessionStorage и т.п., привязанный к контексту. Идея простая: один раз логинишься, сохраняешь это состояние в JSON‑файл, потом в тестах подставляешь этот файл и сразу оказываешься в приложении как уже залогиненный пользователь.[9]

Обычно схема такая:

1. В отдельном скрипте или `globalSetup` открыть браузер, залогиниться, сохранить `await context.storageState({ path: 'storage/user.json' })`.
2. В `playwright.config.ts` в `use` указать `storageState: 'storage/user.json'` для нужного проекта.

В результате каждый тест стартует с этим состоянием и нет необходимости в каждом тесте проходить форму логина, что сильно ускоряет прогоны и упрощает сценарии.

Storage State – JSON-файл с cookies, localStorage, sessionStorage для имитации авторизованного состояния. Генерируется в global-setup. Используется в test.use({ storageState: 'state.json' }) или context = await browser.newContext({ storageState: 'state.json' }). Обеспечивает стабильность тестов без повторного логина. Хранится в корне проекта или указанной папке.

## Локаторы (Locators)

Локатор в Playwright — это не просто строка CSS-селектора, а объект (API-интерфейс), который представляет собой способ нахождения элемента на странице.

`Ключевое отличие Локатора от обычного селектора` (#id или .class):

- Отложенный Поиск: Локатор не ищет элемент сразу при создании, сохраняет логику поиска (например, "найти кнопку с текстом 'Войти'") и выполняет фактический поиск только в момент действия (.click()) или проверки (.toBeVisible()).
- Устойчивость (Resilience): Если DOM страницы изменится между моментом создания Локатора и моментом его использования, Локатор автоматически найдет элемент по его текущему местоположению, используя сохраненную логику.

Playwright рекомендует использовать `функции-геттеры:`

- По Роли: page.getByRole('button', { name: 'Submit' })
- По Тексту: page.getByText('Имя')
- По ID для тестов: page.getByTestId('username-field')

`Чейнинг (Цепочки Локаторов)`:
const cart = page.locator('.shopping-cart-container');
const checkoutButton = cart.getByRole('button', { name: 'Оформить заказ' });
await checkoutButton.click();

**3 способа работы с селекторами**:

- CSS/XPath
  page.locator('.btn-primary')
  page.locator('#login')
  page.locator('//button[text()="Save"]')

- Тексовые селекторы
  page.locator('button:has-text("Buy")')

- Семантические локаторы
  page.getByRole('button', { name: 'Submit' })
  page.getByLabel('Email')
  page.getByPlaceholder('Search')
  page.getByText('Login')  
  page.getByTestId('user-item')

# BHS Тестовое

## Установка

1. Установить git. [инструкция](https://git-scm.com/downloads)
1. Склонировать репозиторий.
    ```sh
    git clone https://github.com/TheMerret/bhs-intro
    ```
1. Установить node.js. [инструкция](https://nodejs.org/en/download/package-manager)
1. Установить зависимости
    1. Для первой и второй части
        ```sh
        cd bhs-intro
        npm i
        ```
    1. Для третьей
        ```sh
        cd part3
        npm i
        ```

## Запуск

### Часть 1

Из корня проекта:

```sh
npx vitest part1
```

Посмотреть тесты можно в `part1/index.test.ts` 

### Часть 2

Из корня проекта:

```sh
npx vitest part2
```

Посмотреть тесты можно в `part2/index.test.ts` 

# Часть 3

В директории part3:

```sh
npm run dev
```

Теперь можно перейти на сайт, где можно протестировать компонент.

Компонент ввода с debounce находится в `src/components/input/index.ts` 

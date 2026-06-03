# Oceanic fonts (local `.otf`)

Положите сюда файлы шрифта (лицензия — на вашей стороне). **`.otf` полностью поддерживается** браузером через `@font-face` с `format('opentype')`.

Ожидаемые имена (переименуйте свои `.otf`, если у вас другие):

| Файл | Семейство в CSS | `font-weight` |
|------|-----------------|---------------|
| `OceanicGrotesk-Regular.otf` | Oceanic Grotesk | 400 |
| `OceanicGrotesk-Medium.otf` | Oceanic Grotesk | 500 |
| `OceanicText-Regular.otf` | Oceanic Text | 400 |
| `OceanicText-Medium.otf` | Oceanic Text | 500 |

Минимум для Components и `text - core` (body): **Grotesk Regular + Medium**.

Для display/headline/paragraph: добавьте **Text Regular + Medium**.

Файлы `*.otf` в git не коммитятся (см. `.gitignore`). После копирования перезапустите Storybook.
